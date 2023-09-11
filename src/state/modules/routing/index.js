export const ROUTE_FORBIDDEN = 'route/ROUTE_FORBIDDEN'
export const ROUTE_AUTH = 'route/ROUTE_AUTH'
export const ROUTE_HOME = 'route/ROUTE_HOME'
export const ROUTE_LOGIN = 'route/ROUTE_LOGIN'
export const ROUTE_FORGOT_PASS = 'route/ROUTE_FORGOT_PASS'
export const ROUTE_USER_MANAGEMENT = 'route/ROUTE_USER_MANAGEMENT'
export const ROUTE_USER_MANAGEMENT_CREATE_USER = 'route/ROUTE_USER_MANAGEMENT_CREATE_USER'
export const ROUTE_USER_MANAGEMENT_UPDATE_USER = 'route/ROUTE_USER_MANAGEMENT_UPDATE_USER'
export const ROUTE_DETAIL_LISTING = 'route/ROUTE_DETAIL_LISTING'
export const ROUTE_LISTING_MANAGEMENT = 'route/ROUTE_LISTING_MANAGEMENT'
export const ROUTE_DETAIL_REPORTED = 'route/ROUTE_DETAIL_REPORTED'
export const ROUTE_REPORTED_LISTING = 'route/ROUTE_REPORTED_LISTING'
export const ROUTE_COURSE_CREATE = 'route/ROUTE_COURSE_CREATE'
export const ROUTE_COURSE_MANAGEMENT = 'route/ROUTE_COURSE_MANAGEMENT'
export const ROUTE_COURSE_UPDATE = 'route/ROUTE_COURSE_UPDATE'
export const ROUTE_VENDOR_MANAGEMENT = 'route/ROUTE_VENDOR_MANAGEMENT'
export const ROUTE_VENDOR_CREATE = 'route/ROUTE_VENDOR_CREATE'
export const ROUTE_VENDOR_UPDATE = 'route/ROUTE_VENDOR_UPDATE'

export const selectCurrentRoutePayload = (state) => state.location.payload
export const selectCurrentPage = (state) => state.location.pathname
export const selectRouteType = (state) => state.location.type
export const selectRoutesMap = (state) => state.location.routesMap
export const selectPreviousRoute = (state) => state.location.prev

export const goToPage = (routeType, payload, rest) => ({
  type: routeType,
  payload: payload,
  ...rest,
})
