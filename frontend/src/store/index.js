import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from '~/routes/history';
import createStore from './createStore';
import persistReducer from './persistReducer';
import rootReducer from './ducks';
import rootSaga from './sagas';

const sagaMonitor =
    process.env.NODE_ENV === 'development'
        ? console.tron.createSagaMonitor()
        : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware, routerMiddleware(history)];
const store = createStore(persistReducer(rootReducer(history)), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
