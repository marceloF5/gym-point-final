import React from 'react';
import PropTypes from 'prop-types';

import { STouchableOpacity, SText } from './styles';

export default function Button({ size, onPress, children }) {
    return (
        <STouchableOpacity size={size} onPress={onPress}>
            <SText>{children}</SText>
        </STouchableOpacity>
    );
}
Button.propTypes = {
    size: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.string.isRequired,
};

Button.defaultProps = {
    size: '',
    onPress: () => {},
};
