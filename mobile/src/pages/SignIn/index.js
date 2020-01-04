import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import { SContainer, SLogo, SLogoTitle, SInput, SButton } from './styles';
import Logo from '~/assets/logo.png';

import AuthActions from '~/store/ducks/auth';

export default function SignIn() {
    const [id, setStudentId] = useState(null);
    const dispatch = useDispatch();

    async function handleSubmit() {
        if (id) {
            dispatch(AuthActions.signInRequest(id));
        } else {
            Alert.alert('ID is Required', 'Type your student ID!');
        }
    }

    return (
        <SContainer>
            <SLogo source={Logo} />
            <SLogoTitle>{'gympoint'.toUpperCase()}</SLogoTitle>
            <SInput
                placeholder="Type your ID"
                autoCorrect={false}
                keyboardType="numeric"
                value={id}
                onChangeText={setStudentId}
                autoCapitalize="none"
                returnKeyType="send"
            />
            <SButton onPress={handleSubmit}>{'access'.toUpperCase()}</SButton>
        </SContainer>
    );
}
