import styled, { css } from 'styled-components';
import colors from '~/styles/colors';

const smButton = css`
    width: 70px;
    height: 45px;
`;
const mdButton = css`
    width: 140px;
    height: 45px;
`;
const lgButton = css``;
const xlButton = css`
    width: 300px;
    height: 45px;
`;

export const SButton = styled.button`
    ${({ size }) =>
        (size === 'sm' && smButton) ||
        (size === 'md' && mdButton) ||
        (size === 'lg' && lgButton) ||
        (size === 'xl' && xlButton)}

    background-color: ${({ type }) =>
        type === 'success' ? colors.grey : colors.primary};
    border: none;
    border-radius: 4px;
    color: ${colors.white};
    font-size: 16px;
    font-weight: bold;
    line-height: 1.31;
    letter-spacing: normal;
    padding: 0 10px;
    text-align: left;
    transition: opacity 0.2s;

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
