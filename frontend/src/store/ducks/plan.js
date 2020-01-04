import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    plansInitial: [],
    getPlansRequest: [],
    getPlansSuccess: ['plans'],
    getPlanRequest: ['id'],
    getPlanSuccess: ['plan'],
    postPlanRequest: ['plan'],
    putPlanRequest: ['plan'],
    deletePlanRequest: ['id'],
});

export const PlanTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    plans: [],
    plan: {},
});

/* Reducers */

export const setPlanInitial = state => state.merge({ plans: [], plan: {} });

export const setPlans = (state, { plans: { payload } }) =>
    state.merge({ plans: payload });

export const setPlan = (state, { plan: { payload } }) => {
    return state.merge({ plan: payload });
};

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PLANS_INITIAL]: setPlanInitial,
    [Types.GET_PLANS_SUCCESS]: setPlans,
    [Types.GET_PLAN_SUCCESS]: setPlan,
});
