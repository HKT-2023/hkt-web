import { fork, all } from 'redux-saga/effects'
import routeSaga from '../modules/routing/sagas.js'
import appSaga from '../modules/app/sagas.js'
import authSaga from '../modules/auth/sagas.js'
import forgotPassword from '../modules/forgotPassword/sagas.js'
import oneSignalSaga from 'state/modules/onesignal/sagas.js'
import loadNotificationList from 'state/modules/notification/sagas.js'

export default function* sagas() {
  yield all([
    fork(routeSaga),
    fork(appSaga),
    fork(authSaga),
    fork(forgotPassword),
    fork(oneSignalSaga),
    fork(loadNotificationList),
  ])
}
