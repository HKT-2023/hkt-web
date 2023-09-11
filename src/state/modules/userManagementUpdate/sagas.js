import { all, fork, put, select, takeLatest } from 'redux-saga/effects'

import {
  handleUpdateUser,
  CONFIRM_UPDATE_USER_ACTION,
  REQUEST_UPDATE_USER_SUCCESS,
  REQUEST_UPDATE_USER_FAILURED,
  handleUpdateUserAgent,
  handleUpdateUserVendor,
  REQUEST_UPDATE_USER_AGENT_SUCCESS,
  REQUEST_UPDATE_USER_AGENT_FAILURED,
  REQUEST_UPDATE_USER_VENDOR_SUCCESS,
  REQUEST_UPDATE_USER_VENDOR_FAILURED,
  UPLOAD_PHOTO_UPDATE_USER_ACTION,
  handleUploadUpdateUser,
  fetchUserDetails,
  fetchAllVendorCategoryUpdate,
  GET_ALL_VENDOR_CATEGORY_UPDATE_ACTION,
  REQUEST_ALL_VENDOR_CATEGORY_UPDATE_SUCCESS,
} from '.'
import { ROUTE_USER_MANAGEMENT } from '../routing'
import { redirect } from 'redux-first-router'
import { showToastAlert } from '../app'
import { TypeOfUser, UserStatus } from 'utils/constants'

function* initPage() {
  const { location } = yield select()
  const { payload } = location
  const { id } = payload
  yield put(fetchUserDetails(id))
}

function* updateUser() {
  yield takeLatest(CONFIRM_UPDATE_USER_ACTION, function* (action) {
    const { payload } = action
    const { typeOfUser } = payload
    const isAdminOrUser = typeOfUser === TypeOfUser.Admin || typeOfUser === TypeOfUser.User
    const isAgent =
      typeOfUser === TypeOfUser.KlayTNAgent || typeOfUser === TypeOfUser.NonKlayTNAgent

    const commonInfo = {
      userId: payload.userId,
      avatarUrl: payload.avatarUrl,
      firstName: payload.firstName,
      lastName: payload.lastName,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      status: payload.status,
      userTag: payload.userTag,
    }
    if (isAdminOrUser) {
      yield put(handleUpdateUser(commonInfo))
    } else if (isAgent) {
      yield put(
        handleUpdateUserAgent({
          ...commonInfo,
          agentName: payload.agentName,
          license: payload.license,
          agentEmail: payload.agentEmail,
          socialMedia: payload.socialMedia,
          description: payload.description,
          commission: payload.commission,
          businessName: payload.businessName,
          listAgentMlsId: payload.listAgentMlsId,
        }),
      )
    } else {
      yield put(
        handleUpdateUserVendor({
          ...commonInfo,
          businessName: payload.businessName,
          primaryContact: payload.primaryContact,
          license: payload.license,
          vendorEmail: payload.vendorEmail,
          vendorLocation: payload.vendorLocation,
          vendorType: payload.vendorType,
          description: payload.description,
        }),
      )
    }
  })

  yield takeLatest(REQUEST_UPDATE_USER_SUCCESS, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.message))
  })

  yield takeLatest(REQUEST_UPDATE_USER_FAILURED, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest(REQUEST_UPDATE_USER_AGENT_SUCCESS, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.message))
  })

  yield takeLatest(REQUEST_UPDATE_USER_AGENT_FAILURED, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest(REQUEST_UPDATE_USER_VENDOR_SUCCESS, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.message))
  })

  yield takeLatest(REQUEST_UPDATE_USER_VENDOR_FAILURED, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest(UPLOAD_PHOTO_UPDATE_USER_ACTION, function* (action) {
    const { payload } = action
    yield put(handleUploadUpdateUser(payload.file))
  })

  yield takeLatest(GET_ALL_VENDOR_CATEGORY_UPDATE_ACTION, function* (action) {
    yield put(fetchAllVendorCategoryUpdate(action.payload))
  })

  yield takeLatest(REQUEST_ALL_VENDOR_CATEGORY_UPDATE_SUCCESS, function* (action) {
    const { metadata } = action.payload
    const { page, limit, total } = metadata
    if (page * limit < total) {
      yield put(fetchAllVendorCategoryUpdate({ page: page + 1, limit, status: UserStatus.Active }))
    }
  })
}

export default function* loadUpdateUserManagement() {
  yield all([fork(initPage), fork(updateUser)])
}
