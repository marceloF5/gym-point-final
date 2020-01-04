import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import EnrollmentActions, { EnrollmentTypes } from '../ducks/enrollment';

import { defaultMessageError } from '~/constants/errorMessages';

export function* getEnrollments() {
    try {
        const { data } = yield call(api.get, 'enrollments');
        let { payload } = data;

        payload = payload.map(enrollment => ({
            ...enrollment,
            start_date: format(
                parseISO(enrollment.start_date),
                "dd 'de' MMMM 'de' yyyy",
                {
                    locale: pt,
                }
            ),
            end_date: format(
                parseISO(enrollment.end_date),
                "dd 'de' MMMM 'de' yyyy",
                {
                    locale: pt,
                }
            ),
        }));

        yield put(
            EnrollmentActions.getEnrollmentsSuccess({ ...data, payload })
        );
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* getEnrollment({ id }) {
    try {
        const { data } = yield call(api.get, `enrollments/${id}`);

        let { payload } = data;

        payload = {
            ...payload,
            start_date: parseISO(payload.start_date),
            end_date: parseISO(payload.end_date),
        };

        yield put(EnrollmentActions.getEnrollmentSuccess({ ...data, payload }));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* postEnrollement({ enrollment }) {
    try {
        const {
            data: { toast },
        } = yield call(api.post, `/enrollments`, enrollment);

        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* putEnrollement({ enrollment: { formData, id } }) {
    try {
        const {
            data: { toast },
        } = yield call(api.put, `/enrollments/${id}`, formData);

        yield put(EnrollmentActions.getEnrollmentRequest(id));
        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* deleteEnrollment({ id }) {
    try {
        const {
            data: { toast },
        } = yield call(api.delete, `enrollments/${id}`);

        yield put(EnrollmentActions.getEnrollmentsRequest());
        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export default all([
    takeLatest(EnrollmentTypes.GET_ENROLLMENTS_REQUEST, getEnrollments),
    takeLatest(EnrollmentTypes.GET_ENROLLMENT_REQUEST, getEnrollment),
    takeLatest(EnrollmentTypes.POST_ENROLLMENT_REQUEST, postEnrollement),
    takeLatest(EnrollmentTypes.PUT_ENROLLMENT_REQUEST, putEnrollement),
    takeLatest(EnrollmentTypes.DELETE_ENROLLMENT_REQUEST, deleteEnrollment),
]);
