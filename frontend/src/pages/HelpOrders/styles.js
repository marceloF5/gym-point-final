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
`;

export const SWrapperContent = styled.div`
    width: 100%;
    padding-bottom: 15px;
    border-radius: 4px;
    background-color: #ffffff;

    ul {
        border-bottom: 1px solid #eeeeee;
        list-style-type: none;

        display: flex;
        align-items: center;

        li.title {
            width: 450px;
            color: red;
            margin: 30px 0 20px;

            &:first-child {
                margin-left: 30px;
            }
        }

        li.content {
            width: 450px;

            color: black;
            margin: 10px 0;

            &:first-child {
                margin-left: 30px;
            }

            &:nth-child(2) {
                width: 700px;
            }
        }

        li.content-actions {
            width: 70px;
            cursor: pointer;
            &:hover {
                opacity: 0.7;
            }
            &:active {
                opacity: 0.2;
            }
        }

        li.content-action-answer {
            color: #4d85ee;
            margin-left: 100px;
        }

        &:nth-child(1) {
            border: none;
        }
    }
`;
