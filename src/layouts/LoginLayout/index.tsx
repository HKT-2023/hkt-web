import styles from './styles.module.scss'
import SVG from 'react-inlinesvg'
import LogoWhite from 'resources/icons/logo-white.svg'
import CustomToast from '../../components/Alert'
import { useSelector } from 'react-redux'

const LoginLayout = (props: any) => {
  const isShowToastAlert = useSelector((state: any) => state.app.isShowToastAlert)

  return (
    <div className={styles.layout}>
      <SVG src={LogoWhite} className={styles.logo} />
      <div className={styles.container}>{props.children}</div>
      {isShowToastAlert && <CustomToast />}
    </div>
  )
}
export default LoginLayout
