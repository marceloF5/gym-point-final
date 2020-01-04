import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrderActions from '~/store/ducks/helpOrder';

import Confirm from '~/components/Confirm';
import { SContainer, SWrapperHeader, SWrapperContent } from './styles';

import HelpOrder from './HelpOrder';

export default function HelpOrders() {
    const dispatch = useDispatch();
    const orders = useSelector(state => [...state.helpOrder.orders] || []);

    useEffect(() => {
        dispatch(OrderActions.getOrdersRequest());
    }, []);

    function handleOpenModalAnswer(helpOrder) {
        Confirm({
            component: closeDialog => (
                <HelpOrder
                    helpOrder={helpOrder}
                    closeDialog={closeDialog}
                    dispatch={dispatch}
                />
            ),
        });
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>Help Orders Management</h1>
            </SWrapperHeader>
            <SWrapperContent>
                <ul>
                    <li className="title">{'student'.toUpperCase()}</li>
                    <li className="title">{'question'.toUpperCase()}</li>
                </ul>

                {orders &&
                    orders.map(order => (
                        <ul key={order.id}>
                            <li className="content">{order.student.name}</li>
                            <li className="content">{order.question}</li>

                            <li
                                className="content-actions content-action-answer"
                                onClick={() => handleOpenModalAnswer(order)}
                            >
                                answer
                            </li>
                        </ul>
                    ))}
            </SWrapperContent>
        </SContainer>
    );
}
