import { createReducer } from 'redux-create-reducer'
import callAPI from 'utils/callAPI'

export const REQUEST_USER_MANAGEMENT = 'REQUEST_USER_MANAGEMENT'
export const REQUEST_USER_MANAGEMENT_SUCCESS = 'REQUEST_USER_MANAGEMENT_SUCCESS'
export const REQUEST_USER_MANAGEMENT_FAILURE = 'REQUEST_USER_MANAGEMENT_FAILURE'

export const REQUEST_VENDOR_CATEGORY_ALL_LIST = 'REQUEST_VENDOR_CATEGORY_ALL_LIST'
export const REQUEST_VENDOR_CATEGORY_ALL_LIST_SUCCESS = 'REQUEST_VENDOR_CATEGORY_ALL_LIST_SUCCESS'
export const REQUEST_VENDOR_CATEGORY_ALL_LIST_FAILURE = 'REQUEST_VENDOR_CATEGORY_ALL_LIST_FAILURE'

export const SEARCH_ACTION = 'SEARCH_ACTION'
export const GET_VENDOR_CATEGORY_ALL_LIST_ACTION = 'GET_VENDOR_CATEGORY_ALL_LIST_ACTION'
export const CLEAR_VENDOR_CATEGORY_ALL_LIST_ACTION = 'CLEAR_VENDOR_CATEGORY_ALL_LIST_ACTION'

const defaultState = {
  data: [],
  fetchingUserManagement: true,
  failedFetchingUserManagement: false,
  vendorCategoryInfoList: {
    data: [],
    metadata: {},
  },
}

const reducer = createReducer(defaultState, {
  [REQUEST_USER_MANAGEMENT]: (state) => {
    return {
      ...state,
      fetchingUserManagement: true,
      failedFetchingUserManagement: false,
    }
  },
  [REQUEST_USER_MANAGEMENT_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: action.payload,
      fetchingUserManagement: false,
      failedFetchingUserManagement: false,
    }
  },
  [REQUEST_USER_MANAGEMENT_FAILURE]: (state) => {
    return {
      ...state,
      fetchingUserManagement: false,
      failedFetchingUserManagement: true,
    }
  },
  [REQUEST_VENDOR_CATEGORY_ALL_LIST_SUCCESS]: (state, action) => {
    return {
      ...state,
      vendorCategoryInfoList: {
        ...action.payload,
        data: [...state.vendorCategoryInfoList.data, ...action.payload.data],
      },
    }
  },
  [CLEAR_VENDOR_CATEGORY_ALL_LIST_ACTION]: (state) => {
    return {
      ...state,
      vendorCategoryInfoList: {
        data: [],
        metadata: {},
      },
    }
  },
})

export default reducer
export const namespace = 'userManagement'

export const searchAction = (filters) => ({
  type: SEARCH_ACTION,
  payload: filters,
})

export const fetchUserManagement = (filters) => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/user/list-user',
    actionTypes: [
      REQUEST_USER_MANAGEMENT,
      REQUEST_USER_MANAGEMENT_SUCCESS,
      REQUEST_USER_MANAGEMENT_FAILURE,
    ],
    variables: { ...filters },
    dispatch,
    getState,
  })
}

export const fetchVendorCategoryAllList = (filters) => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/vendor-category/all',
    actionTypes: [
      REQUEST_VENDOR_CATEGORY_ALL_LIST,
      REQUEST_VENDOR_CATEGORY_ALL_LIST_SUCCESS,
      REQUEST_VENDOR_CATEGORY_ALL_LIST_FAILURE,
    ],
    variables: filters,
    dispatch,
    getState,
  })
}

export const getVendorCategoryAllListAction = (filters) => ({
  type: GET_VENDOR_CATEGORY_ALL_LIST_ACTION,
  payload: filters,
})

export const clearVendorCategoryAllListAction = (filters) => ({
  type: CLEAR_VENDOR_CATEGORY_ALL_LIST_ACTION,
  payload: filters,
})
