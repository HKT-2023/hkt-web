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

const IconButtonStyled = styled(IconButton)(() => ({
  padding: 0,
  position: 'absolute',
  top: '50%',
  right: '34px',
  transform: 'translateY(-50%)',
}))

interface IProps {
  options: { value: string; title: string }[]
  label: string
  labelId: string
  disabled?: boolean
  value: string
  onChangeSelect: (value: string) => void
  onClickClearIcon: () => void
  selectProps?: SelectProps
}

const SelectWithClearIcon = ({
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
    <FormControl fullWidth disabled={disabled} sx={{ position: 'relative' }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...selectProps}
        labelId={labelId}
        label={label}
        value={value}
        onChange={(e) => onChangeSelect(e.target.value as string)}
      >
        {options.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {value && (
        <IconButtonStyled onClick={onClickClearIcon}>
          <HighlightOffIcon />
        </IconButtonStyled>
      )}
    </FormControl>
  )
}

export default SelectWithClearIcon
