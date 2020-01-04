import React from 'react';
import PropTypes from 'prop-types';

import { SContainer, SInputText, SLabel } from './styles';

export default function InputText({
    type,
    label,
    name,
    multiline,
    rows,
    placeholder,
    onChange,
    value,
    disabled,
}) {
    return (
        <SContainer>
            {label && (
                <SLabel htmlFor={name} label={label ? 1 : 0}>
                    {label.toUpperCase()}
                </SLabel>
            )}
            <SInputText
                type={type}
                name={name}
                multiline={multiline}
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
            />
        </SContainer>
    );
}

InputText.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    multiline: PropTypes.bool,
    rows: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
    disabled: PropTypes.bool,
};

InputText.defaultProps = {
    type: 'text',
    label: '',
    multiline: false,
    rows: '',
    placeholder: '',
    onChange: () => {},
    disabled: false,
};
