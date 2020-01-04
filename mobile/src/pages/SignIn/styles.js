import { Platform } from 'react-native';
import styled from 'styled-components/native';
import colors from '~/styles/colors';

import Button from '~/components/Button';

export const SContainer = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    justify-content: center;
    align-items: center;

    background: ${colors.white};
    padding: 25px;
`;

export const SLogo = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 120px;
`;

export const SLogoTitle = styled.Text`
    color: ${colors.primary};
    font-size: 24px;
    font-weight: bold;
`;

export const SInput = styled.TextInput`
    border: 1px solid ${colors.grey};
    border-radius: 4px;
    width: 100%;
    margin: 20px 0;
    padding: 13px 20px;
`;

export const SButton = styled(Button)``;
