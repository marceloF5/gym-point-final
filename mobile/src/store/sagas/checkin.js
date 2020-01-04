import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';

import defaultMessageError from '~/constants/errorMessages';

import api from '~/services/api';
import CheckinActions, { CheckinTypes } from '../ducks/checkin';

export function* checkinsRequest({ id }) {
    try {
        const { data } = yield call(api.get, `/students/${id}/checkins`);
        let { payload } = data;

        payload = payload.map((checkin, index) => ({
            ...checkin,
            formattedId: `Check-in #${payload.length - index}`,
            formattedTime: formatRelative(
                parseISO(checkin.created_at),
                new Date()
            ),
        }));

        yield put(CheckinActions.checkInsSuccess(payload));
    } catch (err) {
        const { data } = err.response;
        const { toast } = data;
        const { title, message } = toast;

        Alert.alert(
            title || defaultMessageError.title,
            message || defaultMessageError.message
        );
    }
}

export function* checkinRequest({ id }) {
    try {
        const { data } = yield call(api.post, `/students/${id}/checkins`);
        const { toast } = data;
        const { title, message } = toast;

        yield put(CheckinActions.checkInsRequest(id));

        Alert.alert(
            title || defaultMessageError.title,
            message || defaultMessageError.message
        );
    } catch (err) {
        const { data } = err.response;
        const { toast } = data;
        const { title, message } = toast;

        Alert.alert(
            title || defaultMessageError.title,
            message || defaultMessageError.message
        );
    }
}

export default all([
    takeLatest(CheckinTypes.CHECK_INS_REQUEST, checkinsRequest),
    takeLatest(CheckinTypes.CHECK_IN_REQUEST, checkinRequest),
]);
