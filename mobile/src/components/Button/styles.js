import styled, { css } from 'styled-components/native';
import colors from '~/styles/colors';

const defaultButton = css`
    width: 100%;
    height: 45px;
`;

export const STouchableOpacity = styled.TouchableOpacity`
     ${({ size }) => size === '' && defaultButton}

    background-color: ${({ type }) =>
        type === 'success' ? colors.grey : colors.primary};
    border: none;
    border-radius: 4px;
    color: ${colors.white};
    font-size: 16px;
    font-weight: bold;
    line-height: 1.31;
    padding: 0 10px;
    text-align: left;

    display: flex;
    align-items: center;
    justify-content: space-around;

    &:hover {
        opacity: 0.7;
    }
    &:active {
        opacity: 0.2;
    }
`;

export const SText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: ${colors.white};
    padding: 13px 26px;
`;
