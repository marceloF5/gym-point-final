import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

import AuthLayout from '~/pages/_layout/auth';
import DefaultLayout from '~/pages/_layout/default';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = store.getState().auth.signedIn;
    const Layout = signed ? DefaultLayout : AuthLayout;

    if (!signed && isPrivate) {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect
                        to={{
                            pathname: '/',
                            // eslint-disable-next-line react/prop-types
                            state: { from: props.location },
                        }}
                        {...props}
                    />
                )}
            />
        );
    }

    if (signed && !isPrivate) {
        return (
            <Route
                {...rest}
                render={props => (
                    <Redirect
                        to={{
                            pathname: '/students',
                            // eslint-disable-next-line react/prop-types
                            state: { from: props.location },
                        }}
                        {...props}
                    />
                )}
            />
        );
    }

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    <Layout {...props}>
                        <Component {...props} />
                    </Layout>
                );
            }}
        />
    );
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
};

RouteWrapper.defaultProps = {
    isPrivate: false,
};
