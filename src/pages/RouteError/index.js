import React from 'react'
import styles from '../NotFound/styles.module.scss'
import routeStyles from './styles.module.scss'
import DashboardLayout from '../../layouts/DashboardLayout'

const RouteErrorScreen = () => {
  const handleAction = () => {
    window.location.reload(true)
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headline}>System malfunction</div>
        <div className={styles.errorContent}>
          We are sorry to inform you. Please click the button below to proceed.
          <div className={routeStyles.buttonWrapper}>
            <button className={`mainButton ${routeStyles.continueButton}`} onClick={handleAction}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default RouteErrorScreen
