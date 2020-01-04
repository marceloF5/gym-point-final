import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    signInRequest: ['id'],
    signInSuccess: ['user'],
    signOut: [],
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    signed: false,
    user: null,
});

/* Reducers */

export const setSignIn = (state, { user }) => ({
    ...state,
    signed: true,
    user,
});

export const setSignOut = state => ({
    ...state,
    signed: false,
    user: null,
    checkins: [],
    orders: [],
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIGN_IN_SUCCESS]: setSignIn,
    [Types.SIGN_OUT]: setSignOut,
});
