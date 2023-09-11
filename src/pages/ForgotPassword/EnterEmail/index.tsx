import { FormControl, FormHelperText, TextField } from '@mui/material'
import CustomButton from 'components/Button'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MAXIMUM_TEXT_FIELD_LENGTH } from 'utils/constants'
import { emailRules, emailValidation, requiredRules } from 'utils/validation'
import LoginHeading from 'components/LoginHeading'
import { useDispatch, useSelector } from 'react-redux'
import { verifyEmailForgotPasswordAction } from 'state/modules/forgotPassword'
import { Loading } from 'components/Loading'

const schema = yup.object().shape({
  email: yup.string().trim().required(requiredRules).matches(emailValidation, emailRules),
})

export type FormValues = { email: string }

const EnterEmail = () => {
  const dispatch = useDispatch()
  const { isVerifyEmailRequesting } = useSelector((state: any) => state.forgotPassword)
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  })

  const onValidForm = (formData: FormValues) => {
    dispatch(verifyEmailForgotPasswordAction({ email: formData.email }))
  }

  return (
    <>
      {isVerifyEmailRequesting && <Loading />}
      <LoginHeading title='Forgot password' subTitle='Please enter a email to recover password' />
      <form onSubmit={handleSubmit(onValidForm)}>
        <Controller
          name='email'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth error={invalid}>
              <TextField
                {...field}
                inputRef={ref}
                label='Email'
                type='email'
                autoComplete='off'
                error={invalid}
                inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
              />
              {invalid && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <CustomButton fullWidth size='large' title='Next' type='submit' />
      </form>
    </>
  )
}

export default EnterEmail
