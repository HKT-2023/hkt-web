import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import styles from './styles.module.scss'
import SVG from 'react-inlinesvg'
import ViewIcon from 'resources/icons/viewIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import SortIcon from 'resources/icons/thead-sort.svg'
import SortUp from 'resources/images/Table-Header/icons/thead-sort-up.png'
import SortDown from 'resources/images/Table-Header/icons/thead-sort-down.png'
import { LoadingComponent } from 'components/LoadingComponent'
import { ROUTE_USER_MANAGEMENT_UPDATE_USER, goToPage } from 'state/modules/routing'
import { UserManagementFilters } from 'interface/userManagement'
import { minTwoDigits } from 'utils/helper'

interface IProps {
  start: number
  filters: UserManagementFilters
  onSort: (field: string, sortType: number) => void
}

const ListTable = ({ start, filters, onSort }: IProps) => {
  const dispatch = useDispatch()
  const { data, fetchingUserManagement } = useSelector((state: any) => state.userManagement)

  const renderSortIcon = (field: string, sortType: number) => {
    if (sortType === 1) {
      return (
        <img
          className={styles.sortIcon}
          src={SortDown}
          alt='sort asc'
          onClick={() => onSort(field, -1)}
        />
      )
    } else if (sortType === -1) {
      return (
        <img
          className={styles.sortIcon}
          src={SortUp}
          alt='sort desc'
          onClick={() => onSort(field, 0)}
        />
      )
    } else {
      return (
        <SVG
          src={SortIcon}
          style={{ marginLeft: '8px', cursor: 'pointer', position: 'relative', top: '2px' }}
          onClick={() => onSort(field, 1)}
        />
      )
    }
  }

  if (fetchingUserManagement) {
    return <LoadingComponent sx={{ my: 8 }} />
  }

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed', minWidth: 756 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '50px' }} className={styles.tableHead}>
              ID
            </TableCell>
            <TableCell className={styles.tableHead}>
              FIRSTNAME
              {renderSortIcon('sortFirstName', filters.sortFirstName)}
            </TableCell>
            <TableCell className={styles.tableHead}>
              LASTNAME
              {renderSortIcon('sortLastName', filters.sortLastName)}
            </TableCell>
            <TableCell className={styles.tableHead}>
              TYPE OF USER
              {renderSortIcon('sortTypeOfUser', filters.sortTypeOfUser)}
            </TableCell>
            <TableCell className={styles.tableHead}>
              EMAIL
              {renderSortIcon('sortEmail', filters.sortEmail)}
            </TableCell>
            <TableCell className={styles.tableHead}>
              PHONE
              {renderSortIcon('sortPhone', filters.sortPhone)}
            </TableCell>
            <TableCell className={styles.tableHead}>
              STATUS
              {renderSortIcon('sortStatus', filters.sortStatus)}
            </TableCell>
            <TableCell sx={{ width: '70px' }} className={styles.tableHead}>
              ACTION
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.data.map((item: any, index: number) => (
            <TableRow key={item._id}>
              <TableCell className={styles.tableBody}>{minTwoDigits(start + index)}</TableCell>
              <TableCell className={styles.tableBody}>{item.firstName}</TableCell>
              <TableCell className={styles.tableBody}>{item.lastName}</TableCell>
              <TableCell className={styles.tableBody}>{item.typeOfUser}</TableCell>
              <TableCell className={styles.tableBody}>{item.email}</TableCell>
              <TableCell className={styles.tableBody}>{item.phone}</TableCell>
              <TableCell className={styles.tableBody}>
                <span className={styles.labelActive} data-status={item.status}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell className={styles.tableBody}>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() =>
                    dispatch(goToPage(ROUTE_USER_MANAGEMENT_UPDATE_USER, { id: item._id }))
                  }
                >
                  <SVG src={ViewIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ListTable
