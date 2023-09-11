import { Box, Slide, SlideProps, Snackbar } from '@mui/material'
import SVG from 'react-inlinesvg'
import error from '../../resources/icons/error.svg'
import success from '../../resources/icons/success.svg'
import CloseIcon from '@mui/icons-material/Close'
import { closeToastAlert } from 'state/modules/app'
import { useDispatch, useSelector } from 'react-redux'

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='left' />
}

const CustomToast = () => {
  const dispatch = useDispatch()
  const isShowToastAlert = useSelector((state: any) => state.app.isShowToastAlert)
  const toastAlertPayload = useSelector((state: any) => state.app.toastAlertPayload)
  return (
    <Snackbar
      open={isShowToastAlert}
      autoHideDuration={5000}
      onClose={() => dispatch(closeToastAlert())}
      // eslint-disable-next-line no-useless-concat
      key={'top' + 'right'}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
    >
      <Box
        sx={{
          background: toastAlertPayload.type === 'error' ? '#F8EBEB' : '#E6F3EF',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
        }}
      >
        <Box mr={1}>
          <SVG src={toastAlertPayload.type === 'error' ? error : success} />
        </Box>
        {toastAlertPayload.message}
        <CloseIcon sx={{ ml: 5, cursor: 'pointer' }} onClick={() => dispatch(closeToastAlert())} />
      </Box>
    </Snackbar>
  )
}

export default CustomToast
