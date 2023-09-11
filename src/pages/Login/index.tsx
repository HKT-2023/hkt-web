import { useState } from 'react'
import LoginLayout from 'layouts/LoginLayout'
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import styles from './styles.module.scss'
import { ROUTE_FORGOT_PASS, goToPage } from 'state/modules/routing'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from 'components/Button'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { emailValidation, requiredRules, emailRules } from 'utils/validation'
import { MAXIMUM_TEXT_FIELD_LENGTH } from 'utils/constants'
import { loginAction } from 'state/modules/auth'
import LoginHeading from 'components/LoginHeading'
import CustomToast from 'components/Alert'

const schema = yup.object().shape({
  email: yup.string().trim().required(requiredRules).matches(emailValidation, emailRules),
  password: yup.string().trim().required(requiredRules),
})

export type FormValues = { email: string; password: string }

const Login = () => {
  const dispatch = useDispatch()
  const isShowToastAlert = useSelector((state: any) => state.app.isShowToastAlert)
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onValidForm = (formData: FormValues) => {
    dispatch(loginAction({ email: formData.email, password: formData.password }))
  }

  return (
    <LoginLayout>
      <LoginHeading title='Sign in' subTitle='Please enter username and password for login' />
      <form onSubmit={handleSubmit(onValidForm)}>
        <TextField name='email' sx={{ display: 'none' }} />
        <Controller
          name='email'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl sx={{ mb: 2.5 }} variant='outlined' fullWidth error={invalid}>
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
        <TextField name='password' sx={{ display: 'none' }} />
        <Controller
          name='password'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl sx={{ mb: 1 }} variant='outlined' fullWidth error={invalid}>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                {...field}
                inputRef={ref}
                id='outlined-adornment-password'
                label='Password'
                autoComplete='off'
                type={showPassword ? 'text' : 'password'}
                inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword((show) => !show)}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {invalid && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <Box className={styles.forgotLayout}>
          <Typography
            className={styles.forgotText}
            onClick={() => dispatch(goToPage(ROUTE_FORGOT_PASS))}
          >
            Forgot Password?
          </Typography>
        </Box>
        <CustomButton fullWidth size='large' title='Sign in' type='submit' />
      </form>
      {isShowToastAlert && <CustomToast />}
    </LoginLayout>
  )
}

export default Login
