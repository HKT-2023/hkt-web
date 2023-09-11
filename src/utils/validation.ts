// Password at least 8 characters, 1 uppercase, 1 special character, 1 number,
export const passwordValidation =
  /^(?=.*[a-z0-9])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*.]{8,255}$/

export const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const pwRules = 'At least 8 characters, 1 uppercase, 1 special character, 1 number'
export const confirmPassRules = 'Confirmation password does not match'
export const requiredRules = 'The required field must be filled in'
export const emailRules = 'The email field is invalid'
export const commissionRules = 'The commission could be less than or equal to 100'
export const inputRules = 'Please input the valid value'
export const createCourseMessage = 'The course created successfully.'
export const updateCourseMessage = 'The course updated successfully.'
export const locationVideoRules =
  'The quiz location is greater than the number of videos. Please input the suitable number.'
export const locationEbookRules =
  'The quiz location is greater than the number of ebook pages. Please input the suitable number.'
