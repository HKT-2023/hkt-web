import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import styles from './styles.module.scss'
import Title from 'components/Title'
import CustomButton from 'components/Button'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { confirmPassRules, pwRules, passwordValidation, requiredRules } from 'utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { MAXIMUM_TEXT_FIELD_LENGTH } from 'utils/constants'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { changePasswordAction } from 'state/modules/auth'
import { useDispatch } from 'react-redux'

interface IChangePassword {
  setShowModal?: any
}

type FormValues = { currentPassword: string; newPassword: string; confirmPassword: string }

const schema = yup.object().shape({
  currentPassword: yup.string().trim().required(requiredRules).matches(passwordValidation, pwRules),
  newPassword: yup.string().trim().required(requiredRules).matches(passwordValidation, pwRules),
  confirmPassword: yup.string().trim().required(requiredRules).matches(passwordValidation, pwRules),
})

const ChangePassword = ({ setShowModal }: IChangePassword) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const onValidForm = (formData: FormValues) => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMsg(confirmPassRules)
      return
    }
    // handle on valid form
    dispatch(
      changePasswordAction({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }),
    )

    setShowModal(false)
  }

  return (
    <>
      <Title>Change password</Title>
      <form onSubmit={handleSubmit(onValidForm)}>
        <Controller
          name='currentPassword'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl variant='outlined' fullWidth error={invalid}>
              <OutlinedInput
                {...field}
                inputRef={ref}
                autoComplete='off'
                placeholder='Current password *'
                error={invalid}
                className={styles.textField}
                type={showCurrentPassword ? 'text' : 'password'}
                inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowCurrentPassword((show) => !show)}
                      edge='end'
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {invalid && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        <br />

        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Controller
            name='newPassword'
            control={control}
            render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
              <FormControl variant='outlined' fullWidth error={invalid}>
                <OutlinedInput
                  {...field}
                  inputRef={ref}
                  autoComplete='off'
                  placeholder='New Password *'
                  error={invalid}
                  className={styles.textField}
                  type={showNewPassword ? 'text' : 'password'}
                  inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowNewPassword((show) => !show)}
                        edge='end'
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {invalid && <FormHelperText>{error?.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </Box>
        <Controller
          name='confirmPassword'
          control={control}
          render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
            <FormControl variant='outlined' fullWidth error={invalid}>
              <OutlinedInput
                {...field}
                inputRef={ref}
                autoComplete='off'
                placeholder='Confirm New Password *'
                error={invalid}
                className={styles.textField}
                type={showConfirmPassword ? 'text' : 'password'}
                inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      edge='end'
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {invalid && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          )}
        />
        {errorMsg && (
          <FormHelperText sx={{ color: '#d32f2f', ml: '14px' }}>{errorMsg}</FormHelperText>
        )}

        <Box display={'flex'} justifyContent='space-between' mt={3}>
          <Button
            className={styles.changePasswordBtn}
            variant='outlined'
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <CustomButton
            disabled={!isDirty || !isValid}
            title='Confirm'
            sx={{ width: '48%' }}
            type='submit'
          />
        </Box>
      </form>
    </>
  )
}
export default ChangePassword
