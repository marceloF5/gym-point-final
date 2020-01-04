import React from 'react';
import { Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import AuthActions from '~/store/ducks/auth';
import Logo from '~/assets/logo.svg';
import Button from '~/components/Button';
import InputText from '~/components/Input';
import { SContainer, SLogo, SLogoDescribe } from '../styles';

export default function SignIn() {
    const dispath = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispath(AuthActions.signInRequest(email, password));
    }

    return (
        <SContainer>
            <SLogo src={Logo} alt="Logo" />
            <SLogoDescribe>GYMPOINT</SLogoDescribe>
            <Form onSubmit={handleSubmit}>
                <InputText
                    label="email"
                    name="email"
                    placeholder="Type your email"
                />
                <InputText
                    label="password"
                    type="password"
                    name="password"
                    placeholder="Type your password"
                />
                <Button type="submit" size="xl">
                    {loading ? '...Loading' : 'Access'}
                </Button>
            </Form>
        </SContainer>
    );
}
