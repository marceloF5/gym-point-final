import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';

import api from '~/services/api';
import AuthActions, { AuthTypes } from '../ducks/auth';

import { defaultMessageError } from '~/constants/errorMessages';

export function* signIn({ email, password }) {
    try {
        const { data } = yield call(api.post, 'sessions', {
            email,
            password,
        });
        const { user, token } = data;

        yield put(AuthActions.signInSuccess(user, token));
        yield put(push('/students'));
    } catch (err) {
        const {
            data: { toast },
        } = err.response;
        yield put(toastrActions.add(toast || defaultMessageError));
    }
}

export function* signOut() {
    yield put(push('/signin'));
}

export default all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
