import { all, call, put, takeLatest } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';
import StudentActions, { StudentTypes } from '../ducks/student';

import { defaultMessageError } from '~/constants/errorMessages';

export function* getStudents({ filter = '' }) {
    try {
        const { data } = yield call(api.get, `students?name=${filter}`);

        yield put(StudentActions.getStudentsSuccess(data));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* getStudent({ id }) {
    try {
        const { data } = yield call(api.get, `students/${id}`);

        yield put(StudentActions.getStudentSuccess(data));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* postStudent({ student }) {
    try {
        const {
            data: { toast },
        } = yield call(api.post, `/students`, student);

        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* putStudent({ student: { formData, id } }) {
    try {
        const {
            data: { toast },
        } = yield call(api.put, `/students/${id}`, formData);

        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* deleteStudent({ id }) {
    try {
        const {
            data: { toast },
        } = yield call(api.delete, `students/${id}`);

        yield put(StudentActions.getStudentsRequest());
        yield put(toastrActions.add(toast));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export default all([
    takeLatest(StudentTypes.GET_STUDENTS_REQUEST, getStudents),
    takeLatest(StudentTypes.GET_STUDENT_REQUEST, getStudent),
    takeLatest(StudentTypes.POST_STUDENT_REQUEST, postStudent),
    takeLatest(StudentTypes.PUT_STUDENT_REQUEST, putStudent),
    takeLatest(StudentTypes.DELETE_STUDENT_REQUEST, deleteStudent),
]);
