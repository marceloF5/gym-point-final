import React from 'react';
import PropTypes from 'prop-types';

import { SButton } from './styles';

export default function Button({ type, size, onClick, children }) {
    return (
        <SButton type={type} size={size} onClick={onClick}>
            {children}
        </SButton>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

Button.defaultProps = {
    type: '',
    size: 'md',
    onClick: () => {},
};
