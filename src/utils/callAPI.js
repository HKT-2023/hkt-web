import { isFunction } from 'lodash'
import { getAuthToken } from './localStorage'
import axios from 'axios'
import { get } from 'lodash'

export default async function callAPI({
  method,
  apiPath,
  actionTypes: [requestType, successType, failureType],
  variables,
  dispatch,
  getState,
  headers,
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions')
  }

  const baseUrlApi = process.env.REACT_APP_API_URL
  const token = getAuthToken()
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  var variableTemp = variables
  if (headers) {
    variableTemp = {}
    for (let key of Object.keys(variables)) {
      variableTemp[key] = get(variables, key)
    }
  }

  dispatch({ type: requestType, meta: { variables: variableTemp } })
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? { ...header, ...headers } : header,
    method,
    url: apiPath,
    data: variables,
    params: method === 'get' ? variables : '',
  })
    .then(function (response) {
      dispatch({ type: successType, meta: { variables: variableTemp }, payload: response.data })
      return response.data
    })
    .catch(function (error) {
      let response = error.response ? error.response : error
      dispatch({ type: failureType, meta: { variables: variableTemp }, payload: error.response })
      return {
        errorCode: response.status,
        errorMessage: response.statusText,
      }
    })
}
