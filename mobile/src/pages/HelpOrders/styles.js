import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const SHelpOrders = styled.FlatList`
    margin-top: 33px;
`;

export const SHelpOrder = styled.TouchableOpacity`
    background: ${colors.white};
    border-radius: 4px;
    border: 1px solid ${colors.grey};
    margin-bottom: 10px;
    padding: 20px;
`;

export const SHelpOrderHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const SAnswered = styled.Text`
    color: ${props => (props.disabled ? colors.dark : '#42CB59')};
    font-size: 14px;
    font-weight: bold;
`;

export const SHelpOrderTime = styled.Text`
    color: ${colors.darkGrey};
    font-size: 14px;
`;

export const SQuestion = styled.Text.attrs({
    numberOfLines: 3,
})`
    color: ${colors.darkGrey};
    font-size: 14px;
    margin-top: 16px;
`;
