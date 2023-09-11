import styles from './styles.module.scss'
import Title from 'components/Title'
import SVG from 'react-inlinesvg'
import WarningIcon from 'resources/icons/warning.svg'
import { Box, Button, Typography } from '@mui/material'
import CustomButton from 'components/Button'
interface IProps {
  onConfirm?: () => void
  setShowModal?: any
}

const ModalContentAlert = ({ onConfirm, setShowModal }: IProps) => {
  return (
    <>
      <Box display='flex' justifyContent='center'>
        <SVG src={WarningIcon} />
      </Box>
      <Title sx={{ textAlign: 'center', marginTop: 2, marginBottom: 1 }}>Alert</Title>
      <Typography variant='subtitle1' sx={{ fontWeight: '16px', textAlign: 'center' }}>
        Are you sure you want to quit? All information will <br />
        not be saved
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
export default ModalContentAlert
