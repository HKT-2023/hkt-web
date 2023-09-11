import { all, fork, put, takeLatest } from 'redux-saga/effects'
import {
  handleCreateUser,
  CONFIRM_CREATE_USER_ACTION,
  REQUEST_CREATE_USER_SUCCESS,
  REQUEST_CREATE_USER_FAILURED,
  handleCreateUserAgent,
  handleCreateUserVendor,
  REQUEST_CREATE_USER_AGENT_SUCCESS,
  REQUEST_CREATE_USER_AGENT_FAILURED,
  REQUEST_CREATE_USER_VENDOR_SUCCESS,
  REQUEST_CREATE_USER_VENDOR_FAILURED,
  UPLOAD_PHOTO_CREATE_USER_ACTION,
  handleUploadCreateUser,
  GET_ALL_VENDOR_CATEGORY_ACTION,
  fetchAllVendorCategory,
  REQUEST_ALL_VENDOR_CATEGORY_SUCCESS,
} from '.'
import { ROUTE_USER_MANAGEMENT } from '../routing'
import { redirect } from 'redux-first-router'
import { showToastAlert } from '../app'
import { TypeOfUser, UserStatus } from 'utils/constants'

function* createUser() {
  yield takeLatest(CONFIRM_CREATE_USER_ACTION, function* (action) {
    const { payload } = action
    const { typeOfUser } = payload
    const isAdminOrUser = typeOfUser === TypeOfUser.Admin || typeOfUser === TypeOfUser.User
    const isAgent =
      typeOfUser === TypeOfUser.KlayTNAgent || typeOfUser === TypeOfUser.NonKlayTNAgent

    if (isAdminOrUser) {
      yield put(
        handleCreateUser({
          avatarUrl: payload.avatarUrl,
          firstName: payload.firstName,
          lastName: payload.lastName,
          dateOfBirth: payload.dateOfBirth,
          email: payload.email,
          phone: payload.phone,
          typeOfUser: payload.typeOfUser,
          status: payload.status,
          password: payload.password,
          userTag: payload.userTag,
        }),
      )
    } else if (isAgent) {
      yield put(
        handleCreateUserAgent({
          avatarUrl: payload.avatarUrl,
          firstName: payload.firstName,
          lastName: payload.lastName,
          dateOfBirth: payload.dateOfBirth,
          email: payload.email,
          phone: payload.phone,
          typeOfUser: payload.typeOfUser,
          status: payload.status,
          password: payload.password,
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
        handleCreateUserVendor({
          avatarUrl: payload.avatarUrl,
          businessName: payload.businessName,
          primaryContact: payload.primaryContact,
          dateOfBirth: payload.dateOfBirth,
          email: payload.email,
          phone: payload.phone,
          typeOfUser: payload.typeOfUser,
          status: payload.status,
          password: payload.password,
          license: payload.license,
          vendorEmail: payload.vendorEmail,
          vendorLocation: payload.vendorLocation,
          vendorType: payload.vendorType,
          description: payload.description,
          firstName: payload.businessName,
          lastName: payload.businessName,
        }),
      )
    }
  })

  yield takeLatest(REQUEST_CREATE_USER_SUCCESS, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert('New account created successfully'))
  })

  yield takeLatest(REQUEST_CREATE_USER_FAILURED, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest(REQUEST_CREATE_USER_AGENT_SUCCESS, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert('New account created successfully'))
  })

  yield takeLatest(REQUEST_CREATE_USER_AGENT_FAILURED, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest(REQUEST_CREATE_USER_VENDOR_SUCCESS, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert('New account created successfully'))
  })

  yield takeLatest(REQUEST_CREATE_USER_VENDOR_FAILURED, function* (action) {
    yield put(redirect({ type: ROUTE_USER_MANAGEMENT }))
    yield put(showToastAlert(action.payload.data.message, 'error'))
  })

  yield takeLatest(UPLOAD_PHOTO_CREATE_USER_ACTION, function* (action) {
    const { payload } = action
    yield put(handleUploadCreateUser(payload.file))
  })

  yield takeLatest(GET_ALL_VENDOR_CATEGORY_ACTION, function* (action) {
    yield put(fetchAllVendorCategory(action.payload))
  })

  yield takeLatest(REQUEST_ALL_VENDOR_CATEGORY_SUCCESS, function* (action) {
    const { metadata } = action.payload
    const { page, limit, total } = metadata
    if (page * limit < total) {
      yield put(fetchAllVendorCategory({ page: page + 1, limit, status: UserStatus.Active }))
    }
  })
}

export default function* createUserManagement() {
  yield all([fork(createUser)])
}
