import { Box, InputAdornment, TextField, TextFieldProps, styled } from '@mui/material'
import { MAXIMUM_TEXT_FIELD_LENGTH } from 'utils/constants'
import { Search } from '@mui/icons-material'

const TextFieldStyled = styled(TextField)(() => ({
  '.MuiInputLabel-root': {
    left: '25px',
    transition: 'all 0.3s',
  },
  '.MuiInputLabel-root.Mui-focused': {
    left: 0,
  },
  '.MuiInputLabel-root.MuiFormLabel-filled': {
    left: 0,
  },
  '.MuiInputBase-input': {
    paddingLeft: 40,
  },
}))

const TextFieldWithSearch = ({ ...props }: TextFieldProps) => {
  return (
    <Box position='relative'>
      <TextFieldStyled inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }} {...props} />
      <InputAdornment position='start'>
        <Search sx={{ position: 'absolute', top: '17px', left: '10px' }} />
      </InputAdornment>
    </Box>
  )
}

export default TextFieldWithSearch
