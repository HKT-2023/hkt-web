import ClearIcon from '@mui/icons-material/Clear'
import { Box, IconButton } from '@mui/material'
import Modal from '@mui/material/Modal'
import React from 'react'

interface IProps {
  open: boolean
  onClose: () => void
  disableBackdropClick?: boolean
  children: React.ReactNode
  sx?: React.CSSProperties
  showClear?: boolean
}

const CustomModal = ({
  open,
  onClose,
  disableBackdropClick = false,
  children,
  sx,
  showClear = false,
}: IProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={(_, reason) => {
          if (disableBackdropClick && reason === 'backdropClick') {
            return
          }
          onClose()
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={sx}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: 24,
            borderRadius: '8px',
            maxHeight: '96vh',
            outline: 'none',
          }}
        >
          <Box sx={{ textAlign: 'right', minWidth: '300px' }}>
            {showClear && (
              <IconButton onClick={onClose}>
                <ClearIcon />
              </IconButton>
            )}
          </Box>
          {children}
        </Box>
      </Modal>
    </>
  )
}

export default CustomModal
