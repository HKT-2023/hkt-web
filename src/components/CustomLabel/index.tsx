import { InputLabel } from '@mui/material'

interface IProps {
  title: string
  className?: string
}

const CustomLabel = ({ title, className, ...restProps }: IProps) => {
  return (
    <InputLabel
      {...restProps}
      className={className ?? ''}
      sx={{
        background: 'white',
        paddingLeft: '3px',
        paddingRight: '3px',
        left: '-7px',
        top: '-25px',
        fontSize: '12px',
      }}
    >
      {title}
    </InputLabel>
  )
}

export default CustomLabel
