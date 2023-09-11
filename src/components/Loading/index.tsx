import React from 'react'
import { Box, SxProps, Theme, CircularProgress } from '@mui/material'

interface IsLoading {
  sx?: SxProps<Theme>
}

export const Loading: React.FunctionComponent<IsLoading> = ({ sx }) => {
  return (
    <Box
      className='mainBackground'
      sx={{
        backgroundColor: 'rgba(255,255,255,0.78)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        ...sx,
      }}
    >
      <Box
        className='backgroundContent'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <CircularProgress color='secondary' />
      </Box>
    </Box>
  )
}
