import React, { useState } from 'react';
// import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { SContainer, SInput } from './styles';

import Button from '~/components/Button';
import Header from '~/components/Header';

import HelpOrderActions from '~/store/ducks/helpOrder';

export default function Create({ navigation }) {
    const dispatch = useDispatch();

    const student = useSelector(state => state.auth.user);
    const [question, setQuestion] = useState('');

    async function handleSubmit() {
        dispatch(
            HelpOrderActions.postHelpOrderRequest(
                student.id,
                question,
                navigation
            )
        );
    }

    return (
        <>
            <Header />
            <SContainer>
                <SInput
                    placeholder="Type your help order"
                    multiline
                    numberOfLines={15}
                    textAlignVertical="top"
                    value={question}
                    onChangeText={setQuestion}
                />
                <Button onPress={handleSubmit}>
                    {'send help order'.toUpperCase()}
                </Button>
            </SContainer>
        </>
    );
}

Create.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func,
    }).isRequired,
};
