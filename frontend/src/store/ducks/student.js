import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    studentsInitial: [],
    getStudentsRequest: ['filter'],
    getStudentsSuccess: ['students'],
    getStudentRequest: ['id'],
    getStudentSuccess: ['student'],
    putStudentRequest: ['student'],
    postStudentRequest: ['student'],
    deleteStudentRequest: ['id'],
});

export const StudentTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    students: [],
    student: {},
});

/* Reducers */

export const setStudentsInitial = state =>
    state.merge({ students: [], student: {} });

export const setStudents = (state, { students: { payload } }) =>
    state.merge({ students: payload });

export const setStudent = (state, { student: { payload } }) =>
    state.merge({ student: payload });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.STUDENTS_INITIAL]: setStudentsInitial,
    [Types.GET_STUDENTS_SUCCESS]: setStudents,
    [Types.GET_STUDENT_SUCCESS]: setStudent,
});
