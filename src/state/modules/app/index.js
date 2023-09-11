import { createReducer } from 'redux-create-reducer'

export const BOOT = 'BOOT'
export const BOOT_FINISHED = 'BOOT_FINISHED'
export const SHOW_TOAST_ALERT = 'SHOW_TOAST_ALERT'
export const CLOSE_TOAST_ALERT = 'CLOSE_TOAST_ALERT'

export const SHOW_BELL_NOTIFICATION = 'SHOW_BELL_NOTIFICATION'
export const HIDE_BELL_NOTIFICATION = 'HIDE_BELL_NOTIFICATION'

export const SHOW_BLOCK_NAVIGATION_MODAL = 'SHOW_BLOCK_NAVIGATION_MODAL'
export const HIDE_BLOCK_NAVIGATION_MODAL = 'HIDE_BLOCK_NAVIGATION_MODAL'

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'

const defaultState = {
  isBooting: false,
  bootDidFinish: false,

  userChannels: {},
  fetchingUserChannels: true,
  failedFetchingUserChannels: false,

  isSavingChannel: false,
  faledSaveChannel: false,

  isShowToastAlert: false,
  isShowBellNotification: false,
  toastAlertPayload: {
    type: 'success',
    message: '',
  },
  isOpenSnackBar: false,
  snackbarPayload: {},
  blockNavigationMessage: '',
}

const reducer = createReducer(defaultState, {
  [BOOT]: (state) => ({
    ...state,
    isBooting: true,
    bootDidFinish: false,
  }),
  [BOOT_FINISHED]: (state) => ({
    ...state,
    isBooting: false,
    bootDidFinish: true,
  }),
  [SHOW_TOAST_ALERT]: (state, action) => ({
    ...state,
    isShowToastAlert: true,
    toastAlertPayload: action.payload,
  }),
  [CLOSE_TOAST_ALERT]: (state) => ({
    ...state,
    isShowToastAlert: false,
    toastAlertPayload: {
      type: 'success',
      message: '',
    },
  }),
  [SHOW_BELL_NOTIFICATION]: (state) => ({
    ...state,
    isShowBellNotification: true,
  }),

  [HIDE_BELL_NOTIFICATION]: (state) => ({
    ...state,
    isShowBellNotification: false,
  }),

  [OPEN_SNACKBAR]: (state, action) => ({
    ...state,
    isOpenSnackBar: true,
    snackbarPayload: {
      ...action.payload,
    },
  }),
  [CLOSE_SNACKBAR]: (state, action) => ({
    ...state,
    isOpenSnackBar: false,
    snackbarPayload: {},
  }),
})

export default reducer
export const namespace = 'app'

export const boot = (options = {}) => ({
  type: BOOT,
  payload: options,
})

export const bootFinished = () => ({
  type: BOOT_FINISHED,
})

export const showToastAlert = (message = '', type = 'success') => ({
  type: SHOW_TOAST_ALERT,
  payload: {
    type,
    message,
  },
})

export const closeToastAlert = () => ({
  type: CLOSE_TOAST_ALERT,
})

export const hideBellNotification = () => ({
  type: HIDE_BELL_NOTIFICATION,
})

export const showBellNotification = () => ({
  type: SHOW_BELL_NOTIFICATION,
})

export const openSnackBar = (payload) => ({
  type: OPEN_SNACKBAR,
  payload: {
    ...payload,
  },
})

export const closeSnackar = () => ({
  type: CLOSE_SNACKBAR,
})

export const isBooting = (state) => state.app.isBooting
export const bootDidFinish = (state) => state.app.bootDidFinish
export const selectUserChannels = (state) => state.app.userChannels
export const selectIsOpenSnackBar = (state) => state.app.isOpenSnackBar
export const selectSnackbarPayload = (state) => state.app.snackbarPayload
