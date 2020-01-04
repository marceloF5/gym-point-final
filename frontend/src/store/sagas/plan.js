import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';
import PlanActions, { PlanTypes } from '../ducks/plan';

import { defaultMessageError } from '~/constants/errorMessages';

export function* getPlans() {
    try {
        const { data } = yield call(api.get, 'plans');

        yield put(PlanActions.getPlansSuccess(data));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* getPlan({ id }) {
    try {
        const { data } = yield call(api.get, `plans/${id}`);
        const { payload: plan } = data;

        yield put(
            PlanActions.getPlanSuccess({
                ...data,
                payload: {
                    ...plan,
                    totalPrice: plan.duration * plan.price,
                },
            })
        );
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* postPlan({ plan }) {
    try {
        const {
            data: { toast },
        } = yield call(api.post, `/plans`, plan);

        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* putPlan({ plan: { formData, id } }) {
    try {
        const {
            data: { toast },
        } = yield call(api.put, `/plans/${id}`, formData);

        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* deletePlan({ id }) {
    try {
        const {
            data: { toast },
        } = yield call(api.delete, `plans/${id}`);

        yield put(PlanActions.getPlansRequest());
        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export default all([
    takeLatest(PlanTypes.GET_PLANS_REQUEST, getPlans),
    takeLatest(PlanTypes.GET_PLAN_REQUEST, getPlan),
    takeLatest(PlanTypes.POST_PLAN_REQUEST, postPlan),
    takeLatest(PlanTypes.PUT_PLAN_REQUEST, putPlan),
    takeLatest(PlanTypes.DELETE_PLAN_REQUEST, deletePlan),
]);
