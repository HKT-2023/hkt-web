import { Box, Button } from '@mui/material'
import CustomButton from 'components/Button'
import styles from './styles.module.scss'

const DetailsAction = (props: any) => {
  return (
    <Box className={styles.actionWrap}>
      <Box className={styles.actionContainer}>
        <Button variant='outlined' className={styles.buttonCancel} onClick={props?.onCancel}>
          Cancel
        </Button>
        <Box>
          {props?.hasConfirmTransaction && (
            <Button
              variant='outlined'
              className={styles.confirmTransactionBtn}
              onClick={props?.onConfirmTransaction}
              sx={{ marginRight: 2 }}
              disabled={props.isTransactionDisabled}
            >
              Confirm transaction
            </Button>
          )}
          <CustomButton
            type='submit'
            title={window.location.href.includes('listing-management') ? 'Save Changes' : 'Confirm'}
            size='small'
            style={{ padding: '12px 36px', borderRadius: '8px' }}
            onClick={props?.onConfirm}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DetailsAction
