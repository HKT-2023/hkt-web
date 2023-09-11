import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import CustomButton from 'components/Button'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MAXIMUM_TEXT_FIELD_LENGTH } from 'utils/constants'
import { confirmPassRules, pwRules, passwordValidation, requiredRules } from 'utils/validation'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LoginHeading from 'components/LoginHeading'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordAction } from 'state/modules/forgotPassword'
import { Loading } from 'components/Loading'

const schema = yup.object().shape({
  password: yup.string().required(requiredRules).matches(passwordValidation, pwRules),
  confirmPassword: yup
    .string()
    .required(requiredRules)
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], confirmPassRules),
    }),
})

export type FormValues = { password: string; confirmPassword: string }

const Index = () => {
  const dispatch = useDispatch()
  const { emailVerify, validatedCode, isResetPasswordRequesting } = useSelector(
    (state: any) => state.forgotPassword,
  )

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onValidForm = (formData: FormValues) => {
    dispatch(
      resetPasswordAction({
        email: emailVerify,
        code: validatedCode,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      }),
    )
  }

  return (
    <>
      {isResetPasswordRequesting && <Loading />}
      <LoginHeading
        title='Forgot password'
        subTitle='Please enter new password and confirm new password'
      />
      <form onSubmit={handleSubmit(onValidForm)}>
        <Controller
          name='password'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth error={invalid}>
              <InputLabel htmlFor='outlined-password'>Password</InputLabel>
              <OutlinedInput
                {...field}
                inputRef={ref}
                id='outlined-password'
                label='Password'
                autoComplete='off'
                type={showPass ? 'text' : 'password'}
                inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPass((show) => !show)}
                      edge='end'
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {invalid && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl sx={{ mb: 3 }} variant='outlined' fullWidth error={invalid}>
              <InputLabel htmlFor='outlined-confirm-password'>Confirm Password</InputLabel>
              <OutlinedInput
                {...field}
                inputRef={ref}
                id='outlined-confirm-password'
                label='Confirm Password'
                autoComplete='off'
                type={showConfirmPass ? 'text' : 'password'}
                inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowConfirmPass((show) => !show)}
                      edge='end'
                    >
                      {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {invalid && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <CustomButton fullWidth size='large' title='Confirm' type='submit' />
      </form>
    </>
  )
}

export default Index
