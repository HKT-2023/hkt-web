import { createReducer } from 'redux-create-reducer'
import callAPI from 'utils/callAPI'

export const REQUEST_FETCH_USER_DETAILS = 'REQUEST_FETCH_USER_DETAILS'
export const REQUEST_FETCH_USER_DETAILS_SUCCESS = 'REQUEST_FETCH_USER_DETAILS_SUCCESS'
export const REQUEST_FETCH_USER_DETAILS_FAILURED = 'REQUEST_FETCH_USER_DETAILS_FAILURED'

export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER'
export const REQUEST_UPDATE_USER_SUCCESS = 'REQUEST_UPDATE_USER_SUCCESS'
export const REQUEST_UPDATE_USER_FAILURED = 'REQUEST_UPDATE_USER_FAILURED'

export const REQUEST_UPDATE_USER_AGENT = 'REQUEST_UPDATE_USER_AGENT'
export const REQUEST_UPDATE_USER_AGENT_SUCCESS = 'REQUEST_UPDATE_USER_AGENT_SUCCESS'
export const REQUEST_UPDATE_USER_AGENT_FAILURED = 'REQUEST_UPDATE_USER_AGENT_FAILURED'

export const REQUEST_UPDATE_USER_VENDOR = 'REQUEST_UPDATE_USER_VENDOR'
export const REQUEST_UPDATE_USER_VENDOR_SUCCESS = 'REQUEST_UPDATE_USER_VENDOR_SUCCESS'
export const REQUEST_UPDATE_USER_VENDOR_FAILURED = 'REQUEST_UPDATE_USER_VENDOR_FAILURED'

export const REQUEST_CHANGE_PASSWORD = 'REQUEST_CHANGE_PASSWORD'
export const REQUEST_CHANGE_PASSWORD_SUCCESS = 'REQUEST_CHANGE_PASSWORD_SUCCESS'
export const REQUEST_CHANGE_PASSWORD_FAILURED = 'REQUEST_CHANGE_PASSWORD_FAILURED'

export const REQUEST_UPLOAD_FILE_UPDATE_USER = 'REQUEST_UPLOAD_FILE_UPDATE_USER'
export const REQUEST_UPLOAD_FILE_UPDATE_USER_SUCCESS = 'REQUEST_UPLOAD_FILE_UPDATE_USER_SUCCESS'
export const REQUEST_UPLOAD_FILE_UPDATE_USER_FAILURED = 'REQUEST_UPLOAD_FILE_UPDATE_USER_FAILURED'

export const REQUEST_ALL_VENDOR_CATEGORY_UPDATE = 'REQUEST_ALL_VENDOR_CATEGORY_UPDATE'
export const REQUEST_ALL_VENDOR_CATEGORY_UPDATE_SUCCESS =
  'REQUEST_ALL_VENDOR_CATEGORY_UPDATE_SUCCESS'
export const REQUEST_ALL_VENDOR_CATEGORY_UPDATE_FAILURE =
  'REQUEST_ALL_VENDOR_CATEGORY_UPDATE_FAILURE'

export const CONFIRM_UPDATE_USER_ACTION = 'CONFIRM_UPDATE_USER_ACTION'
export const UPLOAD_PHOTO_UPDATE_USER_ACTION = 'UPLOAD_PHOTO'
export const FETCH_USER_DETAIL_ACTION = 'TRIGGER_FETCH_USER_DETAIL_ACTION'
export const GET_ALL_VENDOR_CATEGORY_UPDATE_ACTION = 'GET_ALL_VENDOR_CATEGORY_UPDATE_ACTION'

const defaultState = {
  fetchingUpdateUser: false,
  failedFetchingUpdateUser: false,

  fetchingUpdateUserAgent: false,
  failedFetchingUpdateUserAgent: false,

  fetchingUpdateUserVendor: false,
  failedFetchingUpdateUserVendor: false,

  photo: undefined,
  fetchingUploadPhoto: false,
  failedFetchingUploadPhoto: false,

  userDetails: {},
  fetchingFetchUserDetails: false,
  failedFetchingFetchUserDetails: false,

  listAllVendorCategoryUpdate: [],
  fetchingListAllVendorCategoryUpdate: false,
  fetchingListAllVendorCategoryUpdateFailed: false,
}

const reducer = createReducer(defaultState, {
  [REQUEST_UPDATE_USER]: (state, action) => {
    return {
      ...state,
      fetchingUpdateUser: true,
      failedFetchingUpdateUser: false,
    }
  },
  [REQUEST_UPDATE_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      fetchingUpdateUser: false,
      failedFetchingUpdateUser: false,
    }
  },
  [REQUEST_UPDATE_USER_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingUpdateUser: false,
      failedFetchingUpdateUser: true,
    }
  },

  [REQUEST_UPDATE_USER_VENDOR]: (state, action) => {
    return {
      ...state,
      fetchingUpdateUserVendor: true,
      failedFetchingUpdateUserVendor: false,
    }
  },
  [REQUEST_UPDATE_USER_VENDOR_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      fetchingUpdateUserVendor: false,
      failedFetchingUpdateUserVendor: false,
    }
  },
  [REQUEST_UPDATE_USER_VENDOR_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingUpdateUserVendor: false,
      failedFetchingUpdateUserVendor: true,
    }
  },

  [REQUEST_UPDATE_USER_AGENT]: (state, action) => {
    return {
      ...state,
      fetchingUpdateUserAgent: true,
      failedFetchingUpdateUserAgent: false,
    }
  },
  [REQUEST_UPDATE_USER_AGENT_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      fetchingUpdateUserAgent: false,
      failedFetchingUpdateUserAgent: false,
    }
  },
  [REQUEST_UPDATE_USER_AGENT_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingUpdateUserAgent: false,
      failedFetchingUpdateUserAgent: true,
    }
  },

  [REQUEST_UPLOAD_FILE_UPDATE_USER]: (state, action) => {
    return {
      ...state,
      fetchingUploadPhoto: true,
      failedFetchingUploadPhoto: false,
    }
  },
  [REQUEST_UPLOAD_FILE_UPDATE_USER_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      photo: action.payload,
      fetchingUploadPhoto: false,
      failedFetchingUploadPhoto: false,
    }
  },
  [REQUEST_UPLOAD_FILE_UPDATE_USER_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingUploadPhoto: false,
      failedFetchingUploadPhoto: true,
    }
  },

  [REQUEST_FETCH_USER_DETAILS]: (state, action) => {
    return {
      ...state,
      fetchingFetchUserDetails: true,
      failedFetchingFetchUserDetails: false,
    }
  },
  [REQUEST_FETCH_USER_DETAILS_SUCCESS]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      userDetails: action.payload.data,
      fetchingFetchUserDetails: false,
      failedFetchingFetchUserDetails: false,
    }
  },

  [REQUEST_FETCH_USER_DETAILS_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      fetchingFetchUserDetails: false,
      failedFetchingFetchUserDetails: true,
    }
  },
  [REQUEST_ALL_VENDOR_CATEGORY_UPDATE]: (state, action) => {
    return {
      ...state,
      fetchingListAllVendorCategoryUpdate: true,
      fetchingListAllVendorCategoryUpdateFailed: false,
    }
  },
  [REQUEST_ALL_VENDOR_CATEGORY_UPDATE_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetchingListAllVendorCategoryUpdate: false,
      fetchingListAllVendorCategoryUpdateFailed: false,
      listAllVendorCategoryUpdate: [...state.listAllVendorCategoryUpdate, ...action.payload.data],
    }
  },
  [REQUEST_ALL_VENDOR_CATEGORY_UPDATE_FAILURE]: (state, action) => {
    return {
      ...state,
      fetchingListAllVendorCategoryUpdate: false,
      fetchingListAllVendorCategoryUpdateFailed: true,
    }
  },
})

export default reducer
export const namespace = 'userManagementUpdate'

export const handleUpdateUser = (userInfo) => async (dispatch, getState) => {
  return await callAPI({
    method: 'put',
    apiPath: '/user/update-user',
    actionTypes: [REQUEST_UPDATE_USER, REQUEST_UPDATE_USER_SUCCESS, REQUEST_UPDATE_USER_FAILURED],
    variables: userInfo,
    dispatch,
    getState,
  })
}

export const handleUpdateUserAgent = (userInfo) => async (dispatch, getState) => {
  return await callAPI({
    method: 'put',
    apiPath: '/user/update-user-agent',
    actionTypes: [
      REQUEST_UPDATE_USER_AGENT,
      REQUEST_UPDATE_USER_AGENT_SUCCESS,
      REQUEST_UPDATE_USER_AGENT_FAILURED,
    ],
    variables: userInfo,
    dispatch,
    getState,
  })
}

export const handleUpdateUserVendor = (userInfo) => async (dispatch, getState) => {
  return await callAPI({
    method: 'put',
    apiPath: '/user/update-user-vendor',
    actionTypes: [
      REQUEST_UPDATE_USER_VENDOR,
      REQUEST_UPDATE_USER_VENDOR_SUCCESS,
      REQUEST_UPDATE_USER_VENDOR_FAILURED,
    ],
    variables: userInfo,
    dispatch,
    getState,
  })
}

export const handleUploadUpdateUser = (file) => async (dispatch, getState) => {
  let formData = new FormData()
  formData.append('file', file)
  return await callAPI({
    method: 'post',
    apiPath: '/file/upload-files',
    actionTypes: [
      REQUEST_UPLOAD_FILE_UPDATE_USER,
      REQUEST_UPLOAD_FILE_UPDATE_USER_SUCCESS,
      REQUEST_UPLOAD_FILE_UPDATE_USER_FAILURED,
    ],
    variables: formData,
    dispatch,
    getState,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const fetchUserDetails = (id) => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/user/information',
    actionTypes: [
      REQUEST_FETCH_USER_DETAILS,
      REQUEST_FETCH_USER_DETAILS_SUCCESS,
      REQUEST_FETCH_USER_DETAILS_FAILURED,
    ],
    variables: { userId: id },
    dispatch,
    getState,
  })
}

export const fetchAllVendorCategoryUpdate = (filters) => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/vendor-category/all',
    actionTypes: [
      REQUEST_ALL_VENDOR_CATEGORY_UPDATE,
      REQUEST_ALL_VENDOR_CATEGORY_UPDATE_SUCCESS,
      REQUEST_ALL_VENDOR_CATEGORY_UPDATE_FAILURE,
    ],
    variables: filters,
    dispatch,
    getState,
  })
}

export const confirmUpdateUserAction = (credentials) => ({
  type: CONFIRM_UPDATE_USER_ACTION,
  payload: credentials,
})

export const uploadPhotoUpdateUserAction = (credentials) => ({
  type: UPLOAD_PHOTO_UPDATE_USER_ACTION,
  payload: credentials,
})

export const fetchUserDetailsAction = (credentials) => ({
  type: FETCH_USER_DETAIL_ACTION,
  payload: credentials,
})

export const getAllVendorCategoryUpdate = (filters) => ({
  type: GET_ALL_VENDOR_CATEGORY_UPDATE_ACTION,
  payload: filters,
})
