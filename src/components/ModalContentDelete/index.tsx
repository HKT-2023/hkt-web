import styles from './styles.module.scss'
import Title from 'components/Title'
import SVG from 'react-inlinesvg'
import WarningIcon from 'resources/icons/warning2.svg'
import { Box, Button, Typography } from '@mui/material'
import CustomButton from 'components/Button'
import React from 'react'
interface IProps {
  onConfirm?: () => void
  setShowModal?: any
  title?: string
  subTitle?: React.ReactNode
}

const ModalContentDelete = ({ onConfirm, setShowModal, title = 'Delete', subTitle }: IProps) => {
  return (
    <>
      <Box display='flex' justifyContent='center'>
        <SVG src={WarningIcon} />
      </Box>
      <Title sx={{ textAlign: 'center', marginTop: 2, marginBottom: 1 }}>{title}</Title>
      <Typography variant='subtitle1' sx={{ fontWeight: '16px', textAlign: 'center' }}>
        {subTitle}
      </Typography>
      <Box display='flex' justifyContent='space-between' mt={3}>
        <Button className={styles.cancelBtn} variant='outlined' onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <CustomButton title='Confirm' className={styles.confirmBtn} onClick={onConfirm} />
      </Box>
    </>
  )
}
export default ModalContentDelete
