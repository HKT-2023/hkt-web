import { createReducer } from 'redux-create-reducer'
import callAPI from '../../../utils/callAPI'
import { getAuthToken, removeAuthToken } from '../../../utils/localStorage'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGIN_SUCCESSED = 'REQUEST_LOGIN_SUCCESSED'
export const REQUEST_LOGIN_FAILURED = 'REQUEST_LOGIN_FAILURED'

export const REQUEST_LOGIN_TOKEN = 'REQUEST_LOGIN_TOKEN'
export const REQUEST_LOGIN_TOKEN_SUCCESSED = 'REQUEST_LOGIN_TOKEN_SUCCESSED'
export const REQUEST_LOGIN_TOKEN_FAILURED = 'REQUEST_LOGIN_TOKEN_FAILURED'

export const FETCH_USER_SAGA = 'FETCH_USER_SAGA'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FAILURED = 'FETCH_USER_FAILURED'

export const REQUEST_CHANGE_PASSWORD = 'REQUEST_CHANGE_PASSWORD'
export const REQUEST_CHANGE_PASSWORD_SUCCESS = 'REQUEST_CHANGE_PASSWORD_SUCCESS'
export const REQUEST_CHANGE_PASSWORD_FAILURED = 'REQUEST_CHANGE_PASSWORD_FAILURED'

export const LOGOUT_ACTION = 'LOGOUT_ACTION'
export const LOGOUT_SAGA = 'LOGOUT_SAGA'
export const LOGIN_ACTION = 'LOGIN_ACTION'
export const UPDATE_USER_SHOP = 'UPDATE_USER_SHOP'
export const CHANGE_PASSWORD_ACTION = 'CHANGE_PASSWORD_ACTION'

const defaultState = {
  isAuthFinshed: false,
  isAuthRequesting: false,
  isAuthFailured: false,
  isAuthSuccessed: false,
  isRemovedShop: false,
  token: '',
  error: {},
  user: {},

  userConfig: {},
  userShop: {},
  updatingUserConfig: false,
  failedUpdatingUserConfig: false,
}

const reducer = createReducer(defaultState, {
  [REQUEST_LOGIN]: (state) => ({
    ...state,
    isAuthRequesting: true,
  }),
  [REQUEST_LOGIN_SUCCESSED]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      isAuthFinshed: true,
      isAuthFailured: false,
      isAuthSuccessed: true,
      isAuthRequesting: false,
    }
  },
  [REQUEST_LOGIN_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isAuthFinshed: true,
      isAuthFailured: true,
      isAuthRequesting: false,
      isAuthSuccessed: false,
    }
  },

  [REQUEST_LOGIN_TOKEN]: (state) => ({
    ...state,
    isAuthRequesting: true,
    isAuthFinshed: false,
    isAuthFailured: false,
    isAuthSuccessed: false,
  }),
  [REQUEST_LOGIN_TOKEN_SUCCESSED]: (state, action) => {
    return {
      ...state,
      ...action.payload,
      isAuthFinshed: true,
      isAuthFailured: false,
      isAuthSuccessed: true,
      isAuthRequesting: false,
    }
  },
  [REQUEST_LOGIN_TOKEN_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isAuthFinshed: true,
      isAuthFailured: true,
      isAuthRequesting: false,
      isAuthSuccessed: false,
    }
  },
  [LOGOUT_ACTION]: (state) => {
    return {
      ...state,
      isAuthFailured: false,
      isAuthSuccessed: false,
      isAuthRequesting: false,
    }
  },
  [FETCH_USER_SUCCESS]: (state, action) => {
    const user = action.payload.data
    return {
      ...state,
      user,
      isAuthFinshed: true,
      isAuthFailured: false,
      isAuthSuccessed: true,
      isAuthRequesting: false,
    }
  },
  [FETCH_USER_FAILURED]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isAuthFinshed: true,
      isAuthFailured: true,
      isAuthRequesting: false,
      isAuthSuccessed: false,
    }
  },
  [REQUEST_CHANGE_PASSWORD]: (state, action) => {
    return {
      ...state,
      isAuthRequesting: true,
    }
  },
})

export default reducer
export const namespace = 'auth'

export const loginAction = (credentials) => ({
  type: LOGIN_ACTION,
  payload: credentials,
})

export const changePasswordAction = (credentials) => ({
  type: CHANGE_PASSWORD_ACTION,
  payload: credentials,
})

export const loginSucceed = (payload) => ({
  type: REQUEST_LOGIN_SUCCESSED,
  payload,
})

export const loginByTokenAction = () => ({
  type: REQUEST_LOGIN_TOKEN,
})

export const logout = () => async (dispatch, getState) => {
  removeAuthToken()
}

export const fetchUserInfor =
  (token = '') =>
  async (dispatch, getState) => {
    token = token ? token : getAuthToken()
    return await callAPI({
      method: 'get',
      apiPath: '/user/information',
      actionTypes: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURED],
      variables: {
        token,
      },
      dispatch,
      getState,
    })
  }

export const handleLogin = (email, password) => async (dispatch, getState) => {
  return await callAPI({
    method: 'post',
    apiPath: '/auth/login',
    actionTypes: [REQUEST_LOGIN, REQUEST_LOGIN_SUCCESSED, REQUEST_LOGIN_FAILURED],
    variables: {
      email,
      password,
    },
    dispatch,
    getState,
  })
}

export const handleChangePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch, getState) => {
    return await callAPI({
      method: 'put',
      apiPath: '/user/change-password',
      actionTypes: [
        REQUEST_CHANGE_PASSWORD,
        REQUEST_CHANGE_PASSWORD_SUCCESS,
        REQUEST_CHANGE_PASSWORD_FAILURED,
      ],
      variables: {
        oldPassword,
        newPassword,
        confirmPassword,
      },
      dispatch,
      getState,
    })
  }

export const selectUser = (state) => state[namespace].user
export const selectUserId = (state) => state[namespace].user.id
