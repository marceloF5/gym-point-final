import styled from 'styled-components';
import Select from 'react-select';
import colors from '~/styles/colors';

export const SContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    & > div > div:nth-child(1),
    & > div > div:nth-child(2) {
        border: 1px solid ${colors.grey};
        border-radius: 4px;
        padding: 0 15px;
        color: ${colors.grey};
        width: 100%;
        height: 45px;
        &::placeholder {
            color: ${colors.grey};
            height: 19px;
            margin: 0 0 10px;
            font-size: 16px;
            line-height: 19px;
        }
    }
    span {
        color: ${colors.grey};
        align-self: flex-start;
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

export const SSelectInput = styled(Select)`
    width: 100%;
    background: ${colors.white};
`;
