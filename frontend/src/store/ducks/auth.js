import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    signInRequest: ['email', 'password'],
    signInSuccess: ['user', 'token'],
    signOut: null,
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    signedIn: !!localStorage.getItem('@gympoint:token'),
    token: localStorage.getItem('@gympoint:token') || null,
    user: JSON.parse(localStorage.getItem('@gympoint:user')) || null,
});

/* Reducers */

export const setSignIn = (state, { user, token }) => ({
    ...state,
    signedIn: true,
    token,
    user,
});

export const setSignOut = state => ({
    ...state,
    signedIn: false,
    token: null,
    user: {},
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SIGN_IN_SUCCESS]: setSignIn,
    [Types.SIGN_OUT]: setSignOut,
});
