import styled from 'styled-components';
import colors from '~/styles/colors';

export const SContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: ${colors.white};
    border-radius: 4px;
    z-index: 15;
    padding: 16px;

    h1 {
        font-size: 24px;
        color: ${colors.dark};
        font-weight: bold;
    }

    p {
        margin-top: 6px;
        font-size: 16px;
        color: ${colors.grey};
    }

    div.buttons {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;

        button + button {
            margin-left: 16px;
        }
    }
`;
