import DashboardLayout from 'layouts/DashboardLayout'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTE_USER_MANAGEMENT_CREATE_USER, goToPage } from 'state/modules/routing'
import styles from './styles.module.scss'
import ListTable from './components/ListTable'
import Filters from './components/Filters'
import { useState } from 'react'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from 'utils/constants'
import { searchAction } from 'state/modules/userManagement'
import { InfoPagination, usePaginationCustom } from 'hooks/usePagination'
import { UserManagementFilters } from 'interface/userManagement'
import { LoadingComponent } from 'components/LoadingComponent'
import Breadcrumb from 'components/Breadcrumb'

const UserManagement = () => {
  const dispatch = useDispatch()
  const { data, fetchingUserManagement } = useSelector((state: any) => state.userManagement)
  const { metadata } = data
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true)
  const [filters, setFilters] = useState<UserManagementFilters>({
    limit: PAGINATION_DEFAULT_LIMIT,
    page: PAGINATION_DEFAULT_PAGE,
    name: '',
    email: '',
    vendorLocation: '',
    licenseNumber: '',
    vendorType: '',
    vendorTypeLabel: '',
    typeOfUser: '',
    status: '',
    sortFirstName: 0,
    sortLastName: 0,
    sortTypeOfUser: 0,
    sortEmail: 0,
    sortPhone: 0,
    sortStatus: 0,
    sortCreatedAt: -1,
  })

  const handleParams = (params: any) => {
    return {
      ...(params.name && { name: params.name.trim() }),
      ...(params.email && { email: params.email.trim() }),
      ...(params.vendorLocation && { vendorLocation: params.vendorLocation.trim() }),
      ...(params.licenseNumber && { licenseNumber: params.licenseNumber.trim() }),
      ...(params.vendorType && { vendorType: params.vendorType }),
      ...(params.vendorTypeLabel && { vendorTypeLabel: params.vendorTypeLabel }),
      ...(params.typeOfUser && { typeOfUser: params.typeOfUser }),
      ...(params.status && { status: params.status }),
      ...(params.sortFirstName && { firstName: params.sortFirstName }),
      ...(params.sortLastName && { lastName: params.sortLastName }),
      ...(params.sortTypeOfUser && { sortTypeOfUser: params.sortTypeOfUser }),
      ...(params.sortEmail && { sortEmail: params.sortEmail }),
      ...(params.sortPhone && { sortPhone: params.sortPhone }),
      ...(params.sortStatus && { sortStatus: params.sortStatus }),
      ...(params.sortCreatedAt && { sortCreatedAt: params.sortCreatedAt }),
    }
  }

  const callbackFetchData = (infoPagination: InfoPagination) => {
    const { length, page } = infoPagination
    fetchData(length, filters.limit !== length ? 1 : page)
    setFilters({ ...filters, limit: length, page })
  }

  const { DefaultPagination, defaultPaginationProps, handleSetInfoPagination } =
    usePaginationCustom(callbackFetchData)

  const fetchData = (newLimit: number, newPage: number) => {
    const queryParams = {
      limit: newLimit,
      page: newPage,
      ...handleParams(filters),
    }
    dispatch(searchAction(queryParams))
  }

  const handleSearch = () => {
    fetchData(filters.limit, PAGINATION_DEFAULT_PAGE)
    setFilters({ ...filters, page: PAGINATION_DEFAULT_PAGE })
    handleSetInfoPagination({ start: 1, length: filters.limit })
  }

  const handleSort = (field: string, sortType: number) => {
    const newFilters = { ...filters, [field]: sortType }
    setFilters(newFilters)
    const queryParams = {
      limit: newFilters.limit,
      page: newFilters.page,
      ...handleParams(newFilters),
    }
    dispatch(searchAction(queryParams))
  }

  return (
    <DashboardLayout>
      <Breadcrumb text='User Management' mainText='User Management' />
      {fetchingUserManagement ? (
        <LoadingComponent sx={{ my: 8 }} />
      ) : (
        <>
          <Filters
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
            showAdvanced={showAdvancedFilters}
            setShowAdvanced={setShowAdvancedFilters}
          />
          <Box className={styles.boxWrap}>
            <Box display='flex' justifyContent='space-between' alignItems='center' mb={1.25}>
              <Typography className={styles.title}>Find User Records</Typography>
              <Button
                variant='outlined'
                className={styles.buttonCreate}
                onClick={() => dispatch(goToPage(ROUTE_USER_MANAGEMENT_CREATE_USER))}
              >
                Create user
              </Button>
            </Box>
            {data.data.length <= 0 ? (
              <h2 style={{ textAlign: 'center' }}>No data displayed</h2>
            ) : (
              <>
                <ListTable
                  start={(metadata.currentPage - 1) * metadata.limit + 1}
                  filters={filters}
                  onSort={handleSort}
                />
                {!fetchingUserManagement && (
                  <DefaultPagination
                    {...defaultPaginationProps}
                    count={metadata.total}
                    infoPagination={{
                      page: metadata.page,
                      start: (metadata.currentPage - 1) * metadata.limit + 1,
                      length: metadata.limit,
                    }}
                  />
                )}
              </>
            )}
          </Box>
        </>
      )}
    </DashboardLayout>
  )
}

export default UserManagement
