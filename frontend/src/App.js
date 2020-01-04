import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';
import history from '~/routes/history';

import '~/config/ReactotronConfig';

import GlobalStyle from '~/styles/global';
import Routes from '~/routes';

import { store, persistor } from '~/store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Routes />
                    <ReduxToastr
                        timeOut={2000}
                        progressBar
                        closeOnToastrClick
                        showCloseButton
                    />
                    <GlobalStyle />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
