import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { menuItems } from '~/constants/menu';
import AuthActions from '~/store/ducks/auth';

import {
    SContainer,
    SLogo,
    SMenu,
    SMenuItem,
    SProfile,
    SWrapperLogout,
} from './styles';
import Logo from '~/assets/logo.svg';

export default function Header({ history: { location } }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user || {});

    function handleLogout() {
        dispatch(AuthActions.signOut());
    }

    return (
        <SContainer>
            <SLogo to="/students">
                <img src={Logo} alt="Logo" />
                <span>GYMPOINT</span>
            </SLogo>
            {menuItems && (
                <SMenu>
                    {/* Should be a component? */}
                    {menuItems.map(item => (
                        <SMenuItem
                            key={item.id}
                            active={location.pathname === item.path ? 1 : 0}
                            to={item.path}
                        >
                            {item.menu.toUpperCase()}
                        </SMenuItem>
                    ))}
                </SMenu>
            )}
            <SWrapperLogout>
                <SProfile onClick={handleLogout}>
                    <p>{user.name}</p>
                    <small>sign out</small>
                </SProfile>
            </SWrapperLogout>
        </SContainer>
    );
}

Header.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
