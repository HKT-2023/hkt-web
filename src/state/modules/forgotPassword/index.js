import { createReducer } from 'redux-create-reducer'
import callAPI from '../../../utils/callAPI'
import { FORGOT_PASS_STEP } from '../../../utils/constants'

export const VERIFY_EMAIL_FORGOT_PASSWORD_ACTION = 'VERIFY_EMAIL_FORGOT_PASSWORD_ACTION'
export const VERIFY_EMAIL_FORGOT_PASSWORD_SUCCESS = 'VERIFY_EMAIL_FORGOT_PASSWORD_SUCCESS'
export const VERIFY_EMAIL_FORGOT_PASSWORD_FAILURE = 'VERIFY_EMAIL_FORGOT_PASSWORD_FAILURE'
export const VERIFY_EMAIL_FORGOT_PASSWORD = 'VERIFY_EMAIL_FORGOT_PASSWORD'

export const RESEND_VERIFY_EMAIL = 'RESEND_VERIFY_EMAIL'

export const VALIDATE_CODE = 'VALIDATE_CODE'
export const VALIDATE_CODE_ACTION = 'VALIDATE_CODE_ACTION'
export const VALIDATE_CODE_SUCCESS = 'VALIDATE_CODE_SUCCESS'
export const VALIDATE_CODE_FAILURE = 'VALIDATE_CODE_FAILURE'

export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_ACTION = 'RESET_PASSWORD_ACTION'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

export const CHANGE_STEP_FORGOT_PASSWORD_ACTION = 'CHANGE_STEP_FORGOT_PASSWORD_ACTION'

const defaultState = {
  isVerifyEmailRequesting: false,
  errorVerifyCode: null,
  validatedCode: '',
  error: {},
  isValidateCodeRequesting: false,
  isResetPasswordRequesting: false,
  step: FORGOT_PASS_STEP.ENTER_EMAIL,
}

const reducer = createReducer(defaultState, {
  [VERIFY_EMAIL_FORGOT_PASSWORD]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isVerifyEmailRequesting: true,
    }
  },
  [VERIFY_EMAIL_FORGOT_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isVerifyEmailRequesting: false,
      step: FORGOT_PASS_STEP.ENTER_OTP,
    }
  },
  [VERIFY_EMAIL_FORGOT_PASSWORD_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isVerifyEmailRequesting: false,
    }
  },
  [VERIFY_EMAIL_FORGOT_PASSWORD_ACTION]: (state, action) => {
    return {
      ...state,
      emailVerify: action.payload.email,
    }
  },
  [VALIDATE_CODE]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isValidateCodeRequesting: true,
    }
  },
  [VALIDATE_CODE_SUCCESS]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      validatedCode: action.meta.variables.code,
      isValidateCodeRequesting: false,
      step: FORGOT_PASS_STEP.ENTER_NEW_PASS,
    }
  },
  [VALIDATE_CODE_FAILURE]: (state, action) => {
    return {
      ...state,
      errorVerifyCode: action.payload,
      isValidateCodeRequesting: false,
    }
  },
  [RESET_PASSWORD]: (state, action) => {
    return {
      ...state,
      isResetPasswordRequesting: true,
    }
  },
  [RESET_PASSWORD_SUCCESS]: (state, action) => {
    return {
      ...state,
      isResetPasswordRequesting: false,
      step: FORGOT_PASS_STEP.ENTER_EMAIL,
    }
  },
  [RESET_PASSWORD_FAILURE]: (state, action) => {
    return {
      ...state,
      error: action.payload,
      isResetPasswordRequesting: false,
    }
  },
  [RESEND_VERIFY_EMAIL]: (state, action) => {
    return {
      ...state,
      errorVerifyCode: null,
      isVerifyEmailSuccess: false,
    }
  },
  [CHANGE_STEP_FORGOT_PASSWORD_ACTION]: (state, action) => {
    return {
      ...state,
      step: action.payload,
    }
  },
})

export default reducer
export const namespace = 'forgotPassword'

export const verifyEmailForgotPasswordAction = (email) => ({
  type: VERIFY_EMAIL_FORGOT_PASSWORD_ACTION,
  payload: email,
})

export const verifyCodeForgotPasswordAction = (payload) => ({
  type: VALIDATE_CODE_ACTION,
  payload: {
    email: payload.email,
    code: payload.code,
  },
})

export const resetPasswordAction = (payload) => ({
  type: RESET_PASSWORD_ACTION,
  payload: payload,
})

export const resendVerifyCodeAction = () => ({
  type: RESEND_VERIFY_EMAIL,
})

export const changeStep = (payload) => ({
  type: CHANGE_STEP_FORGOT_PASSWORD_ACTION,
  payload: payload,
})

export const verifyEmailForgotPassword = (email) => async (dispatch, getState) => {
  return await callAPI({
    method: 'put',
    apiPath: `/user/forgot-password/${email}`,
    actionTypes: [
      VERIFY_EMAIL_FORGOT_PASSWORD,
      VERIFY_EMAIL_FORGOT_PASSWORD_SUCCESS,
      VERIFY_EMAIL_FORGOT_PASSWORD_FAILURE,
    ],
    variables: {
      email,
    },
    dispatch,
    getState,
  })
}

export const verifyCodeForgotPassword = (payload) => async (dispatch, getState) => {
  return await callAPI({
    method: 'post',
    apiPath: `/user/validate-code`,
    actionTypes: [VALIDATE_CODE, VALIDATE_CODE_SUCCESS, VALIDATE_CODE_FAILURE],
    variables: {
      email: payload.email,
      code: payload.code,
    },
    dispatch,
    getState,
  })
}

export const fetchResetPassword = (payload) => async (dispatch, getState) => {
  return await callAPI({
    method: 'put',
    apiPath: `/user/reset-password`,
    actionTypes: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    variables: payload,
    dispatch,
    getState,
  })
}
