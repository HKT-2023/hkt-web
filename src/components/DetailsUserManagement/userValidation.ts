import { TypeOfUser } from 'utils/constants'
import { emailRules, pwRules, passwordValidation, requiredRules } from 'utils/validation'
import * as yup from 'yup'

export const initialErrors = {
  firstName: { isError: false, message: '' },
  lastName: { isError: false, message: '' },
  email: { isError: false, message: '' },
  typeOfUser: { isError: false, message: '' },
  phone: { isError: false, message: '' },
  status: { isError: false, message: '' },
  license: { isError: false, message: '' },
  vendorEmail: { isError: false, message: '' },
  vendorLocation: { isError: false, message: '' },
  vendorType: { isError: false, message: '' },
  agentEmail: { isError: false, message: '' },
  agentName: { isError: false, message: '' },
  primaryContact: { isError: false, message: '' },
  businessName: { isError: false, message: '' },
  password: { isError: false, message: '' },
}

const commonFields = {
  status: yup.string().required(requiredRules),
  typeOfUser: yup.string().required(requiredRules),
  phone: yup.string().required(requiredRules),
  email: yup.string().required(requiredRules).email(emailRules),
  password: yup.string().required(requiredRules).matches(passwordValidation, pwRules),
}

const userSchema = yup.object().shape({
  ...commonFields,
  firstName: yup.string().trim().required(requiredRules),
  lastName: yup.string().trim().required(requiredRules),
})

const agentSchema = yup.object().shape({
  ...commonFields,
  firstName: yup.string().trim().required(requiredRules),
  lastName: yup.string().trim().required(requiredRules),
  license: yup.string().required(requiredRules),
  agentName: yup.string().required(requiredRules),
  agentEmail: yup.string().required(requiredRules),
})

const vendorSchema = yup.object().shape({
  ...commonFields,
  businessName: yup.string().required(requiredRules),
  primaryContact: yup.string().required(requiredRules),
  vendorType: yup.array().min(1, requiredRules),
})

export const userRoleValidate = {
  [TypeOfUser.User]: userSchema,
  [TypeOfUser.Admin]: userSchema,
  [TypeOfUser.KlayTNAgent]: agentSchema,
  [TypeOfUser.NonKlayTNAgent]: agentSchema,
  [TypeOfUser.Vendor]: vendorSchema,
}

export const checkValidate = async (typeValidate: TypeOfUser, userInfo: any) => {
  let isValid = true
  let errors: any = {}

  isValid = await userRoleValidate[typeValidate].isValid(userInfo, {
    abortEarly: false,
  })
  if (!isValid) {
    await userRoleValidate[typeValidate].validate(userInfo, { abortEarly: false }).catch((err) => {
      const errorObject = err.inner.reduce((acc: any, error: any) => {
        return {
          ...acc,
          [error.path]: { isError: true, message: error.message },
        }
      }, {})
      errors = { ...errorObject }
    })
  }
  return {
    isValid,
    errors,
  }
}
