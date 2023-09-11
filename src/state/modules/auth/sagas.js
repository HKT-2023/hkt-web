import { all, fork, put, takeLatest, select } from 'redux-saga/effects'
import { redirect } from 'redux-first-router'
import { get } from 'lodash'

import {
  FETCH_USER_SUCCESS,
  LOGOUT_ACTION,
  FETCH_USER_FAILURED,
  handleLogin,
  REQUEST_LOGIN_SUCCESSED,
  REQUEST_LOGIN_FAILURED,
  LOGIN_ACTION,
  CHANGE_PASSWORD_ACTION,
  handleChangePassword,
  REQUEST_CHANGE_PASSWORD_SUCCESS,
  REQUEST_CHANGE_PASSWORD_FAILURED,
  fetchUserInfor,
} from '.'
import { bootFinished, showToastAlert } from '../app'
import { ROUTE_LOGIN, ROUTE_HOME } from '../routing'
import { setAuthToken } from 'utils/localStorage'
import { connectOneSignal } from '../onesignal'

function* redirectAwayAfterUserLogin() {
  yield takeLatest(FETCH_USER_SUCCESS, function* (action) {
    const { location, auth } = yield select()
    let redirectType = get(location, 'type', '')
    const payload = get(location, 'payload', '')
    const query = get(location, 'query', '')
    yield put(bootFinished())
    yield put(connectOneSignal(auth?.user?._id))

    // Allow to redirect
    yield put(
      redirect({
        type: redirectType && redirectType !== ROUTE_LOGIN ? redirectType : ROUTE_HOME,
        payload,
        query,
      }),
    )
  })

  yield takeLatest(REQUEST_LOGIN_SUCCESSED, function* (action) {
    setAuthToken(action.payload.data.accessToken)
    yield put(fetchUserInfor(action.payload.data.accessToken))
  })

  yield takeLatest(FETCH_USER_FAILURED, function* (action) {
    const { location } = yield select()
    let redirectType = get(location, 'type', '')
    const payload = get(location, 'payload', '')
    const query = get(location, 'query', '')

    yield put(bootFinished())
    yield put(
      redirect({
        type: redirectType && redirectType !== ROUTE_LOGIN ? ROUTE_LOGIN : redirectType,
        payload,
        query,
      }),
    )
  })
}

function* logout() {
  const { location } = yield select()
  if (process.env.REACT_APP_ENV === 'local') {
    yield put(
      redirect({
        type: ROUTE_LOGIN,
        query: location.type !== ROUTE_LOGIN ? { redirect: location.type } : {},
      }),
    )
  } else {
    window.location.pathname = '/login'
  }
}

function* login() {
  yield takeLatest(LOGIN_ACTION, function* (action) {
    const { payload } = action
    yield put(handleLogin(payload.email, payload.password))
  })
  yield takeLatest([REQUEST_LOGIN_FAILURED], function* (action) {
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })
}

function* changePassword() {
  yield takeLatest(CHANGE_PASSWORD_ACTION, function* (action) {
    yield put(
      handleChangePassword(
        action.payload.oldPassword,
        action.payload.newPassword,
        action.payload.confirmPassword,
      ),
    )
  })
  yield takeLatest([REQUEST_CHANGE_PASSWORD_FAILURED], function* (action) {
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest([REQUEST_CHANGE_PASSWORD_SUCCESS], function* (action) {
    yield put(showToastAlert(action.payload.message))
  })
}

export default function* auth() {
  yield all([
    takeLatest(LOGOUT_ACTION, logout),
    fork(redirectAwayAfterUserLogin),
    fork(login),
    fork(changePassword),
  ])
}
