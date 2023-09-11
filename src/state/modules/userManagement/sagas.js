import { all, fork, put, takeLatest } from 'redux-saga/effects'
import {
  GET_VENDOR_CATEGORY_ALL_LIST_ACTION,
  SEARCH_ACTION,
  fetchUserManagement,
  fetchVendorCategoryAllList,
} from './index'
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE, SORT_DEFAULT } from 'utils/constants'

function* initPage() {
  yield put(
    fetchUserManagement({
      limit: PAGINATION_DEFAULT_LIMIT,
      page: PAGINATION_DEFAULT_PAGE,
      sortCreatedAt: SORT_DEFAULT,
    }),
  )
}

function* listenEvents() {
  yield takeLatest(SEARCH_ACTION, function* (action) {
    yield put(fetchUserManagement(action.payload))
  })

  yield takeLatest(GET_VENDOR_CATEGORY_ALL_LIST_ACTION, function* (action) {
    yield put(fetchVendorCategoryAllList(action.payload))
  })
}

export default function* loadUserManagement() {
  yield all([fork(initPage), fork(listenEvents)])
}
