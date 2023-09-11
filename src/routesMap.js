import { NOT_FOUND } from 'redux-first-router'
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_USER_MANAGEMENT,
  ROUTE_USER_MANAGEMENT_CREATE_USER,
  ROUTE_USER_MANAGEMENT_UPDATE_USER,
  ROUTE_FORGOT_PASS,
  ROUTE_DETAIL_LISTING,
  ROUTE_LISTING_MANAGEMENT,
  ROUTE_DETAIL_REPORTED,
  ROUTE_REPORTED_LISTING,
  ROUTE_COURSE_CREATE,
  ROUTE_COURSE_MANAGEMENT,
  ROUTE_COURSE_UPDATE,
  ROUTE_VENDOR_MANAGEMENT,
  ROUTE_VENDOR_CREATE,
  ROUTE_VENDOR_UPDATE,
} from './state/modules/routing'
import createUserManagement from 'state/modules/createUserManagement/sagas'
import loadUserManagement from 'state/modules/userManagement/sagas'
import loadUpdateUserManagement from 'state/modules/userManagementUpdate/sagas'
import loadDetailListing from 'state/modules/detailsListing/sagas'
import loadListingManagement from 'state/modules/listingManagement/sagas'
import loadReportedListing from 'state/modules/reportedListing/sagas'
import loadDetailReported from 'state/modules/detailReported/sagas'
import loadCourseManagement from 'state/modules/courseManagement/sagas'
import loadUpdateCourserManagement from 'state/modules/courseManagementUpdate/sagas'
import loadCourseManagementCreate from 'state/modules/courseManagementCreate/sagas'
import loadVendorManagement from 'state/modules/vendorManagement/sagas'
import loadVendorManagementCreate from 'state/modules/vendorManagementCreate/sagas'
import loadVendorManagementUpdate from 'state/modules/vendorManagementUpdate/sagas'

const RoutersMap = {
  [NOT_FOUND]: {
    path: '/not-found',
    component: 'NotFound',
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    component: 'Login',
    requiresAuth: false,
    title: 'Login',
  },
  [ROUTE_FORGOT_PASS]: {
    path: '/forgot-password',
    component: 'ForgotPassword',
    requiresAuth: false,
    title: 'Forgot Password',
  },
  [ROUTE_HOME]: {
    path: '/',
    component: 'UserManagement',
    saga: loadUserManagement,
    requiresAuth: true,
    title: 'User Management',
  },
  [ROUTE_USER_MANAGEMENT]: {
    path: '/user-management',
    component: 'UserManagement',
    saga: loadUserManagement,
    requiresAuth: true,
    title: 'User Management',
  },
  [ROUTE_USER_MANAGEMENT_CREATE_USER]: {
    path: '/user-management/create-user',
    component: 'UserManagementCreateUser',
    saga: createUserManagement,
    requiresAuth: true,
    title: 'User Management Create User',
  },
  [ROUTE_USER_MANAGEMENT_UPDATE_USER]: {
    path: '/user-management/update-user/:id',
    component: 'UserManagementUpdateUser',
    saga: loadUpdateUserManagement,
    requiresAuth: true,
    title: 'User Management Update User',
  },
  [ROUTE_LISTING_MANAGEMENT]: {
    path: '/listing-management',
    component: 'ListingManagement',
    saga: loadListingManagement,
    requiresAuth: true,
    title: 'Listing Management',
  },
  [ROUTE_DETAIL_LISTING]: {
    path: '/listing-management/update-listing/:id',
    component: 'DetailListing',
    saga: loadDetailListing,
    requiresAuth: true,
    title: 'Listing Management Update Listing',
  },
  [ROUTE_DETAIL_REPORTED]: {
    path: '/reported-listing-management/update-reported/:id',
    component: 'DetailReported',
    saga: loadDetailReported,
    requiresAuth: true,
    title: 'Listing Management Update Reported',
  },
  [ROUTE_COURSE_CREATE]: {
    path: '/course-management/create-course',
    component: 'CourseManagementCreate',
    saga: loadCourseManagementCreate,
    requiresAuth: true,
    title: 'Create Course',
  },
  [ROUTE_COURSE_UPDATE]: {
    path: '/course-management/update-course/:id',
    component: 'CourseManagementUpdate',
    saga: loadUpdateCourserManagement,
    requiresAuth: true,
    title: 'Update Course',
  },
  [ROUTE_REPORTED_LISTING]: {
    path: '/reported-listing-management',
    component: 'ReportedListing',
    saga: loadReportedListing,
    requiresAuth: true,
    title: 'Reported Listing Management',
  },
  [ROUTE_COURSE_MANAGEMENT]: {
    path: '/course-management',
    component: 'CourseManagement',
    saga: loadCourseManagement,
    requiresAuth: true,
    title: 'Course Management',
  },
  [ROUTE_VENDOR_MANAGEMENT]: {
    path: '/vendor-management',
    component: 'VendorManagement',
    saga: loadVendorManagement,
    requiresAuth: true,
    title: 'Vendor Management',
  },
  [ROUTE_VENDOR_CREATE]: {
    path: '/vendor-management/create-vendor',
    component: 'VendorManagementCreate',
    saga: loadVendorManagementCreate,
    requiresAuth: true,
    title: 'Create Vendor',
  },
  [ROUTE_VENDOR_UPDATE]: {
    path: '/vendor-management/update-vendor/:id',
    component: 'VendorManagementUpdate',
    saga: loadVendorManagementUpdate,
    requiresAuth: true,
    title: 'Update Vendor',
  },
}
export default RoutersMap
