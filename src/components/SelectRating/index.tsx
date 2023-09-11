import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  styled,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Rating from 'components/Rating'

const IconButtonStyled = styled(IconButton)(() => ({
  padding: 0,
  position: 'absolute',
  top: '50%',
  right: '34px',
  transform: 'translateY(-50%)',
}))

const FormControlStyled = styled(FormControl)(() => ({
  '& .MuiFormLabel-filled ~ .MuiInputBase-root .MuiSelect-select': {
    paddingTop: '16px',
    paddingBottom: '10px',
  },
}))

interface IProps {
  options: string[]
  label: string
  labelId: string
  disabled?: boolean
  value: string
  onChangeSelect?: (value: string) => void
  onClickClearIcon?: () => void
  selectProps?: SelectProps
}

const SelectRating = ({
  options,
  label,
  labelId,
  disabled,
  value,
  onChangeSelect,
  onClickClearIcon,
  selectProps,
}: IProps) => {
  return (
    <FormControlStyled fullWidth disabled={disabled} sx={{ position: 'relative' }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...selectProps}
        labelId={labelId}
        label={label}
        value={value}
        onChange={(e) => onChangeSelect && onChangeSelect(e.target.value as string)}
      >
        {options.map((item) => (
          <MenuItem value={item} key={item}>
            <Rating rating={Number(item)} />
          </MenuItem>
        ))}
      </Select>
      {value === '0' || value === '' ? (
        <></>
      ) : (
        !disabled && (
          <IconButtonStyled onClick={onClickClearIcon}>
            <HighlightOffIcon />
          </IconButtonStyled>
        )
      )}
    </FormControlStyled>
  )
}

export default SelectRating
