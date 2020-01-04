import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import defaultMessageError from '~/constants/errorMessages';

import api from '~/services/api';
import AuthActions, { AuthTypes } from '../ducks/auth';

export function* signIn({ id }) {
    try {
        const {
            data: { payload },
        } = yield call(api.get, `/students/${id}`);

        yield put(AuthActions.signInSuccess(payload));
    } catch (err) {
        const {
            data: {
                toast: { title, message },
            },
        } = err.response;
        Alert.alert(
            title || defaultMessageError.title,
            message || defaultMessageError.message
        );
    }
}

export default all([takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn)]);
