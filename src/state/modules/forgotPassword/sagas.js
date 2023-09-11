import { all, fork, put, takeLatest } from 'redux-saga/effects'

import {
  verifyEmailForgotPassword,
  verifyCodeForgotPassword,
  fetchResetPassword,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ACTION,
  VALIDATE_CODE_ACTION,
  VERIFY_EMAIL_FORGOT_PASSWORD_ACTION,
  VERIFY_EMAIL_FORGOT_PASSWORD_FAILURE,
} from '.'
import { ROUTE_LOGIN } from '../routing'
import { redirect } from 'redux-first-router'
import { showToastAlert } from '../app'

function* verifyEmail() {
  yield takeLatest(VERIFY_EMAIL_FORGOT_PASSWORD_ACTION, function* (action) {
    yield put(verifyEmailForgotPassword(action.payload.email))
  })
}

function* verifyEmailError() {
  yield takeLatest(VERIFY_EMAIL_FORGOT_PASSWORD_FAILURE, function* (action) {
    yield put(showToastAlert(action?.payload?.data?.message,'error'))
  })
}

function* validateCode() {
  yield takeLatest(VALIDATE_CODE_ACTION, function* (action) {
    yield put(verifyCodeForgotPassword(action.payload))
  })
}

function* resetPassword() {
  yield takeLatest(RESET_PASSWORD_ACTION, function* (action) {
    yield put(fetchResetPassword(action.payload))
  })
}

function* resetPasswordSuccess() {
  yield takeLatest(RESET_PASSWORD_SUCCESS, function* (action) {
    yield put(redirect({
      type: ROUTE_LOGIN
    }),
    )
  })
}


export default function* forgotPassword() {
  yield all([
    fork(verifyEmail),
    fork(validateCode),
    fork(resetPassword),
    fork(resetPasswordSuccess),
    fork(verifyEmailError)
  ])
}
