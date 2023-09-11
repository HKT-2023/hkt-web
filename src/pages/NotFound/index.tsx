import { useDispatch } from 'react-redux'
import styles from './styles.module.scss'
import DashboardLayout from '../../layouts/DashboardLayout'

import { ROUTE_HOME, goToPage } from '../../state/modules/routing'

const NotFound = () => {
  const dispatch = useDispatch()

  const handleGoToHomepage = () => {
    dispatch(goToPage(ROUTE_HOME))
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headline}>System malfunction</div>
        <div className={styles.errorContent}>
          The page you’re looking for can’t be found. You can go back to <br />
          <span className={styles.actionLink} onClick={handleGoToHomepage}>
            Home page
          </span>{' '}
          or go back to{' '}
          <span className={styles.actionLink} onClick={handleGoBack}>
            The previous page
          </span>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default NotFound
