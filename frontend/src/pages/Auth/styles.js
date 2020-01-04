import styled from 'styled-components';

export const SContainer = styled.div`
    width: 360px;
    height: 448px;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        width: 300px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        button {
            margin-top: 15px;
        }
    }
`;

export const SLogo = styled.img`
    margin: 12.5px 0;
`;

export const SLogoDescribe = styled.div`
    width: 153px;
    height: 39px;
    font-family: Roboto;
    font-size: 29.9px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    margin-bottom: 25px;
    text-align: left;
    color: #ee4d64;
`;
