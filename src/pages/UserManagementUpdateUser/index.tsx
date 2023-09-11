import DashboardLayout from 'layouts/DashboardLayout'
import { useSelector } from 'react-redux'
import { LoadingComponent } from 'components/LoadingComponent'
import DetailsUserManagement from 'components/DetailsUserManagement'

const UserManagementCreateUser = () => {
  const { userDetails, fetchingFetchUserDetails } = useSelector(
    (state: any) => state.userManagementUpdate,
  )
  return (
    <DashboardLayout>
      {fetchingFetchUserDetails ? (
        <LoadingComponent />
      ) : userDetails ? (
        <DetailsUserManagement userDetails={userDetails} />
      ) : (
        <h2>Not Found</h2>
      )}
    </DashboardLayout>
  )
}

export default UserManagementCreateUser
