import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import styles from './styles.module.scss'
import plusIcon from 'resources/icons/plus.svg'
import plusDisabledIcon from 'resources/icons/plusDisabled.svg'
import FacebookIcon from 'resources/icons/facebookIcon.svg'
import InstagramIcon from 'resources/icons/instagramIcon.svg'
import TwitterIcon from 'resources/icons/twitterIcon.svg'
import TiktokIcon from 'resources/icons/tiktokIcon.svg'
import LinkedInIcon from 'resources/icons/linkedInIcon.svg'
import CloseIcon from 'resources/icons/closeIcon.svg'
import SVG from 'react-inlinesvg'
import {
  DEFAULT_AVATAR_URL,
  FAKE_VALID_PASSWORD,
  MAXIMUM_DESCRIPTION_LENGTH,
  MAXIMUM_LICENSE_LENGTH,
  MAXIMUM_PHONE_LENGTH,
  MAXIMUM_TEXT_FIELD_LENGTH,
  TypeOfUser,
  TypeOfUserList,
  UserRole,
  UserStatus,
} from 'utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTE_USER_MANAGEMENT, goToPage } from 'state/modules/routing'
import { Fragment, useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import colors from 'themes/colors'
import { confirmCreateUserAction, getAllVendorCategory } from 'state/modules/createUserManagement'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { SOCIAL_MEDIA } from 'utils/constants'
import { v4 as uuidv4 } from 'uuid'
import DetailsAction from 'components/DetailsAction'
import { isEmpty } from 'lodash'
import {
  getAllVendorCategoryUpdate,
  confirmUpdateUserAction,
} from 'state/modules/userManagementUpdate'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import UploadAvatar from './UploadAvatar'
import {
  emailRules,
  inputRules,
  pwRules,
  passwordValidation,
  requiredRules,
} from 'utils/validation'
import Breadcrumb from 'components/Breadcrumb'
import CustomModal from 'components/modal'
import ModalContentAlert from 'components/ModalContentAlert'
import ReactSelect from 'react-select'
import CustomLabel from 'components/CustomLabel'

const SOCIAL_MEDIA_ICON = {
  [SOCIAL_MEDIA.FACEBOOK]: FacebookIcon,
  [SOCIAL_MEDIA.INSTAGRAM]: InstagramIcon,
  [SOCIAL_MEDIA.TWITTER]: TwitterIcon,
  [SOCIAL_MEDIA.TIKTOK]: TiktokIcon,
  [SOCIAL_MEDIA.LINKEDIN]: LinkedInIcon,
}

interface IProps {
  userDetails: any
}

interface FormValues {
  listAgentMlsId: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  typeOfUser: string
  status: string
  agentLicense: string
  agentEmail: string
  vendorLicense: string
  vendorEmail: string
  vendorLocation: string
  vendorType: []
  businessName: string
  primaryContact: string
  description: string
  commission: string
  userTag: string
}

const schema = yup.object().shape({
  firstName: yup.string().when('typeOfUser', {
    is: (value: string) => value !== TypeOfUser.Vendor,
    then: yup.string().trim().required(requiredRules),
  }),
  lastName: yup.string().when('typeOfUser', {
    is: (value: string) => value !== TypeOfUser.Vendor,
    then: yup.string().trim().required(requiredRules),
  }),
  email: yup.string().required(requiredRules).email(emailRules),
  password: yup.string().required(requiredRules).matches(passwordValidation, pwRules),
  phone: yup.string().required(requiredRules),
  typeOfUser: yup.string().required(requiredRules),
  status: yup.string().required(requiredRules),
  agentLicense: yup.string().when('typeOfUser', {
    is: (value: string) =>
      value === TypeOfUser.KlayTNAgent || value === TypeOfUser.NonKlayTNAgent,
    then: yup.string().trim().required(requiredRules),
  }),
  agentEmail: yup.string().when('typeOfUser', {
    is: (value: string) =>
      value === TypeOfUser.KlayTNAgent || value === TypeOfUser.NonKlayTNAgent,
    then: yup.string().trim().required(requiredRules).email(emailRules),
  }),
  commission: yup.string().when('typeOfUser', {
    is: (value: string) => value === TypeOfUser.KlayTNAgent,
    then: yup.string().trim().required(requiredRules),
  }),

  businessName: yup.string().when('typeOfUser', {
    is: (value: string) => value === TypeOfUser.KlayTNAgent,
    then: yup.string().trim().required(requiredRules),
  }),
  primaryContact: yup.string().when('typeOfUser', {
    is: (value: string) => value === TypeOfUser.Vendor,
    then: yup.string().trim().required(requiredRules),
  }),
  vendorType: yup.array().when('typeOfUser', {
    is: (value: string) => value === TypeOfUser.Vendor,
    then: yup.array().min(1, requiredRules),
  }),
})

const DetailsUserManagement = ({ userDetails }: IProps) => {
  const isCreateUser = isEmpty(userDetails)
  const dispatch = useDispatch()
  const {
    photo: updatePhoto,
    listAllVendorCategoryUpdate,
    fetchingListAllVendorCategoryUpdate,
  } = useSelector((state: any) => state.userManagementUpdate)
  const {
    photo: createPhoto,
    listAllVendorCategory,
    fetchingListAllVendorCategory,
  } = useSelector((state: any) => state.createUserManagement)

  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(userDetails?.dateOfBirth ?? null)
  const [showPassword, setShowPassword] = useState(false)
  const [showModalAlert, setShowModalAlert] = useState(false)

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    clearErrors,
    setError,
    getValues,
    formState: { isSubmitted, errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: userDetails?.firstName ?? '',
      lastName: userDetails?.lastName ?? '',
      email: userDetails.email ?? '',
      password: isCreateUser ? '' : FAKE_VALID_PASSWORD,
      phone: userDetails.phone ?? '',
      typeOfUser: userDetails.typeOfUser ?? '',
      status: userDetails.status ?? '',
      agentLicense: userDetails.license ?? '',
      agentEmail: userDetails.agentEmail ?? '',
      vendorLicense: userDetails.license ?? '',
      vendorEmail: userDetails.vendorEmail ?? '',
      vendorLocation: userDetails.vendorLocation ?? '',
      vendorType: userDetails.vendorType ? userDetails.vendorType : [],
      primaryContact: userDetails.primaryContact ?? '',
      businessName: userDetails.businessName ?? '',
      description: userDetails.description ?? '',
      commission: userDetails.commission ?? '',
      userTag: userDetails.userTag ?? '',
      listAgentMlsId: userDetails.listAgentMlsId ?? '',
    },
  })

  const watchTypeOfUser = watch('typeOfUser')

  const modifySocialMedia: any[] = []

  if (userDetails.socialMedia) {
    userDetails.socialMedia.forEach((item: any) => {
      if (item.link && item.link.trim() !== '') {
        modifySocialMedia.push({
          ...item,
          key: uuidv4(),
        })
      }
    })
  }

  const [userInfo, setUserInfo] = useState({
    avatarUrl: userDetails?.avatarUrl ?? DEFAULT_AVATAR_URL,
    vendorType: userDetails.vendorType ? userDetails.vendorType : [],
    socialMedia: modifySocialMedia,
  })

  const handleChangeSocialMedia = (key: string, value: string, field: string) => {
    const data = userInfo.socialMedia.map((e: any) => {
      if (e.key === key) return { ...e, [field]: value.trim() }
      return { ...e }
    })
    setUserInfo({ ...userInfo, socialMedia: data })
  }

  const handleClickCancel = () => {
    if (isCreateUser) {
      dispatch(goToPage(ROUTE_USER_MANAGEMENT))
    } else {
      setShowModalAlert(true)
    }
  }

  const onAddBtnClick = () => {
    setUserInfo({
      ...userInfo,
      socialMedia: userInfo.socialMedia.concat({
        key: uuidv4(),
        type: SOCIAL_MEDIA.FACEBOOK,
        link: '',
      }),
    })
  }

  const onHandleDeleteSocial = (e: any) => {
    const data = userInfo.socialMedia.filter((x: any) => x.key !== e)
    setUserInfo({ ...userInfo, socialMedia: data })
  }

  const onValidForm = (formData: FormValues) => {
    const photo = isCreateUser ? createPhoto : updatePhoto
    const data = {
      avatarUrl: photo ? photo?.data[0]?.link : userInfo.avatarUrl,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      dateOfBirth: dateOfBirth ? dayjs(dateOfBirth).format('MM/DD/YYYY') : null,
      email: formData.email,
      phone: formData.phone.trim(),
      typeOfUser: formData.typeOfUser,
      status: formData.status,
      password: formData.password,
      license:
        formData.typeOfUser === TypeOfUser.Vendor
          ? formData.vendorLicense.trim()
          : formData.agentLicense.trim(),
      agentEmail: formData.agentEmail,
      socialMedia: userInfo.socialMedia.filter((social) => social.link.trim() !== ''),
      ...(formData.vendorEmail.trim() && { vendorEmail: formData.vendorEmail.trim() }),
      ...(formData.vendorLocation.trim() && { vendorLocation: formData.vendorLocation.trim() }),
      vendorType: formData.vendorType,
      businessName: formData.businessName.trim(),
      primaryContact: formData.primaryContact.trim(),
      description: formData.description.trim(),
      ...(formData.typeOfUser === TypeOfUser.KlayTNAgent &&
        formData.commission && {
          commission: +formData.commission,
        }),
      ...(formData.typeOfUser === TypeOfUser.KlayTNAgent &&
        formData.listAgentMlsId && {
          listAgentMlsId: formData.listAgentMlsId,
        }),
      userId: userDetails?._id,
      ...(formData.userTag && { userTag: formData.userTag }),
      ...(formData.listAgentMlsId &&
        formData.typeOfUser === TypeOfUser.KlayTNAgent && {
          listAgentMlsId: formData.listAgentMlsId,
        }),
    }
    if (isCreateUser) {
      dispatch(confirmCreateUserAction(data))
    } else {
      const updateUser = {
        ...data,
        vendorEmail: formData.vendorEmail.trim() !== '' ? formData.vendorEmail.trim() : null,
        vendorLocation:
          formData.vendorLocation.trim() !== '' ? formData.vendorLocation.trim() : null,
        license: data.license.trim() !== '' ? data.license.trim() : null,
      }
      dispatch(confirmUpdateUserAction(updateUser))
    }
  }

  const isUser = watchTypeOfUser === TypeOfUser.User
  const isVendor = watchTypeOfUser === TypeOfUser.Vendor
  const isAgent =
    watchTypeOfUser === TypeOfUser.KlayTNAgent || watchTypeOfUser === TypeOfUser.NonKlayTNAgent
  const isKLAYTNAgent = watchTypeOfUser === TypeOfUser.KlayTNAgent

  const renderEmailField = () => (
    <Controller
      name='email'
      control={control}
      render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          label='Email *'
          variant='outlined'
          inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
          error={invalid}
          helperText={error?.message}
          disabled={!isCreateUser}
        />
      )}
    />
  )

  return (
    <>
      <Breadcrumb
        text='User Management'
        mainText={isCreateUser ? 'Create a new user' : 'Update user'}
      />
      <Box className={styles.boxWrap}>
        <Typography className={styles.heading}>General information</Typography>
        <Box className={styles.boxContainer}>
          <UploadAvatar
            id='upload-user-detail'
            avatarUrl={userDetails?.avatarUrl || DEFAULT_AVATAR_URL}
            type={isCreateUser ? 'createUser' : 'updateUser'}
          />
          <Box sx={{ pl: 2.5, ml: 2.5, borderLeft: '1px solid #dfdfdf' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 2.5,
                rowGap: 3.5,
                mb: 3.5,
              }}
            >
              {!isVendor && (
                <>
                  <Controller
                    name='firstName'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label='First Name *'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name='lastName'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label='Last Name *'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                </>
              )}
              {isVendor && (
                <>
                  <Controller
                    name='businessName'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label='Name of business *'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name='primaryContact'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label='Primary contact *'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                </>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label='Date of Birth'
                  inputFormat='MM/DD/YYYY'
                  value={dateOfBirth}
                  onChange={(value: Dayjs | null) => setDateOfBirth(value)}
                  maxDate={dayjs(new Date())}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {renderEmailField()}
              <Controller
                name='typeOfUser'
                control={control}
                render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                  <FormControl fullWidth error={invalid} disabled={!isCreateUser}>
                    <InputLabel id='type-of-user'>Type of User *</InputLabel>
                    <Select {...field} inputRef={ref} labelId='type-of-user' label='Type of User *'>
                      {TypeOfUserList.map((item) => (
                        <MenuItem value={item.value} key={item.value}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                    {invalid && <FormHelperText>{error?.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              <Controller
                name='phone'
                control={control}
                render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    label='Phone number *'
                    variant='outlined'
                    inputProps={{ maxLength: MAXIMUM_PHONE_LENGTH }}
                    onChange={(e) => {
                      const regex = new RegExp('^[0-9]*$')
                      if (regex.test(e.target.value)) {
                        setValue('phone', e.target.value)
                        clearErrors('phone')
                      }
                    }}
                    error={invalid}
                    helperText={error?.message}
                  />
                )}
              />

              {isAgent && (
                <>
                  <Controller
                    name='agentLicense'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label='License Number *'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_LICENSE_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name='agentEmail'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label={`Agent's email *`}
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                </>
              )}

              {isVendor && (
                <>
                  <Controller
                    name='vendorLicense'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label='License Number'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_LICENSE_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name='vendorEmail'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label={`Vendor's email`}
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                  <Controller
                    name='vendorLocation'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        label={`Vendor's location`}
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        error={invalid}
                        helperText={error?.message}
                      />
                    )}
                  />
                </>
              )}
              <Controller
                name='status'
                control={control}
                render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                  <FormControl fullWidth error={invalid}>
                    <InputLabel id='status'>Status *</InputLabel>
                    <Select {...field} inputRef={ref} labelId='status' label='Status *'>
                      <MenuItem value={UserStatus.Active}>{UserStatus.Active}</MenuItem>
                      <MenuItem value={UserStatus.InActive}>{UserStatus.InActive}</MenuItem>
                    </Select>
                    {invalid && <FormHelperText>{error?.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              {isUser && (
                <Controller
                  name='userTag'
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl fullWidth>
                      <InputLabel id='userTag'>User - Tag</InputLabel>
                      <Select
                        {...field}
                        inputRef={ref}
                        labelId='userTag'
                        label='User - Tag'
                        onChange={(e) => {
                          setValue('userTag', e.target.value)
                        }}
                      >
                        <MenuItem value={UserRole.Buyer}>Buyer</MenuItem>
                        <MenuItem value={UserRole.Seller}>Seller</MenuItem>
                        <MenuItem value={UserRole.BuyerAndSeller}>Buyer and Seller</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              )}

              {isVendor && isCreateUser && (
                <FormControl
                  error={errors.vendorType !== undefined}
                  onClick={() => {
                    listAllVendorCategory.length === 0 &&
                      dispatch(
                        getAllVendorCategory({ page: 1, limit: 100, status: UserStatus.Active }),
                      )
                  }}
                >
                  {getValues('vendorType').length > 0 && <CustomLabel title='Vendor type *' />}
                  <ReactSelect
                    maxMenuHeight={200}
                    placeholder='Vendor type *'
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: 56,
                        border: errors.vendorType !== undefined ? '1px solid #b81e45' : '',
                      }),
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      placeholder: (base) => ({
                        ...base,
                        color: errors.vendorType !== undefined ? '#b81e45' : 'rgba(0, 0, 0, 0.5)',
                      }),
                    }}
                    isMulti
                    isLoading={fetchingListAllVendorCategory}
                    defaultValue={undefined}
                    options={listAllVendorCategory.map((x: any) => ({
                      value: x._id,
                      label: x.name,
                    }))}
                    onChange={(options: any, action: any) => {
                      const values = options.map((option: any) => option.value)
                      setValue('vendorType', values)
                      clearErrors('vendorType')
                      if (options.length === 0 && isSubmitted) {
                        setError('vendorType', { message: inputRules })
                      }
                    }}
                  />
                  {errors.vendorType && (
                    <FormHelperText>{errors.vendorType.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              {isVendor && !isCreateUser && (
                <FormControl
                  error={errors.vendorType !== undefined}
                  onClick={() => {
                    listAllVendorCategoryUpdate.length === 0 &&
                      dispatch(
                        getAllVendorCategoryUpdate({
                          page: 1,
                          limit: 100,
                          status: UserStatus.Active,
                        }),
                      )
                  }}
                >
                  <CustomLabel title='Vendor type *' />
                  <ReactSelect
                    maxMenuHeight={200}
                    placeholder='Vendor type *'
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: 56,
                        border: errors.vendorType !== undefined ? '1px solid #b81e45' : '',
                      }),
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      placeholder: (base) => ({
                        ...base,
                        color: errors.vendorType !== undefined ? '#b81e45' : 'rgba(0, 0, 0, 0.5)',
                      }),
                    }}
                    isMulti
                    isLoading={fetchingListAllVendorCategoryUpdate}
                    defaultValue={() => {
                      if (!userDetails.vendorType.length) return
                      return userDetails.vendorType.map((vendor: any) => ({
                        label: vendor.name,
                        value: vendor._id,
                      }))
                    }}
                    options={listAllVendorCategoryUpdate.map((x: any) => ({
                      value: x._id,
                      label: x.name,
                    }))}
                    onChange={(options: any, action: any) => {
                      const values = options.map((option: any) => option.value)
                      setValue('vendorType', values)
                      clearErrors('vendorType')
                      if (options.length === 0 && isSubmitted) {
                        setError('vendorType', { message: inputRules })
                      }
                    }}
                  />
                  {errors.vendorType && (
                    <FormHelperText>{errors.vendorType.message}</FormHelperText>
                  )}
                </FormControl>
              )}
              {isKLAYTNAgent && (
                <Controller
                  name='commission'
                  control={control}
                  render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                    <FormControl variant='outlined' fullWidth error={invalid}>
                      <InputLabel htmlFor='outlined-commission'>Commission *</InputLabel>
                      <OutlinedInput
                        {...field}
                        inputRef={ref}
                        id='outlined-commission'
                        label='Commission *'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        endAdornment={<InputAdornment position='end'>%</InputAdornment>}
                        onChange={(e) => {
                          const regex = new RegExp('^[0-9.]*$')
                          const { value } = e.target
                          if (regex.test(value)) {
                            setValue('commission', value)
                            if (Number(value) >= 0 && Number(value) <= 100) {
                              clearErrors('commission')
                            } else {
                              setError('commission', {
                                message: 'The commission could be less than or equal to 100',
                              })
                            }
                          }
                        }}
                      />
                      {invalid && <FormHelperText>{error?.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              )}
              {isKLAYTNAgent && (
                <>
                  <Controller
                    name='businessName'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <FormControl variant='outlined' fullWidth error={invalid}>
                        <InputLabel htmlFor='outlined-company-name'>Company Name *</InputLabel>
                        <OutlinedInput
                          {...field}
                          inputRef={ref}
                          id='outlined-company-name'
                          label='Company Name *'
                          inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        />
                        {invalid && <FormHelperText>{error?.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                  <Controller
                    name='listAgentMlsId'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                      <FormControl variant='outlined' fullWidth error={invalid}>
                        <InputLabel htmlFor='outlined-company-name'>Agent ID</InputLabel>
                        <OutlinedInput
                          {...field}
                          inputRef={ref}
                          id='outlined-company-name'
                          label='Agent ID'
                          inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        />
                        {invalid && <FormHelperText>{error?.message}</FormHelperText>}
                      </FormControl>
                    )}
                  />
                </>
              )}
            </Box>
            {(isVendor || isAgent) && (
              <Controller
                name='description'
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    label='Description'
                    variant='outlined'
                    inputProps={{ maxLength: MAXIMUM_DESCRIPTION_LENGTH }}
                    multiline
                    rows={4}
                    fullWidth
                  />
                )}
              />
            )}
            {isAgent && (
              <>
                <Typography
                  className={styles.subheading}
                  sx={{ mt: 3.5, pt: 2, borderTop: '1px solid #dfdfdf' }}
                >
                  SOCIAL MEDIA
                </Typography>
                {userInfo.socialMedia.map((item: any) => (
                  <Fragment key={item.key}>
                    <Box display='grid' gridTemplateColumns='85px 1fr 50px' gap='16px' mb={2.5}>
                      <Select
                        displayEmpty
                        defaultValue={item.type}
                        onChange={(e) => handleChangeSocialMedia(item.key, e.target.value, 'type')}
                        sx={{
                          '& .MuiSelect-select': {
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        {Object.values(SOCIAL_MEDIA).map((i) => (
                          <MenuItem key={i} value={i}>
                            <SVG src={SOCIAL_MEDIA_ICON[i]} />
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField
                        placeholder='Link'
                        variant='outlined'
                        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
                        fullWidth
                        onChange={(e) => handleChangeSocialMedia(item.key, e.target.value, 'link')}
                        defaultValue={item.link}
                      />
                      <Box
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onClick={() => onHandleDeleteSocial(item.key)}
                      >
                        <SVG src={CloseIcon} />
                      </Box>
                    </Box>
                  </Fragment>
                ))}
                <Box display='flex' ml={2} alignItems='flex-start'>
                  <Box
                    display='flex'
                    alignItems='center'
                    sx={{
                      cursor: 'pointer',
                      pointerEvents: userInfo.socialMedia.some((x: any) => x.link === '')
                        ? 'none'
                        : 'auto',
                    }}
                    onClick={onAddBtnClick}
                  >
                    <SVG
                      src={
                        userInfo.socialMedia.some((x: any) => x.link === '')
                          ? plusDisabledIcon
                          : plusIcon
                      }
                    />
                    <Typography
                      sx={{
                        marginLeft: 2,
                        fontWeight: 700,
                        color: userInfo.socialMedia.some((x: any) => x.link === '')
                          ? '#E8EBEC'
                          : colors.cyan,
                      }}
                      variant='subtitle1'
                    >
                      {userInfo.socialMedia.length > 0
                        ? 'Add more social media'
                        : 'Add social media'}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
            <Typography
              className={styles.subheading}
              sx={{ mt: 3.5, pt: 2, borderTop: '1px solid #dfdfdf' }}
            >
              SIGN IN INFORMATION
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 2.5,
                mb: 3.5,
              }}
            >
              <FormControl fullWidth>
                {renderEmailField()}
                <TextField label='Email *' tabIndex={-1} className={styles.inputHidden} />
              </FormControl>
              <input type='password' tabIndex={-1} className={styles.inputHidden} />
              {isCreateUser ? (
                <Controller
                  name='password'
                  control={control}
                  render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => (
                    <FormControl fullWidth variant='outlined' error={invalid}>
                      <InputLabel htmlFor='outlined-password'>Password *</InputLabel>
                      <OutlinedInput
                        {...field}
                        inputRef={ref}
                        id='outlined-password'
                        label='Password *'
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
              ) : (
                <FormControl fullWidth variant='outlined' disabled>
                  <InputLabel htmlFor='outlined-password'>Password *</InputLabel>
                  <OutlinedInput
                    id='outlined-password'
                    label='Password *'
                    disabled
                    defaultValue='**********'
                    endAdornment={
                      <InputAdornment position='end' disablePointerEvents>
                        <IconButton aria-label='toggle password visibility' edge='end'>
                          <VisibilityOff />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <DetailsAction onConfirm={handleSubmit(onValidForm)} onCancel={handleClickCancel} />
      <CustomModal open={showModalAlert} onClose={() => setShowModalAlert(false)} showClear={false}>
        <ModalContentAlert
          setShowModal={setShowModalAlert}
          onConfirm={() => dispatch(goToPage(ROUTE_USER_MANAGEMENT))}
        />
      </CustomModal>
    </>
  )
}

export default DetailsUserManagement
