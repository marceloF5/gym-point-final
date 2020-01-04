import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const SContainer = styled.View`
    width: 100%;
    height: 100px;
    border-style: solid;
    border-bottom-color: ${colors.grey};
    border-bottom-width: 1px;
    background: ${colors.white};
    padding-bottom: 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
`;

export const SLogo = styled.View`
    flex-direction: row;
`;

export const SLogoImage = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: 36px;
    height: 18px;
`;

export const SLogoTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.primary};
    margin-left: 8px;
`;

export const SLogoutButton = styled.TouchableOpacity``;
export const SMenuButton = styled.TouchableOpacity``;
