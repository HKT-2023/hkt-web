import {
    all,
    fork,
    put,
    takeLatest,
    select
} from 'redux-saga/effects';
import {get} from 'lodash';
import {BOOT, bootFinished} from './';
import {redirect} from 'redux-first-router';
import {
    selectRoutesMap,
    selectRouteType
} from '../routing';
import {
    fetchUserInfor
} from '../auth';

function* watchAppBoot() {
    yield takeLatest(BOOT, function* () {
        const {location} = yield select();
        const routesMap = yield select(selectRoutesMap);
        const routeType = yield select(selectRouteType);
        const currentRoute = routesMap[routeType];
        if (!currentRoute.requiresAuth) {
            yield put(bootFinished());
            yield put(redirect({
                type: location.type,
                payload: location.payload
            }));
        } else {
            const token = get(location, 'query.token', '');
            yield put(fetchUserInfor(token));
        }
    });
}

export default function* auth() {
    yield all([
        fork(watchAppBoot)
    ]);
}
