import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdAddCircleOutline, MdBackspace } from 'react-icons/md';

import handleChangeRoute from '~/utils/handle-change-route';
import PlanActions from '~/store/ducks/plan';

import { SContainer, SWrapperContent, SWrapperHeader } from './styles';

import Button from '~/components/Button';
import Confirm from '~/components/Confirm';
import InputText from '~/components/Input';

const schema = Yup.object().shape({
    title: Yup.string().required('Required field'),

    duration: Yup.number()
        .typeError('Field must be a number')
        .required('Required field'),
    price: Yup.number()
        .typeError('Field must be a number')
        .required('Required field'),
});

export default function Plan({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();

    const [duration, setDuration] = useState(0);
    const [price, setPrice] = useState(0);
    const plan = useSelector(state => state.plan.plan || {});

    useEffect(() => {
        if (id) {
            dispatch(PlanActions.getPlanRequest(id));
        }

        return () => {
            dispatch(PlanActions.plansInitial());
        };
    }, []);

    useEffect(() => {
        setDuration(plan.duration);
        setPrice(plan.price);
    }, [plan]);

    const totalPrice = useMemo(() => {
        return ((duration || 0) * (price || 0)).toFixed(2);
    }, [duration, price]);

    function handleUpdatePlan(formData) {
        Confirm({
            title: 'Update Data',
            onConfirm: () =>
                dispatch(PlanActions.putPlanRequest({ formData, id })),
            content: <p>Would you really like to update data?</p>,
        });
    }

    function handleCreatePlan(formData) {
        dispatch(PlanActions.postPlanRequest(formData));
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>{id ? 'Edit Plan' : 'Add Plan'}</h1>
                <div className="actions-container">
                    <Button
                        type="success"
                        onClick={() => handleChangeRoute('/plans')}
                    >
                        <MdBackspace size="20" />
                        {'back'.toUpperCase()}
                    </Button>
                </div>
            </SWrapperHeader>
            <SWrapperContent>
                {!Object.keys(plan).length && (
                    <Form schema={schema} onSubmit={handleCreatePlan}>
                        <InputText label="Title" name="title" />
                        <div className="input-group">
                            <InputText
                                type="number"
                                label="duration (months)"
                                name="duration"
                                onChange={e => setDuration(e.target.value)}
                            />
                            <InputText
                                type="number"
                                label="monthly price"
                                name="price"
                                onChange={e => setPrice(e.target.value)}
                            />
                            <InputText
                                label="total price"
                                name="totalPrice"
                                value={totalPrice}
                                disabled
                            />
                        </div>

                        <Button type="submit" onClick={() => {}}>
                            <MdAddCircleOutline size="20" />
                            {'save'.toUpperCase()}
                        </Button>
                    </Form>
                )}
                {!!Object.keys(plan).length && (
                    <Form
                        schema={schema}
                        initialData={plan}
                        onSubmit={handleUpdatePlan}
                    >
                        <InputText label="Title" name="title" />
                        <div className="input-group">
                            <InputText
                                type="number"
                                label="duration (months)"
                                name="duration"
                                onChange={e => setDuration(e.target.value)}
                            />
                            <InputText
                                type="number"
                                label="monthly price"
                                name="price"
                                onChange={e => setPrice(e.target.value)}
                            />
                            <InputText
                                label="total price"
                                name="totalPrice"
                                value={totalPrice}
                                disabled
                            />
                        </div>

                        <Button type="submit" onClick={() => {}}>
                            <MdAddCircleOutline size="20" />
                            {'save'.toUpperCase()}
                        </Button>
                    </Form>
                )}
            </SWrapperContent>
        </SContainer>
    );
}

Plan.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

Plan.defaultProps = {
    match: { params: { id: '' } },
};
