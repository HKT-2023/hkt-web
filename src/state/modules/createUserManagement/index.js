import { createReducer } from 'redux-create-reducer'
import callAPI from '../../../utils/callAPI'

export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER'
export const REQUEST_CREATE_USER_SUCCESS = 'REQUEST_CREATE_USER_SUCCESS'
export const REQUEST_CREATE_USER_FAILURED = 'REQUEST_CREATE_USER_FAILURED'

export const REQUEST_CREATE_USER_AGENT = 'REQUEST_CREATE_USER_AGENT'
export const REQUEST_CREATE_USER_AGENT_SUCCESS = 'REQUEST_CREATE_USER_AGENT_SUCCESS'
export const REQUEST_CREATE_USER_AGENT_FAILURED = 'REQUEST_CREATE_USER_AGENT_FAILURED'

export const REQUEST_CREATE_USER_VENDOR = 'REQUEST_CREATE_USER_VENDOR'
export const REQUEST_CREATE_USER_VENDOR_SUCCESS = 'REQUEST_CREATE_USER_VENDOR_SUCCESS'
export const REQUEST_CREATE_USER_VENDOR_FAILURED = 'REQUEST_CREATE_USER_VENDOR_FAILURED'

export const REQUEST_CHANGE_PASSWORD = 'REQUEST_CHANGE_PASSWORD'
export const REQUEST_CHANGE_PASSWORD_SUCCESS = 'REQUEST_CHANGE_PASSWORD_SUCCESS'
export const REQUEST_CHANGE_PASSWORD_FAILURED = 'REQUEST_CHANGE_PASSWORD_FAILURED'

export const REQUEST_UPLOAD_FILE_CREATE_USER = 'REQUEST_UPLOAD_FILE_CREATE_USER'
export const REQUEST_UPLOAD_FILE_CREATE_USER_SUCCESS = 'REQUEST_UPLOAD_FILE_CREATE_USER_SUCCESS'
export const REQUEST_UPLOAD_FILE_CREATE_USER_FAILURED = 'REQUEST_UPLOAD_FILE_CREATE_USER_FAILURED'

export const REQUEST_ALL_VENDOR_CATEGORY = 'REQUEST_ALL_VENDOR_CATEGORY'
export const REQUEST_ALL_VENDOR_CATEGORY_SUCCESS = 'REQUEST_ALL_VENDOR_CATEGORY_SUCCESS'
export const REQUEST_ALL_VENDOR_CATEGORY_FAILURE = 'REQUEST_ALL_VENDOR_CATEGORY_FAILURE'

export const CONFIRM_CREATE_USER_ACTION = 'CONFIRM_CREATE_USER_ACTION'
export const UPLOAD_PHOTO_CREATE_USER_ACTION = 'UPLOAD_PHOTO'
export const GET_ALL_VENDOR_CATEGORY_ACTION = 'GET_ALL_VENDOR_CATEGORY_ACTION'

const defaultState = {
  fetchingCreateUser: false,
  failedFetchingCreateUser: false,

  fetchingCreateUserAgent: false,
  failedFetchingCreateUserAgent: false,

  fetchingCreateUserVendor: false,
  failedFetchingCreateUserVendor: false,

  photo: undefined,
  fetchingUploadPhoto: false,
  failedFetchingUploadPhoto: false,

  listAllVendorCategory: [],
  fetchingListAllVendorCategory: false,
  fetchingListAllVendorCategoryFailed: false,
}

const reducer = createReducer(defaultState, {
  [REQUEST_CREATE_USER]: (state, action) => {
    return {
      ...state,
      fetchingCreateUser: true,
      failedFetchingCreateUser: false,
    }
  },
  [REQUEST_CREATE_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      fetchingCreateUser: false,
      failedFetchingCreateUser: false,
    }
  },
  [REQUEST_CREATE_USER_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingCreateUser: false,
      failedFetchingCreateUser: true,
    }
  },

  [REQUEST_CREATE_USER_VENDOR]: (state, action) => {
    return {
      ...state,
      fetchingCreateUserVendor: true,
      failedFetchingCreateUserVendor: false,
    }
  },
  [REQUEST_CREATE_USER_VENDOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      fetchingCreateUserVendor: false,
      failedFetchingCreateUserVendor: false,
    }
  },
  [REQUEST_CREATE_USER_VENDOR_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingCreateUserVendor: false,
      failedFetchingCreateUserVendor: true,
    }
  },

  [REQUEST_CREATE_USER_AGENT]: (state, action) => {
    return {
      ...state,
      fetchingCreateUserAgent: true,
      failedFetchingCreateUserAgent: false,
    }
  },
  [REQUEST_CREATE_USER_AGENT_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      fetchingCreateUserAgent: false,
      failedFetchingCreateUserAgent: false,
    }
  },
  [REQUEST_CREATE_USER_AGENT_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingCreateUserAgent: false,
      failedFetchingCreateUserAgent: true,
    }
  },

  [REQUEST_UPLOAD_FILE_CREATE_USER]: (state, action) => {
    return {
      ...state,
      fetchingUploadPhoto: true,
      failedFetchingUploadPhoto: false,
    }
  },
  [REQUEST_UPLOAD_FILE_CREATE_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      photo: action.payload,
      fetchingUploadPhoto: false,
      failedFetchingUploadPhoto: false,
    }
  },
  [REQUEST_UPLOAD_FILE_CREATE_USER_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingUploadPhoto: false,
      failedFetchingUploadPhoto: true,
    }
  },

  [REQUEST_ALL_VENDOR_CATEGORY]: (state, action) => {
    return {
      ...state,
      fetchingListAllVendorCategory: true,
      fetchingListAllVendorCategoryFailed: false,
    }
  },
  [REQUEST_ALL_VENDOR_CATEGORY_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingListAllVendorCategory: false,
      fetchingListAllVendorCategoryFailed: false,
      listAllVendorCategory: [...state.listAllVendorCategory, ...action.payload.data],
    }
  },
  [REQUEST_ALL_VENDOR_CATEGORY_FAILURE]: (state, action) => {
    return {
      ...state,
      fetchingListAllVendorCategory: false,
      fetchingListAllVendorCategoryFailed: true,
    }
  },
})

export default reducer
export const namespace = 'createUserManagement'

export const handleCreateUser = (userInfo) => async (dispatch, getState) => {
  return await callAPI({
    method: 'post',
    apiPath: '/user/create-user',
    actionTypes: [REQUEST_CREATE_USER, REQUEST_CREATE_USER_SUCCESS, REQUEST_CREATE_USER_FAILURED],
    variables: {
      ...userInfo,
    },
    dispatch,
    getState,
  })
}

export const handleCreateUserAgent = (userInfo) => async (dispatch, getState) => {
  return await callAPI({
    method: 'post',
    apiPath: '/user/create-user-agent',
    actionTypes: [
      REQUEST_CREATE_USER_AGENT,
      REQUEST_CREATE_USER_AGENT_SUCCESS,
      REQUEST_CREATE_USER_AGENT_FAILURED,
    ],
    variables: {
      ...userInfo,
    },
    dispatch,
    getState,
  })
}

export const handleCreateUserVendor = (userInfo) => async (dispatch, getState) => {
  return await callAPI({
    method: 'post',
    apiPath: '/user/create-user-vendor',
    actionTypes: [
      REQUEST_CREATE_USER_VENDOR,
      REQUEST_CREATE_USER_VENDOR_SUCCESS,
      REQUEST_CREATE_USER_VENDOR_FAILURED,
    ],
    variables: {
      ...userInfo,
    },
    dispatch,
    getState,
  })
}

export const handleUploadCreateUser = (file) => async (dispatch, getState) => {
  let formData = new FormData()
  formData.append('file', file)
  return await callAPI({
    method: 'post',
    apiPath: '/file/upload-files',
    actionTypes: [
      REQUEST_UPLOAD_FILE_CREATE_USER,
      REQUEST_UPLOAD_FILE_CREATE_USER_SUCCESS,
      REQUEST_UPLOAD_FILE_CREATE_USER_FAILURED,
    ],
    variables: formData,
    dispatch,
    getState,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const fetchAllVendorCategory = (filters) => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/vendor-category/all',
    actionTypes: [
      REQUEST_ALL_VENDOR_CATEGORY,
      REQUEST_ALL_VENDOR_CATEGORY_SUCCESS,
      REQUEST_ALL_VENDOR_CATEGORY_FAILURE,
    ],
    variables: filters,
    dispatch,
    getState,
  })
}

export const confirmCreateUserAction = (credentials) => ({
  type: CONFIRM_CREATE_USER_ACTION,
  payload: credentials,
})

export const uploadPhotoCreateUserAction = (credentials) => ({
  type: UPLOAD_PHOTO_CREATE_USER_ACTION,
  payload: credentials,
})

export const getAllVendorCategory = (filters) => ({
  type: GET_ALL_VENDOR_CATEGORY_ACTION,
  payload: filters,
})
