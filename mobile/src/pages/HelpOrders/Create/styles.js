import styled from 'styled-components/native';

import colors from '~/styles/colors';

export const SContainer = styled.KeyboardAvoidingView.attrs({
    enabled: true,
    behavior: 'padding',
    keyboardVerticalOffset: 140,
})`
    background: ${colors.secondary};
    padding: 20px;
`;

export const SInput = styled.TextInput`
    background: ${colors.white};
    border-radius: 4px;
    border: 1px solid ${colors.grey};
    padding: 20px;
    margin-bottom: 20px;
`;
