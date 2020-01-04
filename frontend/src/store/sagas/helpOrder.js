import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';
import OrderActions, { OrderTypes } from '../ducks/helpOrder';

import { defaultMessageError } from '~/constants/errorMessages';

export function* getOrders() {
    try {
        const { data } = yield call(api.get, '/help-orders');

        yield put(OrderActions.getOrdersSuccess(data));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* putOrder({ order: { answer, id } }) {
    try {
        const {
            data: { toast },
        } = yield call(api.put, `help-orders/${id}/answer`, { answer });

        yield put(OrderActions.getOrdersRequest());
        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

// export function* getOrder({ id }) {
//     try {
//         const { data } = yield call(api.get, `plans/${id}`);
//         const { payload: plan } = data;

//         yield put(
//             OrderActions.getOrderSuccess({
//                 ...data,
//                 payload: {
//                     ...plan,
//                     totalPrice: plan.duration * plan.price,
//                 },
//             })
//         );
//     } catch (err) {
//         const {
//             data: { toast },
//         } = err.response;
//         yield put(toastrActions.add(toast || defaultMessageError));
//     }
// }

export default all([
    takeLatest(OrderTypes.GET_ORDERS_REQUEST, getOrders),
    takeLatest(OrderTypes.PUT_ORDER_REQUEST, putOrder),
]);
