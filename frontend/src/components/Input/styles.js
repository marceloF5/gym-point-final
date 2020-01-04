import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import colors from '../../styles/colors';

export const SContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    span {
        color: red;
        font-size: 12px;
        margin-top: 2px;
        text-align: start;
    }
`;

export const SLabel = styled.label`
    height: 19px;
    color: ${colors.dark};
    font-size: 14px;
    font-weight: bold;
    letter-spacing: normal;
    text-align: left;
    margin: ${({ label }) => (label ? '20px 0 5px' : '0')};
`;

export const SInputText = styled(Input)`
    width: 100%;
    height: 45px;
    padding-left: 15px;
    background: ${({ disabled }) => (disabled ? colors.grey : colors.write)};
    border: solid 1px ${colors.grey};
    border-radius: 4px;
`;
