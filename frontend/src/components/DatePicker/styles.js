import styled from 'styled-components';

import colors from '~/styles/colors';

export const DatePicketInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    label {
        height: 19px;
        color: #444444;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: normal;
        text-align: left;
        margin: ${({ label }) => (!label ? '20px 0 5px' : '0')};
    }
    div.react-datepicker-wrapper {
        margin-top: 5px;
        width: 100%;
    }
    input {
        border: 1px solid ${colors.grey};
        border-radius: 4px;
        height: 45px;
        padding: 0 15px;
        color: ${colors.dark};
        width: 100%;
        &::placeholder {
            color: ${colors.grey};
            height: 19px;
            margin: 0 0 10px;
            font-size: 16px;
            line-height: 19px;
        }
    }
`;
