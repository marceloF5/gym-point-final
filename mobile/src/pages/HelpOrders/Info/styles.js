import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const SCard = styled.View`
    background: ${colors.white};
    border-radius: 4px;
    border: 1px solid ${colors.grey};
    padding: 20px;
`;

export const SQuestionHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
`;

export const STitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${colors.dark};
    margin-bottom: 16px;
`;

export const SQuestionTime = styled.Text`
    font-size: 14px;
    color: ${colors.darkGrey};
`;

export const SQuestion = styled.Text`
    font-size: 14px;
    color: ${colors.darkGrey};
    margin-bottom: 20px;
`;

export const SAnswer = styled.Text`
    font-size: 14px;
    color: ${colors.darkGrey};
`;

export const SNotAnswer = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${colors.grey};
    margin-bottom: 16px;
`;
