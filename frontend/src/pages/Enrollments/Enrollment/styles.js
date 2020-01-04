import styled from 'styled-components';

export const SContainer = styled.div`
    height: calc(100% - 80px);
`;

export const SWrapperHeader = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-weight: bold;
        color: #444444;
    }

    .actions-container {
        width: 420px;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        button {
            margin-left: 20px;
        }
    }
`;

export const SWrapperContent = styled.div`
    border-radius: 4px;
    background-color: #ffffff;
    padding: 30px 30px;

    form {
        display: flex;
        align-items: flex-end;
        flex-direction: column;

        .input-group {
            width: 100%;
            display: flex;

            > div {
                margin-right: 20px;
            }

            > div:first-child {
                width: 500px;
            }

            > div:nth-child(2) {
                width: 300px;
            }

            > div:nth-child(3) {
                width: 300px;
            }

            > div:last-child {
                margin-right: 0;
                width: 300px;
            }
        }

        button {
            margin-top: 20px;
        }
    }
`;
