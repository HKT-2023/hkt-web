import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import appReducer, { namespace as appNamespace } from './modules/app'
import authReducer, { namespace as authNamespace } from './modules/auth'
import homeReducer, { namespace as homeNamespace } from './modules/home'
import userManagementReducer, {
  namespace as userManagementNamespace,
} from './modules/userManagement'
import createUserManagementReducer, {
  namespace as createUserManagementNamespace,
} from './modules/createUserManagement'
import forgotPasswordReducer, {
  namespace as forgotPasswordNamespace,
} from './modules/forgotPassword'
import userManagementUpdateReducer, {
  namespace as userManagementUpdateNamespace,
} from './modules/userManagementUpdate'

const RootReducer = (extraReducers) =>
  combineReducers({
    [authNamespace]: authReducer,
    [appNamespace]: appReducer,
    form: formReducer,
    [homeNamespace]: homeReducer,
    [userManagementNamespace]: userManagementReducer,
    [createUserManagementNamespace]: createUserManagementReducer,
    [forgotPasswordNamespace]: forgotPasswordReducer,
    [userManagementUpdateNamespace]: userManagementUpdateReducer,
    [userManagementUpdateNamespace]: userManagementUpdateReducer,
    ...extraReducers,
  })
export default RootReducer
