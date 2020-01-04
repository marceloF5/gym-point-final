import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    checkInsRequest: ['id'],
    checkInsSuccess: ['checkins'],
    checkInRequest: ['id'],
});

export const CheckinTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    checkins: [],
});

/* Reducers */

export const setCheckins = (state, { checkins }) => ({
    ...state,
    checkins,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHECK_INS_SUCCESS]: setCheckins,
});
