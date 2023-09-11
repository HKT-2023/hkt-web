import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '.Mui-disabled': {
            backgroundColor: '#E8EBEC',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '.Mui-disabled': {
            backgroundColor: '#E8EBEC',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&.Mui-disabled': {
            backgroundColor: '#E8EBEC',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#E8EBEC',
          },
        },
      },
    },
  },
})

export default theme
