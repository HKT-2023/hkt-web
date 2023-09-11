import React from 'react'
import { Typography } from '@mui/material'

const Title = ({ children, sx }: { children: string; sx?: any }) => {
  return (
    <Typography sx={{ fontWeight: 600, fontSize: 22, marginBottom: '30px', ...sx }}>
      {children}
    </Typography>
  )
}

export default Title
