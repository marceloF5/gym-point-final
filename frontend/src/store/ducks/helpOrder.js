import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
    ordersInitial: [],
    getOrdersRequest: [],
    getOrdersSuccess: ['orders'],
    // postPlanRequest: ['plan'],
    putOrderRequest: ['order', 'id'],
    // deletePlanRequest: ['id'],
});

export const OrderTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
    orders: [],
});

/* Reducers */

export const setOrdersInitial = state => state.merge({ orders: [] });

export const setOrders = (state, { orders: { payload } }) =>
    state.merge({ orders: payload });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ORDERS_INITIAL]: setOrdersInitial,
    [Types.GET_ORDERS_SUCCESS]: setOrders,
});
