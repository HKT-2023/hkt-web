import React, { useState, useCallback } from 'react'
import { Pagination, List, ListItem, Typography, Box, Select, MenuItem } from '@mui/material'
import usePagination from '@mui/material/usePagination'
import { styled, useTheme } from '@mui/material/styles'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import useMediaQuery from '@mui/material/useMediaQuery'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from 'utils/constants'

export const PaginationStyled = styled(Pagination)(({ theme }) => ({
  '& .Mui-selected': {
    backgroundColor: 'transparent!important',
    color: '#8E8C94',
  },
  '& .MuiPaginationItem-previousNext': {
    '&.Mui-disabled': {
      '& svg': { color: '#CCC' },
    },
    '& svg': { color: '#8E8C94' },
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

export type InfoPagination = {
  start: number
  length: number
  page: number
}

type DefaultPaginationProps = {
  infoPagination: InfoPagination
  handleChangePage: (event: any, value: number) => void
  handleChangeRowsPerPage: (value: number) => void
}

type PaginationProps = {
  count: number
} & DefaultPaginationProps

export const usePaginationCustom = (
  callbackFetchData: (infoPagination: InfoPagination) => void,
) => {
  const [infoPagination, setInfoPagination] = useState({
    page: PAGINATION_DEFAULT_PAGE,
    start: 1,
    length: PAGINATION_DEFAULT_LIMIT,
  })
  const handleChangePage = useCallback(
    (event: any, value: number) => {
      if (value !== infoPagination.page) {
        setInfoPagination({
          ...infoPagination,
          page: value,
          start: infoPagination.length * (value - 1),
        })
        callbackFetchData({
          ...infoPagination,
          page: value,
          start: infoPagination.length * (value - 1),
        })
      }
    },
    [callbackFetchData, infoPagination],
  )

  const handleChangeRowsPerPage = useCallback(
    (value: number) => {
      if (value !== infoPagination.length) {
        setInfoPagination({
          ...infoPagination,
          start: 1,
          length: value,
        })
        callbackFetchData({
          ...infoPagination,
          start: 1,
          length: value,
        })
      }
    },
    [callbackFetchData, infoPagination],
  )

  const handleSetInfoPagination = useCallback(
    ({ start, length }: { start: number; length: number }, isFetchingData?: boolean) => {
      const info = {
        page: start / length + 1,
        start,
        length,
      }
      setInfoPagination(info)
      if (isFetchingData) {
        callbackFetchData(info)
      }
    },
    [callbackFetchData],
  )

  const defaultPaginationProps = {
    infoPagination,
    handleChangePage,
    handleChangeRowsPerPage,
  }

  return {
    infoPagination,
    DefaultPagination,
    defaultPaginationProps,
    handleSetInfoPagination,
  }
}

export const DefaultPagination: React.FC<PaginationProps> = ({
  count,
  infoPagination,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const { items } = usePagination({
    count: Math.ceil(count / infoPagination.length),
    page: infoPagination.page,
    onChange: (e, value) => changePage(e, value),
  })

  const theme = useTheme()

  const changePage = (e: any, value: number) => {
    if (value && value <= Math.ceil(count / infoPagination.length)) {
      handleChangePage(e, value)
    }
  }

  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box mt={3} display='flex' alignItems='center' justifyContent='space-between'>
      <Box display='flex' alignItems='center' justifyContent='space-between' columnGap={2}>
        <SelectStyled
          renderValue={(value) => `${value} / page`}
          IconComponent={KeyboardArrowDownIcon}
          value={infoPagination.length}
          onChange={(e) => handleChangeRowsPerPage(e.target.value as number)}
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
          {infoPagination.start}-
          {infoPagination.length * infoPagination.page >= count
            ? count
            : infoPagination.length * infoPagination.page}{' '}
          of {count}
        </Typography>
      </Box>
      <List sx={{ display: 'flex', alignItems: 'center', p: 0 }} component='ul'>
        {items.map((item, index) => {
          const { page, type, selected, disabled, ...itemProp } = item
          let children = null
          if (!isDownMd && (type === 'start-ellipsis' || type === 'end-ellipsis')) {
            children = (
              <Typography variant='subtitle1' fontWeight={600} lineHeight='24px'>
                ...
              </Typography>
            )
          }

          if (!isDownMd && type === 'page') {
            children = (
              <Typography variant='subtitle1' fontWeight={600} lineHeight='24px'>
                {page}
              </Typography>
            )
          }
          if (isDownMd && type === 'page' && selected) {
            children = (
              <Typography variant='subtitle1' fontWeight={600} lineHeight='24px'>
                {page}
              </Typography>
            )
          }
          if (type === 'previous') {
            children = (
              <KeyboardArrowLeftIcon
                sx={{
                  color: disabled ? '#CCC' : '#8E8C94',
                  cursor: disabled ? 'auto' : 'pointer',
                }}
              />
            )
          }
          if (type === 'next') {
            children = (
              <KeyboardArrowRightIcon
                sx={{
                  color: disabled ? '#CCC' : '#8E8C94',
                  cursor: disabled ? 'auto' : 'pointer',
                }}
              />
            )
          }
          return (
            children && (
              <ListItem
                {...itemProp}
                sx={{
                  marginRight: 0,
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  cursor: selected ? 'default' : 'pointer',
                  background: selected ? '#2CC2D3' : 'transparent',
                  '& .MuiTypography-root': {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: selected ? '#fff' : '#425862',
                  },
                  '&:hover': { opacity: selected ? 1 : 0.8 },
                }}
                key={index}
                component='li'
                disablePadding
              >
                {children}
              </ListItem>
            )
          )
        })}
      </List>
    </Box>
  )
}
