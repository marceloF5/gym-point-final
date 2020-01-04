import React, { useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import handleChangeRoute from '~/utils/handle-change-route';
import PlanActions from '~/store/ducks/plan';

import Button from '~/components/Button';
import Confirm from '~/components/Confirm';
import InputText from '~/components/Input';
import { SContainer, SWrapperHeader, SWrapperContent } from './styles';

export default function Plans() {
    const dispatch = useDispatch();
    const plans = useSelector(state => [...state.plan.plans] || []);

    useEffect(() => {
        dispatch(PlanActions.getPlansRequest());
    }, []);

    function handleRemovePlan(plan) {
        Confirm({
            title: 'Delete plan',
            onConfirm: () => dispatch(PlanActions.deletePlanRequest(plan.id)),
            content: (
                <p>
                    Are you sure want to remove a plan
                    <strong>{plan.name} </strong>?
                </p>
            ),
        });
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>Plans Management</h1>
                <div className="actions-container">
                    <Button onClick={() => handleChangeRoute('plans/create')}>
                        <MdAddCircleOutline size="20" />
                        {'add'.toUpperCase()}
                    </Button>
                </div>
            </SWrapperHeader>
            <SWrapperContent>
                <ul>
                    <li className="title">{'title'.toUpperCase()}</li>
                    <li className="title">{'duration'.toUpperCase()}</li>
                    <li className="title">{'value'.toUpperCase()}</li>
                </ul>

                {plans &&
                    plans.map(plan => (
                        <ul key={plan.id}>
                            <li className="content">{plan.title}</li>
                            <li className="content">
                                {plan.duration !== 1
                                    ? `${plan.duration} months`
                                    : `${plan.duration} month`}{' '}
                            </li>
                            <li className="content">R$ {plan.price}</li>
                            <li
                                className="content-actions content-action-edit"
                                onClick={() =>
                                    handleChangeRoute(`/plans/${plan.id}`)
                                }
                            >
                                edit
                            </li>
                            <li
                                className="content-actions content-action-delete"
                                onClick={() => handleRemovePlan(plan)}
                            >
                                remove
                            </li>
                        </ul>
                    ))}
            </SWrapperContent>
        </SContainer>
    );
}
