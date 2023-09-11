import { Typography } from '@mui/material'
import styles from './styles.module.scss'

interface IProps {
  title: string
  subTitle: string
}

const LoginHeading = ({ title, subTitle }: IProps) => {
  return (
    <>
      <Typography component='h2' className={styles.title}>
        {title}
      </Typography>
      <Typography className={styles.subTitle}>{subTitle}</Typography>
    </>
  )
}

export default LoginHeading
