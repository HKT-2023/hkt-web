import LoginLayout from 'layouts/LoginLayout'
import { FORGOT_PASS_STEP } from 'utils/constants'
import EnterEmail from './EnterEmail/index'
import EnterOTP from './EnterOTP/index'
import EnterNewPass from './EnterNewPass/index'
import { useDispatch, useSelector } from 'react-redux'
import { changeStep } from 'state/modules/forgotPassword'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { step } = useSelector((state: any) => state.forgotPassword)

  return (
    <LoginLayout>
      {step === FORGOT_PASS_STEP.ENTER_EMAIL ? (
        <EnterEmail />
      ) : step === FORGOT_PASS_STEP.ENTER_OTP ? (
        <EnterOTP setStep={(step) => dispatch(changeStep(step))} />
      ) : (
        <EnterNewPass />
      )}
    </LoginLayout>
  )
}

export default ForgotPassword
