import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '~/styles/colors';

export const SContainer = styled.div`
    height: 64px;
    background: ${colors.white};
    border: solid 1px ${colors.grey};
    padding: 0 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SLogo = styled(Link)`
    width: 180px;
    height: 64px;
    text-decoration: none;
    transition: opacity 0.2s;

    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        width: 50px;
        margin-right: 10px;
    }
    span {
        width: 110px;
        border-right: solid 1px ${colors.grey};
        color: ${colors.primary};
        cursor: pointer;
        font-size: 15px;
        font-weight: bold;
        line-height: 30px;
        padding-right: 30px;
    }

    &:hover {
        opacity: 0.7;
    }
`;

export const SWrapperLogout = styled.div`
    display: flex;
`;

export const SMenu = styled.ul`
    width: 100%;
    margin: 30px;
    list-style-type: none;

    display: flex;
    align-items: flex-start;
`;

export const SMenuItem = styled(Link)`
    margin: 0 20px;
    color: ${({ active }) => (active ? colors.dark : colors.darkGrey)};
    font-weight: bold;
    font-size: 15px;
    text-align: left;
    text-decoration: none;

    &:first-child {
        margin: 0;
    }

    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }
`;

export const SProfile = styled.a`
    margin-right: 12px;
    font-size: 14px;
    transition: opacity 0.2s;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;

    p {
        font-weight: bold;
        color: ${colors.dark};
    }

    small {
        height: 19px;
        color: ${colors.danger};
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }

        &:active {
            opacity: 0.2;
        }
    }
`;
