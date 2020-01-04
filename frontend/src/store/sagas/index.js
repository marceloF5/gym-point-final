import { all } from 'redux-saga/effects';

import auth from './auth';
import enrollments from './enrollment';
import helpOrders from './helpOrder';
import plans from './plan';
import students from './student';

export default function* rootSaga() {
    yield all([auth, enrollments, helpOrders, plans, students]);
}
