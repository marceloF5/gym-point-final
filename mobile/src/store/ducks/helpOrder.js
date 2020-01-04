import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    helpOrdersRequest: ['id'],
    helpOrdersSuccess: ['orders'],
    helpOrderRequest: ['id'],
    postHelpOrderRequest: ['id', 'question', 'navigation'],
});

export const HelpOrderTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    orders: [],
});

/* Reducers */

export const setHelpOrders = (state, { orders }) => ({
    ...state,
    orders,
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.HELP_ORDERS_SUCCESS]: setHelpOrders,
});
