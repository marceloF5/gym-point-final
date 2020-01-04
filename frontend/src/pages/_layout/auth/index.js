import React from 'react';
import PropTypes from 'prop-types';

import { SWrapper } from './styles';

export default function AuthLayout({ children }) {
    return <SWrapper>{children}</SWrapper>;
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired,
};
