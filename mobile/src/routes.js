import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Checkins from '~/pages/Checkins';
import HelpOrders from '~/pages/HelpOrders';
import HelpOrdersInfo from '~/pages/HelpOrders/Info';
import HelpOrdersCreate from '~/pages/HelpOrders/Create';
import SignIn from '~/pages/SignIn';

import colors from '~/styles/colors';

const BottomTabPages = {
    Checkins: {
        screen: Checkins,
        navigationOptions: {
            tabBarLabel: 'Check-ins',
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ tintColor }) => (
                <Icon name="edit" size={30} color={tintColor} />
            ),
        },
    },
    HelpOrders: {
        screen: createStackNavigator(
            {
                HelpOrders,
                HelpOrdersInfo,
                HelpOrdersCreate,
            },
            {
                defaultNavigationOptions: {
                    headerTransparent: true,
                    headerBackImage: () => (
                        <Icon
                            name="chevron-left"
                            size={24}
                            color={colors.black}
                        />
                    ),
                    headerLeftContainerStyle: {
                        marginBottom: 8,
                    },
                },
            }
        ),
        navigationOptions: {
            tabBarLabel: 'Help Order',
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ tintColor }) => (
                <Icon name="live-help" size={30} color={tintColor} />
            ),
        },
    },
};

const BottomTabOptions = {
    resetOnBlur: true,
    tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.darkGrey,
        labelStyle: {
            fontSize: 14,
        },
        style: {
            backgroundColor: colors.white,
            padding: 15,
            height: 70,
        },
    },
};

export default (signedIn = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                SignIn,
                App: createBottomTabNavigator(BottomTabPages, BottomTabOptions),
            },
            { initialRouteName: signedIn ? 'App' : 'SignIn' }
        )
    );
