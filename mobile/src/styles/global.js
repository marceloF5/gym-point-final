import styled from 'styled-components/native';
import { Platform, SafeAreaView } from 'react-native';
import colors from './colors';

export const SGlobalContainer = styled.KeyboardAvoidingView.attrs(props => ({
    enabled: Platform.OS === 'ios' || !!props.enabled,
    behavior: 'padding',
}))`
    flex: 1;
    background: ${colors.secondary};
    padding: 20px;
`;

export const SEmptyContainer = styled.Text`
    width: 100%;
    color: #ddd;
    font-size: 24px;
    text-align: center;
    margin-top: 24px;
`;

export const SSafeAereaView = styled(SafeAreaView)`
    flex: 1;
`;
