import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';
import colors from './styles/colors';

import App from './App';

import { store, persistor } from './store';

// import SafeAreaView from '~/components/SafeAreaView';

export default function Index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={colors.white}
                />

                <App />
            </PersistGate>
        </Provider>
    );
}
