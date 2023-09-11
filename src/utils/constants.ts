import { CourseType } from './enum'

export const PAGINATION_DEFAULT_LIMIT = 20
export const PAGINATION_DEFAULT_PAGE = 1
export const SORT_DEFAULT = -1
export const MAXIMUM_TEXT_FIELD_LENGTH = 255
export const MAXIMUM_DESCRIPTION_LENGTH = 1000
export const MAXIMUM_PHONE_LENGTH = 15
export const MAXIMUM_LICENSE_LENGTH = 10
export const MAXIMUM_UPLOAD = 10 * 1024 * 1024
export const DEFAULT_AVATAR_URL = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
export const OTP_LENGTH = 5
export const TIME_RESEND_OTP = 120
export const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png']
export const FAKE_VALID_PASSWORD = 'Test@123'
export const MINIMUM_ANSWERS = 2
export const MAXIMUM_ANSWERS = 25
export const MAXIMUM_TOKEN_VALUE = 1000000000
export const SECONDS_IN_MINUTE = 60
export const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60
export const MAXIMUM_TOKEN_LENGTH = 1000000000
export const CAPTURE_THUMBNAIL_ID = 'capture-thumbnail'
export const MAXIMUM_PERCENT = 100

export const links = {
  USER_MANAMENT: '/user-management',
  LISTING_MANAMENT: '/listing-management',
  REPORTED_LISTING_MANAMENT: '/reported-listing-management',
  COURSE_MANAMENT: '/course-management',
  VENDOR_MANAMENT: '/vendor-management',
}

export enum FORGOT_PASS_STEP {
  ENTER_EMAIL = 'ENTER_EMAIL',
  ENTER_OTP = 'ENTER_OTP',
  ENTER_NEW_PASS = 'ENTER_NEW_PASS',
}

export enum VendorType {
  Photography = 'Photography',
  Videography = 'Videography',
  FurnitureStaging = 'FurnitureStaging',
  Plumbing = 'Plumbing',
  Painting = 'Painting',
  Escrow = 'Escrow',
  Title = 'Title',
  Termite = 'Termite',
  HomeInspection = 'HomeInspection',
}

export enum TypeOfUser {
  User = 'User',
  Admin = 'Admin',
  KlayTNAgent = 'KlayTNAgent',
  NonKlayTNAgent = 'NonKlayTNAgent',
  Vendor = 'Vendor',
}

export enum UserStatus {
  Active = 'Active',
  InActive = 'Inactive',
}

export enum UserRole {
  Buyer = 'buyer',
  Seller = 'seller',
  BuyerAndSeller = 'buyer_and_seller',
}

export enum SocialMedia {
  Facebook = 'facebook',
  Twitter = 'twitter',
  Instagram = 'instagram',
  LinkedIn = 'linkedIn',
  TikTok = 'tikTok',
}

export enum ListingPropertyType {
  House = 'House',
  Townhouse = 'Townhouse',
  CondoApt = 'Condo/Apt',
  Land = 'Land',
  MultiFamily = 'Multi-Family',
  Mobile = 'Mobile',
  Coop = 'Co-op',
  Other = 'Other',
}

export enum ListingListingStatus {
  Active = 'Active',
  Contingent = 'Contingent',
  Pending = 'Pending',
  Sold = 'Sold',
  Withdrawn = 'Withdrawn',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
  ActiveUnderContract = 'ActiveUnderContract',
  Hold = 'Hold',
}

export const SOCIAL_MEDIA = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedIn',
  TIKTOK: 'tiktok',
}

export const TypeOfUserList = [
  { value: TypeOfUser.User, title: 'User' },
  { value: TypeOfUser.Admin, title: 'Admin' },
  { value: TypeOfUser.KlayTNAgent, title: 'KlayTN Agent' },
  { value: TypeOfUser.NonKlayTNAgent, title: 'Non-KlayTN Agent' },
  { value: TypeOfUser.Vendor, title: 'Vendor' },
]

export const VendorTypeList = [
  { value: VendorType.Photography, title: 'Photography' },
  { value: VendorType.Videography, title: 'Videography' },
  { value: VendorType.FurnitureStaging, title: 'Furniture Staging' },
  { value: VendorType.Plumbing, title: 'Plumbing' },
  { value: VendorType.Painting, title: 'Painting' },
  { value: VendorType.Escrow, title: 'Escrow' },
  { value: VendorType.Title, title: 'Title' },
  { value: VendorType.Termite, title: 'Termite' },
  { value: VendorType.HomeInspection, title: 'Home Inspection' },
]

export const UserStatusList = [
  { value: UserStatus.Active, title: UserStatus.Active },
  { value: UserStatus.InActive, title: UserStatus.InActive },
]

export const ListingPropertyTypeList = [
  { value: ListingPropertyType.House, title: 'House' },
  { value: ListingPropertyType.Townhouse, title: 'Townhouse' },
  { value: ListingPropertyType.CondoApt, title: 'Condo/Apt' },
  { value: ListingPropertyType.Land, title: 'Land' },
  { value: ListingPropertyType.MultiFamily, title: 'Multi-Family' },
  { value: ListingPropertyType.Mobile, title: 'Mobile' },
  { value: ListingPropertyType.Coop, title: 'Co-op' },
  { value: ListingPropertyType.Other, title: 'Other' },
]

export const ListingListingStatusList = [
  { value: ListingListingStatus.Active, title: 'Active' },
  { value: ListingListingStatus.Contingent, title: 'Contingent' },
  { value: ListingListingStatus.Pending, title: 'Pending' },
  { value: ListingListingStatus.Sold, title: 'Sold' },
  { value: ListingListingStatus.Withdrawn, title: 'Withdrawn' },
  { value: ListingListingStatus.Cancelled, title: 'Cancelled' },
  { value: ListingListingStatus.Expired, title: 'Expired' },
  { value: ListingListingStatus.ActiveUnderContract, title: 'Active under contract' },
  { value: ListingListingStatus.Hold, title: 'Hold' },
]

export enum ListingStatusEnum {
  Active = 'Active',
  Active_Contingent = 'Active contingent',
  Pending = 'Pending',
  Sold = 'Sold',
  Coming_Soon = 'Coming soon',
  Withdrawn = 'Withdrawn',
  Canceled = 'Canceled',
  Expired = 'Expired',
}

export enum ReportedListingStatus {
  Active = 'Active',
  InActive = 'Inactive',
}

export const ReportedListingStatusList = [
  { value: ReportedListingStatus.Active, title: ReportedListingStatus.Active },
  { value: ReportedListingStatus.InActive, title: ReportedListingStatus.InActive },
]

export enum QuestionType {
  SINGLE = 'single',
  MULTIPLE = 'multi',
}

export const CourseTypeList = [
  { value: CourseType.VIDEO, title: 'Video' },
  { value: CourseType.EBOOK, title: 'Ebook' },
]

export const CourseUserTypeList = [
  { value: TypeOfUser.User, title: 'User' },
  { value: TypeOfUser.KlayTNAgent, title: 'KlayTN Agent' },
]

export const VendorStatusList = [
  { value: 'Active', title: 'Active' },
  { value: 'Inactive', title: 'Inactive' },
]
