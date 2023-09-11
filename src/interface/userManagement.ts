export interface UserManagementFilters {
  limit: number
  page: number
  name: string
  email: string
  vendorLocation: string
  licenseNumber: string
  vendorType: string
  vendorTypeLabel?: string
  typeOfUser: string
  status: string
  sortFirstName: number
  sortLastName: number
  sortTypeOfUser: number
  sortEmail: number
  sortPhone: number
  sortStatus: number
  sortCreatedAt: number
}
