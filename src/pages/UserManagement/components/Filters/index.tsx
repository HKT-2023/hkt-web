import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import styles from './styles.module.scss'
import { TypeOfUser, TypeOfUserList, UserStatusList } from 'utils/constants'
import { Search } from '@mui/icons-material'
import CustomButton from 'components/Button'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { UserManagementFilters } from 'interface/userManagement'
import SelectWithClearIcon from 'components/SelectWithClearIcon'
import { useDispatch, useSelector } from 'react-redux'
import ReactSelect from 'react-select'
import CustomLabel from 'components/CustomLabel'
import {
  clearVendorCategoryAllListAction,
  getVendorCategoryAllListAction,
} from 'state/modules/userManagement'

interface IProps {
  filters: UserManagementFilters
  setFilters: (filters: UserManagementFilters) => void
  onSearch: () => void
  showAdvanced: boolean
  setShowAdvanced: (state: boolean) => void
}

const Filters = ({ filters, setFilters, onSearch, showAdvanced, setShowAdvanced }: IProps) => {
  const dispatch = useDispatch()
  const { vendorCategoryInfoList } = useSelector((state: any) => state.userManagement)
  const listNonVendor = [
    TypeOfUser.User,
    TypeOfUser.Admin,
    TypeOfUser.KlayTNAgent,
    TypeOfUser.NonKlayTNAgent,
  ]

  const handleChangeTypeOfUser = (value: string) => {
    if (listNonVendor.includes(value as TypeOfUser)) {
      setFilters({
        ...filters,
        vendorType: '',
        vendorLocation: '',
        typeOfUser: value,
      })
    } else {
      setFilters({
        ...filters,
        typeOfUser: value,
      })
    }
  }

  return (
    <Box className={styles.boxWrap}>
      <Typography
        sx={{ marginBottom: '15px', fontWeight: 600, fontSize: '22px', color: '#212b2f' }}
      >
        Find User Records
      </Typography>
      <Box display='grid' gridTemplateColumns='1fr 1fr 1fr 1fr' columnGap='16px' mb={2}>
        <TextField
          label='Name'
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <TextField
          label='Email'
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />
        <TextField
          label='Vendor Location'
          disabled={listNonVendor.includes(filters.typeOfUser as TypeOfUser)}
          value={filters.vendorLocation}
          onChange={(e) => setFilters({ ...filters, vendorLocation: e.target.value })}
        />
        <Box display='flex' columnGap='16px'>
          <Button className={styles.buttonCollap} onClick={() => setShowAdvanced(!showAdvanced)}>
            <KeyboardDoubleArrowDownIcon
              className={showAdvanced ? styles.buttonCollapIconShow : ''}
            />
          </Button>
          <CustomButton title='Search' icon={<Search />} onClick={onSearch} sx={{ flex: 1 }} />
        </Box>
      </Box>
      {showAdvanced && (
        <Box display='grid' gridTemplateColumns='1fr 1fr 1fr 1fr' columnGap='16px'>
          <TextField
            label='License Number'
            value={filters.licenseNumber}
            onChange={(e) => setFilters({ ...filters, licenseNumber: e.target.value })}
          />
          <FormControl
            onClick={() => dispatch(getVendorCategoryAllListAction({ page: 1, limit: 100 }))}
          >
            {filters.vendorType !== '' && <CustomLabel title='Vendor category' />}
            <ReactSelect
              maxMenuHeight={200}
              placeholder='Vendor category'
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: 56,
                }),
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                placeholder: (base) => ({
                  ...base,
                  color: 'rgba(0, 0, 0, 0.5)',
                }),
              }}
              isClearable
              defaultValue={
                filters.vendorType
                  ? {
                      value: filters.vendorType,
                      label: filters.vendorTypeLabel,
                    }
                  : undefined
              }
              options={vendorCategoryInfoList?.data?.map((x: any) => ({
                value: x._id,
                label: x.name,
              }))}
              onMenuScrollToBottom={() => {
                if (vendorCategoryInfoList.metadata.count < vendorCategoryInfoList.metadata.limit) {
                  return
                }
                dispatch(
                  getVendorCategoryAllListAction({
                    page: vendorCategoryInfoList.metadata.page + 1,
                    limit: 100,
                  }),
                )
              }}
              onChange={(option: any, action: any) => {
                if (action.action === 'select-option') {
                  setFilters({
                    ...filters,
                    vendorType: option.value,
                    vendorTypeLabel: option.label,
                  })
                }
                if (action.action === 'clear') {
                  setFilters({ ...filters, vendorType: '', vendorTypeLabel: '' })
                }
              }}
              onMenuClose={() => {
                dispatch(clearVendorCategoryAllListAction())
              }}
            />
          </FormControl>
          <SelectWithClearIcon
            label='Type of User'
            labelId='type-of-user'
            options={TypeOfUserList}
            value={filters.typeOfUser}
            onChangeSelect={handleChangeTypeOfUser}
            onClickClearIcon={() => setFilters({ ...filters, typeOfUser: '' })}
          />
          <SelectWithClearIcon
            label='Status'
            labelId='status'
            options={UserStatusList}
            value={filters.status}
            onChangeSelect={(status) => setFilters({ ...filters, status })}
            onClickClearIcon={() => setFilters({ ...filters, status: '' })}
          />
        </Box>
      )}
    </Box>
  )
}

export default Filters
