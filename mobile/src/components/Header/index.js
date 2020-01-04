import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    SContainer,
    SLogo,
    SLogoImage,
    SLogoTitle,
    SLogoutButton,
    SMenuButton,
} from './styles';

import Logo from '~/assets/logo.png';

import AuthActions from '~/store/ducks/auth';

export default function Header() {
    const dispatch = useDispatch();

    function handleLogOut() {
        dispatch(AuthActions.signOut());
    }

    return (
        <SContainer>
            <SMenuButton onPress={() => {}}>
                <Icon name="exit-to-app" size={20} color="#fff" />
            </SMenuButton>
            <SLogo>
                <SLogoImage source={Logo} />
                <SLogoTitle>GYMPOINT</SLogoTitle>
            </SLogo>
            <SLogoutButton onPress={handleLogOut}>
                <Icon name="exit-to-app" size={20} color="#666" />
            </SLogoutButton>
        </SContainer>
    );
}
