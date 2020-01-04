import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';

import { SContainer } from './styles';

import TextInput from '~/components/Input';
import Button from '~/components/Button';

import OrderActions from '~/store/ducks/helpOrder';

const schema = Yup.object().shape({
    answer: Yup.string().required('Required field'),
});

export default function HelpOrder({ helpOrder, closeDialog, dispatch }) {
    async function handleUpdateHelpOrder({ answer }) {
        dispatch(OrderActions.putOrderRequest({ answer, id: helpOrder.id }));
        closeDialog();
    }

    return (
        <SContainer>
            <Form schema={schema} onSubmit={handleUpdateHelpOrder}>
                <strong>{'question from student'.toUpperCase()}</strong>
                <p>{helpOrder.question}</p>
                <TextInput
                    type="text"
                    multiline
                    rows="6"
                    label="answer"
                    name="answer"
                />
                <Button type="submit">{'save answer'.toUpperCase()}</Button>
            </Form>
        </SContainer>
    );
}

HelpOrder.propTypes = {
    helpOrder: PropTypes.shape({
        id: PropTypes.number,
        question: PropTypes.string,
    }).isRequired,
    closeDialog: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};
