import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { goToPage } from 'state/modules/routing'
import styles from './styles.module.scss'

interface IProps {
  parentText: string
  parentLink: string
  childText: string
  mainText: string
}

const DetailsBreadcrumb = ({ parentText, parentLink, childText, mainText }: IProps) => {
  const dispatch = useDispatch()

  return (
    <Box>
      <Box className={styles.breadcrumbList}>
        <span onClick={() => dispatch(goToPage(parentLink))}>{parentText} /</span> {childText}
      </Box>
      <Typography className={styles.breadcrumbTitle}>{mainText}</Typography>
    </Box>
  )
}

export default DetailsBreadcrumb
