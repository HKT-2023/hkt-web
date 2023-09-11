import { Box, TextField } from '@mui/material'
import { MAXIMUM_TEXT_FIELD_LENGTH } from 'utils/constants'

interface IProps {
  fieldFrom: {
    label: string
    value: string
    onChange: (value: string) => void
  }
  fieldTo: {
    label: string
    value: string
    onChange: (value: string) => void
  }
  isError?: boolean
}

const GroupFieldNumber = ({ fieldFrom, fieldTo, isError }: IProps) => {
  return (
    <Box
      display='flex'
      sx={{
        border: `1px solid ${isError ? 'red' : 'rgb(0, 0, 0, 0.23)'}`,
        borderRadius: '8px',
        '.MuiTextField-root': {
          '&>.MuiInputLabel-formControl': {
            background: 'white',
            paddingLeft: '3px',
            paddingRight: '3px',
          },
        },
      }}
    >
      <TextField
        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
        sx={{
          fieldset: { borderColor: 'transparent' },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: 'transparent' },
            '&.Mui-focused': { borderColor: 'white' },
          },
        }}
        label={fieldFrom.label}
        value={fieldFrom.value}
        onChange={(e) => fieldFrom.onChange(e.target.value.replaceAll(',', ''))}
      />
      <Box sx={{ border: '1px solid #C3CBCD', marginTop: '15px', marginBottom: '15px' }} />
      <TextField
        inputProps={{ maxLength: MAXIMUM_TEXT_FIELD_LENGTH }}
        sx={{
          fieldset: { borderColor: 'transparent' },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: 'transparent' },
          },
        }}
        label={fieldTo.label}
        value={fieldTo.value}
        onChange={(e) => fieldTo.onChange(e.target.value.replaceAll(',', ''))}
      />
    </Box>
  )
}

export default GroupFieldNumber
