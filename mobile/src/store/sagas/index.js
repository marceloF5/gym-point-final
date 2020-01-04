import { all } from 'redux-saga/effects';

import auth from './auth';
import checkin from './checkin';
import helpOrder from './helpOrder';

export default function* rootSaga() {
    yield all([auth, checkin, helpOrder]);
}
