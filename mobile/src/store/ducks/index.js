import { combineReducers } from 'redux';

import { reducer as auth } from './auth';
import { reducer as checkin } from './checkin';
import { reducer as helpOrder } from './helpOrder';

export default () =>
    combineReducers({
        auth,
        checkin,
        helpOrder,
    });
