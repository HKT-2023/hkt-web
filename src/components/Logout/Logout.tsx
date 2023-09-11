import styles from './styles.module.scss'
import Title from 'components/Title'
import SVG from 'react-inlinesvg'
import warning from '../../resources/icons/warning.svg'
import { Box, Button, Typography } from '@mui/material'
import CustomButton from 'components/Button'
import { removeAuthToken } from 'utils/localStorage'
interface ILogout {
  setShowModal?: any
}

const Logout = ({ setShowModal }: ILogout) => {
  return (
    <>
      <Box display={'flex'} justifyContent='center'>
        <SVG src={warning} />
      </Box>
      <Title sx={{ textAlign: 'center', marginTop: 2, marginBottom: 1 }}>Log Out</Title>
      <Typography variant='subtitle1' sx={{ fontWeight: '16px', textAlign: 'center' }}>
        Are you sure you want to log out?
      </Typography>
      <Box display={'flex'} justifyContent='space-between' mt={3}>
        <Button className={styles.logoutBtn} variant='outlined' onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <CustomButton
          title='Confirm'
          className={styles.confirmBtn}
          onClick={() => {
            removeAuthToken()
            window.location.href = '/login'
          }}
        />
      </Box>
    </>
  )
}
export default Logout
