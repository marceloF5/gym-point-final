import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';

import defaultMessageError from '~/constants/errorMessages';

import api from '~/services/api';
import HelpOrderActions, { HelpOrderTypes } from '../ducks/helpOrder';

export function* helpOrdersRequest({ id }) {
    console.tron.log(id);
    try {
        const { data } = yield call(api.get, `/students/${id}/help-orders`);
        let { payload } = data;

        payload = payload.map(helpOrder => ({
            ...helpOrder,
            time: formatRelative(parseISO(helpOrder.createdAt), new Date()),
        }));

        yield put(HelpOrderActions.helpOrdersSuccess(payload));
    } catch (err) {
        console.tron.log(err);
        const { data } = err.response;
        const { toast } = data;
        const { title, message } = toast;

        Alert.alert(
            title || defaultMessageError.title,
            message || defaultMessageError.message
        );
    }
}

export function* postHelpOrderRequest({ id, question, navigation }) {
    try {
        const { data } = yield call(api.post, `/students/${id}/help-orders`, {
            question,
        });
        const { toast } = data;
        const { title, message } = toast;

        Alert.alert(
            title || defaultMessageError.title,
            message || defaultMessageError.message
        );
        navigation.goBack();
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
    takeLatest(HelpOrderTypes.HELP_ORDERS_REQUEST, helpOrdersRequest),
    takeLatest(HelpOrderTypes.POST_HELP_ORDER_REQUEST, postHelpOrderRequest),
]);
