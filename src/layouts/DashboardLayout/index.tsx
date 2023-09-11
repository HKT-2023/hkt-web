import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@mui/material'
import styles from './styles.module.scss'
import './styles.scss'
import SVG from 'react-inlinesvg'
import logo from 'resources/images/Logo.svg'
import KlayTN from 'resources/images/KlayTN.svg'
import { links } from 'utils/constants'
import {
  goToPage,
  ROUTE_DETAIL_LISTING,
  ROUTE_LISTING_MANAGEMENT,
  ROUTE_USER_MANAGEMENT,
  ROUTE_COURSE_MANAGEMENT,
  ROUTE_REPORTED_LISTING,
  ROUTE_VENDOR_MANAGEMENT,
} from 'state/modules/routing'
import { useDispatch, useSelector } from 'react-redux'
import colors from 'themes/colors'
import { useState } from 'react'
import CustomModal from 'components/modal'
import ChangePassword from 'components/ChangePassword/ChangePassword'
import Logout from 'components/Logout/Logout'
import CustomToast from 'components/Alert'
import bell from 'resources/icons/bell.svg'
import InfiniteScroll from 'react-infinite-scroll-component'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { HIDE_BELL_NOTIFICATION } from 'state/modules/app'
import {
  clearNotification,
  fetchNotificationAction,
  updateReadNotificationAction,
} from 'state/modules/notification'
import SidebarUserIcon from 'resources/icons/sidebarUser.svg'
import SidebarListingIcon from 'resources/icons/sidebarListing.svg'
import SidebarReportedIcon from 'resources/icons/sidebarReported.svg'
import SidebarCourseIcon from 'resources/icons/sidebarCourse.svg'
import SidebarVendorIcon from 'resources/icons/sidebarVendor.svg'

const AdminDrawer = [
  {
    name: 'User Management',
    path: links.USER_MANAMENT,
    route: ROUTE_USER_MANAGEMENT,
    icon: SidebarUserIcon,
  },
  {
    name: 'Listing Management',
    path: links.LISTING_MANAMENT,
    route: ROUTE_LISTING_MANAGEMENT,
    icon: SidebarListingIcon,
  },
  {
    name: 'Reported Listing Management',
    path: links.REPORTED_LISTING_MANAMENT,
    route: ROUTE_REPORTED_LISTING,
    icon: SidebarReportedIcon,
  },
  {
    name: 'Course Management',
    path: links.COURSE_MANAMENT,
    route: ROUTE_COURSE_MANAGEMENT,
    icon: SidebarCourseIcon,
  },
  {
    name: 'Vendor Management',
    path: links.VENDOR_MANAMENT,
    route: ROUTE_VENDOR_MANAGEMENT,
    icon: SidebarVendorIcon,
  },
]

const DashboardLayout = (props: any) => {
  const isShowToastAlert = useSelector((state: any) => state.app.isShowToastAlert)
  const { user } = useSelector((state: any) => state.auth)
  const { notificationData, notifications } = useSelector((state: any) => state.notification)
  const { isShowBellNotification } = useSelector((state: any) => state.app)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notiAnchorEl, setNotiAnchorEl] = useState<null | HTMLElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const [page, setPage] = useState(1)
  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined
  const openNoti = Boolean(notiAnchorEl)

  const fetchMoreData = () => {
    if (notificationData?.metadata?.count < notificationData?.metadata?.limit) {
      return
    }
    setPage(page + 1)
    dispatch(fetchNotificationAction({ page: page + 1, limit: 10 }))
  }

  const renderModalContent = () => {
    if (modalContent === 'Change password') {
      return <ChangePassword setShowModal={setShowModal} />
    } else {
      return <Logout setShowModal={setShowModal} />
    }
  }
  return (
    <>
      <Box
        pl={2}
        pt={2}
        pb={2}
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <Box display={'flex'} alignItems='center'>
          <Box mr={1}>
            <SVG src={logo}></SVG>
          </Box>
          <SVG src={KlayTN}></SVG>
        </Box>
        <Box display={'flex'} alignItems='center' mr={2}>
          <Box
            sx={{ cursor: 'pointer', position: 'relative' }}
            mr={3}
            onClick={(e) => {
              setNotiAnchorEl(e.currentTarget)
              dispatch(fetchNotificationAction({ page: 1, limit: 10 }))
              dispatch({ type: HIDE_BELL_NOTIFICATION })
            }}
          >
            <SVG src={bell} />
            {isShowBellNotification && (
              <FiberManualRecordIcon
                sx={{ color: 'red', height: '10px', position: 'absolute', left: 0 }}
              />
            )}
          </Box>
          <Popover
            open={openNoti}
            anchorEl={notiAnchorEl}
            onClose={() => {
              setNotiAnchorEl(null)
              setPage(1)
              dispatch(clearNotification())
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box sx={{ width: '500px' }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }} pl={2} pt={2}>
                Notifications
              </Typography>
              <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
              <Box pl={2} sx={{ height: 200, overflow: 'auto' }} id='scrollableDiv'>
                <InfiniteScroll
                  dataLength={notifications.length}
                  next={fetchMoreData}
                  hasMore={notifications.length < (notificationData?.metadata?.total ?? 1)}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget='scrollableDiv'
                  endMessage={<p>Reached to the end</p>}
                  height={200}
                >
                  {notifications?.map((x: any, index: number) => (
                    <Box
                      display='flex'
                      key={index}
                      sx={{
                        ':hover': {
                          cursor: 'pointer',
                          background: '#f7f7f7',
                        },
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        paddingLeft: '10px',
                        borderRadius: 2,
                      }}
                      onClick={() => {
                        dispatch(updateReadNotificationAction({ id: x?.notification?._id }))
                        dispatch(goToPage(ROUTE_DETAIL_LISTING, { id: x?.notification?.listingId }))
                      }}
                    >
                      <Box
                        sx={{
                          background: `url(${x?.userInfo?.avatarUrl}) no-repeat center center /cover`,
                          borderRadius: '50%',
                          height: 48,
                          width: 48,
                          marginRight: 2,
                          overflow: 'hidden',
                          paddingRight: '5px',
                        }}
                      ></Box>
                      <Box display={'flex'} width='100%'>
                        <Box>
                          <Typography component='h5' className={styles.userName}>
                            {x?.notification?.message.split('\n').map((str: any) => (
                              <div>{str}</div>
                            ))}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </InfiniteScroll>
              </Box>
            </Box>
          </Popover>

          <Box sx={{ border: '1px solid #E5E7E9', height: '100%', marginRight: '10px' }}></Box>

          <Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null)
              }}
              sx={{ width: '100%', marginTop: '20px' }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box sx={{ cursor: 'pointer', borderRadius: '4px' }}>
                <Typography
                  sx={{ pt: 1, px: 2, bgcolor: 'background.paper' }}
                  onClick={(e) => {
                    setShowModal(true)
                    setAnchorEl(null)
                    setModalContent('Change password')
                  }}
                >
                  Change password
                </Typography>
                <Typography
                  onClick={(e) => {
                    setShowModal(true)
                    setAnchorEl(null)
                    setModalContent('Logout')
                  }}
                  sx={{ pb: 1, pl: 2, bgcolor: 'background.paper', color: colors.brownRed }}
                >
                  Logout
                </Typography>
              </Box>
            </Popover>
          </Box>
          <Box display='flex'>
            <Box
              sx={{
                borderRadius: 20,
                height: 48,
                width: 48,
                marginRight: 2,
                overflow: 'hidden',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={handleClick}
            >
              <img src={user.avatarUrl} alt='' className={styles.layoutAvatar} />
            </Box>
            <Box display='flex' flexDirection={'column'}>
              <Typography component='h5' className={styles.userName}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography sx={{ color: '#148F9D' }} variant='subtitle2'>
                Role: {user?.typeOfUser}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display='flex'>
        <Box
          minHeight='100vh'
          width='360px'
          sx={{ backgroundColor: 'white' }}
          p={1.5}
          style={{ boxSizing: 'border-box' }}
        >
          {AdminDrawer.map((x: any, index: number) => {
            const path = window.location.pathname.split('/')[1]
            const itemPath = x?.path?.substring(1)
            const isSubPath = x?.subPath?.includes(`/${path}`)

            return (
              <ListItemButton
                key={index}
                onClick={() => dispatch(goToPage(x.route))}
                sx={{
                  backgroundColor: path === itemPath ? '#F5FBFC' : 'transparent !important',
                  borderRadius: 25,
                  padding: '12px 24px',
                }}
              >
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <SVG src={x.icon} style={{ color: path === itemPath ? '#1ABFD1' : 'inherit' }} />
                </ListItemIcon>
                <ListItemText
                  primary={x.name}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: path === itemPath || isSubPath ? '#1ABFD1' : 'gray',
                      fontSize: 14,
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            )
          })}
        </Box>
        <Box px={5} pt={2} flex={1} sx={{ backgroundColor: colors.lightCyan }}>
          {props.children}
        </Box>
      </Box>
      <CustomModal
        open={showModal}
        onClose={() => setShowModal(false)}
        showClear={modalContent === 'Change password'}
      >
        {renderModalContent()}
      </CustomModal>
      {isShowToastAlert && <CustomToast />}
    </>
  )
}
export default DashboardLayout
