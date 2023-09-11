import { Box } from '@mui/material'
import styles from './styles.module.scss'
import Avatar from 'resources/images/avatar.png'
import InfoIcon from 'resources/icons/bx-info-circle.svg'
import SVG from 'react-inlinesvg'
import { MAXIMUM_UPLOAD, validImageTypes } from 'utils/constants'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { uploadPhotoUpdateUserAction } from 'state/modules/userManagementUpdate'
import { uploadPhotoCreateUserAction } from 'state/modules/createUserManagement'
import {
  uploadCreateCourseAvatarAction,
  uploadPDFCreateLessonAction,
} from 'state/modules/courseManagementCreate'
import {
  uploadPhotoUpdateLessonAction,
  uploadUpdateCourseAvatarAction,
} from 'state/modules/courseManagementUpdate'
import { uploadPhotoCreateVendorAction } from 'state/modules/vendorManagementCreate'
import { uploadPhotoUpdateVendorAction } from 'state/modules/vendorManagementUpdate'
import { showToastAlert } from 'state/modules/app'

interface IProps {
  id: string
  type?: string
  avatarUrl: string | null
  title?: string
  hasDescription?: boolean
  onChangeFile?: (file: File) => void
}

const UploadAvatar = ({
  avatarUrl,
  type,
  title,
  hasDescription = true,
  id,
  onChangeFile,
}: IProps) => {
  const dispatch = useDispatch()
  const [imagePreview, setImagePreview] = useState<any>(avatarUrl || Avatar)
  const [reader] = useState(new FileReader())

  useEffect(() => {
    if(avatarUrl) {
      setImagePreview(avatarUrl)
    }
  }, [avatarUrl])

  const fileHandler = (e: any) => {
    const file = e.target.files[0]
    const fileType = file?.type
    if (file?.size > MAXIMUM_UPLOAD) {
      dispatch(showToastAlert('The maximum size is 10MB.', 'error'))
      return
    }
    if (!validImageTypes.includes(fileType)) {
      dispatch(showToastAlert('The image type must be png, jpg, jpeg.', 'error'))
      return
    }
    if (file) {
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        setImagePreview(reader?.result)
      })
      if (type === 'createUser') {
        dispatch(uploadPhotoCreateUserAction({ file: file }))
      } else if (type === 'updateUser') {
        dispatch(uploadPhotoUpdateUserAction({ file: file }))
      } else if (type === 'createGeneralInformation') {
        dispatch(uploadCreateCourseAvatarAction({ file: file }))
      } else if (type === 'updateGeneralInformation') {
        dispatch(uploadUpdateCourseAvatarAction({ file: file }))
      } else if (type === 'createVideoThumbnail') {
        dispatch(uploadPDFCreateLessonAction({ file: file }))
      } else if (type === 'updateVideoThumbnail') {
        dispatch(uploadPhotoUpdateLessonAction({ file: file }))
      } else if (type === 'createVendor') {
        dispatch(uploadPhotoCreateVendorAction({ file: file }))
      } else if (type === 'updateVendor') {
        dispatch(uploadPhotoUpdateVendorAction({ file: file }))
      }
    }
    if (onChangeFile) onChangeFile(file)
  }

  return (
    <Box>
      <Box sx={{ width: '200px', height: '200px', margin: '0 auto 16px' }}>
        <img
          src={imagePreview}
          alt='Avatar'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '100% ',
          }}
        />
      </Box>
      <Box>
        <label htmlFor={id} className={styles.customUpload}>
          <input
            style={{ display: 'none' }}
            id={id}
            name={id}
            type='file'
            accept='.jpg, .jpeg, .png'
            onChange={fileHandler}
          />
          {title ?? 'Upload photo/logo'}
        </label>
      </Box>
      {hasDescription && (
        <Box sx={{ display: 'flex', columnGap: '6px', lineHeight: '20px' }}>
          <Box sx={{ mt: '3px' }}>
            <SVG src={InfoIcon} />
          </Box>
          <Box sx={{ fontSize: 14, color: '#616161' }}>
            <Box>
              Image type: <b style={{ color: '#242424' }}>png, jpg, jpeg.</b>
            </Box>
            <Box>
              Maximum size/file: <b style={{ color: '#242424' }}>10MB</b>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default UploadAvatar
