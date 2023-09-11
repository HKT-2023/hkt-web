import React from 'react'
import { Box, SxProps, Theme, CircularProgress } from '@mui/material'

interface IsLoading {
  sx?: SxProps<Theme>
}

export const LoadingComponent: React.FunctionComponent<IsLoading> = ({ sx }) => {
  return (
    <Box sx={{ textAlign: 'center', ...sx }}>
      <CircularProgress color='secondary' />
    </Box>
  )
}
