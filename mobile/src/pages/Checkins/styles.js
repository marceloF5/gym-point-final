import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const SCheckins = styled.FlatList`
    margin-top: 33px;
`;

export const SCheckin = styled.View`
    background: ${colors.white};
    border-radius: 4px;
    border: 1px solid ${colors.grey};
    padding: 15px 20px;

    flex-direction: row;
    justify-content: space-between;

    margin-bottom: 10px;
`;

export const SCheckinId = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${colors.darkGrey};
`;

export const SCheckinTime = styled.Text`
    font-size: 14px;
    color: ${colors.dark};
`;
