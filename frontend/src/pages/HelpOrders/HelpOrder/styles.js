import styled from 'styled-components';
import colors from '~/styles/colors';

export const SContainer = styled.div`
    width: 800px;

    border-radius: 4px;
    background-color: #ffffff;
    padding: 30px 30px;

    form {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        strong {
            width: 100%;
            color: ${colors.dark};
            font-size: 14px;
            margin-bottom: 8px;
        }

        p {
            width: 100%;
            font-size: 16px;
            margin-bottom: 20px;
        }

        button {
            margin-top: 20px;
        }
    }
`;
