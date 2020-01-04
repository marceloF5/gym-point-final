import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
    SHelpOrders,
    SHelpOrder,
    SHelpOrderHeader,
    SAnswered,
    SHelpOrderTime,
    SQuestion,
} from './styles';

import Button from '~/components/Button';
import Header from '~/components/Header';
import { SGlobalContainer, SEmptyContainer } from '~/styles/global';

import HelpOrderActions from '~/store/ducks/helpOrder';

export default function HelpOrders({ navigation }) {
    const dispatch = useDispatch();

    const student = useSelector(state => state.auth.user);
    const helpOrders = useSelector(state => state.helpOrder.orders);

    function loadHelpOrders() {
        console.tron.log('oi');
        dispatch(HelpOrderActions.helpOrdersRequest(student.id));
    }

    useEffect(() => {
        loadHelpOrders();
    }, []);

    useEffect(() => {
        navigation.addListener('didFocus', () => {
            loadHelpOrders();
        });
    }, [loadHelpOrders, navigation]);

    return (
        <>
            <Header />
            <SGlobalContainer>
                <Button onPress={() => navigation.navigate('HelpOrdersCreate')}>
                    {'new help order'.toUpperCase()}
                </Button>
                <SHelpOrders
                    data={helpOrders}
                    keyExtractor={helpOrder => String(helpOrder.id)}
                    renderItem={({ item }) => (
                        <SHelpOrder
                            onPress={() =>
                                navigation.navigate('HelpOrdersInfo', {
                                    helpOrder: item,
                                })
                            }
                        >
                            <SHelpOrderHeader>
                                {item.answer ? (
                                    <SAnswered>Answered</SAnswered>
                                ) : (
                                    <SAnswered disabled>
                                        Not answer yet
                                    </SAnswered>
                                )}
                                <SHelpOrderTime>{item.time}</SHelpOrderTime>
                            </SHelpOrderHeader>
                            <SQuestion>{item.question}</SQuestion>
                        </SHelpOrder>
                    )}
                    refreshing={!helpOrders}
                    onRefresh={loadHelpOrders}
                    ListEmptyComponent={
                        <SEmptyContainer>
                            There are not help order requested yet
                        </SEmptyContainer>
                    }
                />
            </SGlobalContainer>
        </>
    );
}

HelpOrders.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
        addListener: PropTypes.func,
    }).isRequired,
};
