import { Button } from '@mui/material'
import styles from './styles.module.scss'

interface IProps {
  title: string
  className?: string
  icon?: any
  [x: string]: any
}

const CustomButton = ({ title, className, icon, ...restProps }: IProps) => {
  return (
    <Button {...restProps} variant='contained' className={`${styles.button} ${className ?? ''}`}>
      {icon} {title}
    </Button>
  )
}

export default CustomButton
