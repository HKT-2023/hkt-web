import { createReducer } from 'redux-create-reducer'
import callAPI from '../../../utils/callAPI'
import { get } from 'lodash'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS'
export const REQUEST_PRODUCTS_FAILURE = 'REQUEST_PRODUCTS_FAILURE'

export const REQUEST_COLORS = 'REQUEST_COLORS'
export const REQUEST_COLORS_SUCCESS = 'REQUEST_COLORS_SUCCESS'
export const REQUEST_COLORS_FAILURE = 'REQUEST_COLORS_FAILURE'

export const ACTION_CHANGE_PRODUCT = 'ACTION_CHANGE_PRODUCT'
export const UPDATE_PRODUCT_DATA = 'UPDATE_PRODUCT_DATA'

const defaultState = {
  productFilter: {
    limit: 10,
    page: 1,
  },

  products: [],
  fetchingProducts: false,
  failedFetchingProducts: false,
  editedProducts: [],

  colors: [],
  fetchingColors: false,
  failedFetchingColors: false,
}

const reducer = createReducer(defaultState, {
  [REQUEST_PRODUCTS]: (state, action) => ({
    ...state,
    fetchingProducts: true,
    failedFetchingProducts: false,
  }),
  [REQUEST_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    products: action.payload,
    fetchingProducts: false,
    failedFetchingProducts: false,
  }),
  [REQUEST_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    fetchingProducts: false,
    failedFetchingProducts: true,
  }),

  [REQUEST_COLORS]: (state, action) => ({
    ...state,
    fetchingColors: true,
    failedFetchingColors: false,
  }),
  [REQUEST_COLORS_SUCCESS]: (state, action) => ({
    ...state,
    colors: action.payload,
    fetchingColors: false,
    failedFetchingColors: false,
  }),
  [REQUEST_COLORS_FAILURE]: (state, action) => ({
    ...state,
    fetchingColors: false,
    failedFetchingColors: true,
  }),

  [UPDATE_PRODUCT_DATA]: (state, action) => ({
    ...state,
    products: get(action, 'payload.products', []),
    editedProducts: get(action, 'payload.editedProducts', []),
  }),
})

export default reducer
export const namespace = 'home'

export const actionChangeProduct = (newProduct) => ({
  type: ACTION_CHANGE_PRODUCT,
  payload: newProduct,
})

export const actionUpdateProductData = (payload) => ({
  type: UPDATE_PRODUCT_DATA,
  payload,
})

export const getProducts = (filter) => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/products',
    actionTypes: [REQUEST_PRODUCTS, REQUEST_PRODUCTS_SUCCESS, REQUEST_PRODUCTS_FAILURE],
    variables: {
      ...filter,
    },
    dispatch,
    getState,
  })
}

export const getColors = () => async (dispatch, getState) => {
  return await callAPI({
    method: 'get',
    apiPath: '/colors',
    actionTypes: [REQUEST_COLORS, REQUEST_COLORS_SUCCESS, REQUEST_COLORS_FAILURE],
    variables: {},
    dispatch,
    getState,
  })
}
