import DashboardLayout from 'layouts/DashboardLayout'
import DetailsUserManagement from 'components/DetailsUserManagement'

const UserManagementCreateUser = () => {
  const userDetails = {}
  return (
    <DashboardLayout>
      <DetailsUserManagement userDetails={userDetails} />
    </DashboardLayout>
  )
}

export default UserManagementCreateUser
