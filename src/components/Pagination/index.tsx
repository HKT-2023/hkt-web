import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { PAGINATION_DEFAULT_LIMIT } from 'utils/constants'

const PaginationStyled = styled(Pagination)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    fontWeight: 500,
    fontSize: 14,
    borderRadius: '4px',
    width: '36px',
    height: '36px',
    margin: 0,
  },
  '& .MuiButtonBase-root.Mui-selected': {
    backgroundColor: '#1ABFD1',
    color: '#FFFFFF',
    cursor: 'default',
    '&:hover': {
      backgroundColor: '#1ABFD1',
    },
  },
}))

const SelectStyled = styled(Select)(({ theme }) => ({
  '&.MuiInputBase-root': {
    borderRadius: 4,
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: 14,
    fontWeight: 600,
    color: '#615E69',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))

interface IProps {
  totalPages: number
  currentPage: number
  onChangePage: (page: number) => void
  limit: number
  onChangeLimit: (limit: number) => void
  start: number
  totalItems: number
}

const CustomPagination = ({
  totalPages,
  currentPage,
  onChangePage,
  limit,
  onChangeLimit,
  start,
  totalItems,
}: IProps) => {
  const handleChangePagination = (event: React.ChangeEvent<unknown>, newPage: number) => {
    onChangePage(newPage)
  }
  const handleChangeLimit = (newLimit: number) => {
    onChangeLimit(newLimit)
  }

  return (
    <Box mt={3} display='flex' alignItems='center' justifyContent='space-between'>
      <Box display='flex' alignItems='center' justifyContent='space-between' columnGap={2}>
        <SelectStyled
          renderValue={(value) => `${value} / page`}
          IconComponent={KeyboardArrowDownIcon}
          value={limit}
          onChange={(e) => handleChangeLimit(e.target.value as number)}
        >
          <MenuItem value={PAGINATION_DEFAULT_LIMIT}>{PAGINATION_DEFAULT_LIMIT}</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </SelectStyled>
        <Typography
          fontWeight='600'
          fontSize='14px'
          letterSpacing='0.4px'
          sx={{ color: '#615E69' }}
        >
          {start}-{limit * currentPage >= totalItems ? totalItems : limit * currentPage} of{' '}
          {totalItems}
        </Typography>
      </Box>
      <PaginationStyled count={totalPages} page={currentPage} onChange={handleChangePagination} />
    </Box>
  )
}

export default CustomPagination
