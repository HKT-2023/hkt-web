import { Box, Typography } from '@mui/material'
import styles from './styles.module.scss'
import OtpInput from 'components/OTPInput'
import { OTP_LENGTH, TIME_RESEND_OTP } from 'utils/constants'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import CustomButton from 'components/Button'
import { FORGOT_PASS_STEP } from 'utils/constants'
import LoginHeading from 'components/LoginHeading'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeStep,
  resendVerifyCodeAction,
  verifyCodeForgotPasswordAction,
} from 'state/modules/forgotPassword'
import { Loading } from 'components/Loading'

interface IProps {
  setStep: (step: FORGOT_PASS_STEP) => void
}

const ACCEPT_REQUEST_NUMBER = 5

const EnterOTP = ({ setStep }: IProps) => {
  const dispatch = useDispatch()
  const { emailVerify, errorVerifyCode, isValidateCodeRequesting } = useSelector(
    (state: any) => state.forgotPassword,
  )
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(TIME_RESEND_OTP)
  const [expiredOTP, setExpiredOTP] = useState(false)
  const [numberFailRequest, setNumberFailRequest] = useState(0)
  const invalidOTP = otp.length < OTP_LENGTH

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000)
    } else if (_.isEmpty(otp)) {
      setExpiredOTP(true)
      dispatch(changeStep(FORGOT_PASS_STEP.ENTER_EMAIL))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, otp])

  const handleSubmit = async () => {
    if (numberFailRequest < ACCEPT_REQUEST_NUMBER) {
      await dispatch(verifyCodeForgotPasswordAction({ email: emailVerify, code: otp }))
      setNumberFailRequest((prevState) => prevState + 1)
    } else {
      dispatch(resendVerifyCodeAction())
      dispatch(changeStep(FORGOT_PASS_STEP.ENTER_EMAIL))
    }
  }

  return (
    <>
      {isValidateCodeRequesting && <Loading />}
      <LoginHeading
        title='Forgot password'
        subTitle='We have sent a security code to your email. Please check your email.'
      />
      <Box sx={{ mb: 0.5 }}>
        <OtpInput
          value={otp}
          onChange={(otp: any) => setOtp(otp)}
          numInputs={OTP_LENGTH}
          isInputNum
          shouldAutoFocus
          separator='-'
          hasErrored={expiredOTP || invalidOTP}
        />
      </Box>
      {invalidOTP && (
        <Typography className={styles.textWarning}>
          The code is invalid. Please try again.
        </Typography>
      )}
      {errorVerifyCode && (
        <Typography className={styles.textWarning}>{errorVerifyCode?.data?.message}</Typography>
      )}
      <Typography sx={{ mb: 4 }}>
        If you did not receive a code please wait <span className={styles.textCyan}>{timer}</span>{' '}
        seconds to receive code.{' '}
        {expiredOTP && <span className={styles.resendCode}>Resend code</span>}
      </Typography>
      <CustomButton
        fullWidth
        size='large'
        title='Next'
        disabled={invalidOTP}
        onClick={handleSubmit}
      />
    </>
  )
}

export default EnterOTP
