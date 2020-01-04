import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    enrollmentsInitial: [],
    getEnrollmentsRequest: [],
    getEnrollmentsSuccess: ['enrollments'],
    getEnrollmentRequest: ['id'],
    getEnrollmentSuccess: ['enrollment'],
    postEnrollmentRequest: ['enrollment'],
    putEnrollmentRequest: ['enrollment'],
    deleteEnrollmentRequest: ['id'],
});

export const EnrollmentTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    enrollments: [],
    enrollment: {},
});

/* Reducers */

export const setEnrollmentsInitial = state =>
    state.merge({ enrollments: [], enrollment: {} });

export const setEnrollments = (state, { enrollments: { payload } }) =>
    state.merge({ enrollments: payload });

export const setEnrollment = (state, { enrollment: { payload } }) =>
    state.merge({ enrollment: payload });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ENROLLMENTS_INITIAL]: setEnrollmentsInitial,
    [Types.GET_ENROLLMENTS_SUCCESS]: setEnrollments,
    [Types.GET_ENROLLMENT_SUCCESS]: setEnrollment,
});
