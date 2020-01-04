import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';

import { reducer as auth } from './auth';
import { reducer as enrollment } from './enrollment';
import { reducer as helpOrder } from './helpOrder';
import { reducer as plan } from './plan';
import { reducer as student } from './student';

export default history =>
    combineReducers({
        auth,
        enrollment,
        helpOrder,
        plan,
        student,
        toastr,
        router: connectRouter(history),
    });
