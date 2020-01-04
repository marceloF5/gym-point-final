import React from 'react';
import PropTypes from 'prop-types';

import { SWrapper } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout(props) {
    const { children } = props;
    return (
        <>
            <Header {...props} />
            <SWrapper>{children}</SWrapper>
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
