import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import { SContainer, SSelectInput, SLabel } from './styles';

export default function SelectInput({
    disabled,
    name,
    label,
    multiple,
    onChange,
    options,
    ...rest
}) {
    const ref = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [selectedOption, setOptionSelected] = useState(defaultValue);

    function parseSelectValue(selectRef) {
        const selectValue = selectRef.state.value;
        if (!multiple) {
            return selectValue ? selectValue.id : '';
        }

        return selectValue ? selectValue.map(option => option.id) : [];
    }

    useEffect(() => {
        if (defaultValue) {
            if (!multiple && defaultValue.includes) {
                setOptionSelected(
                    options.filter(option => defaultValue.includes(option.id))
                );
            }

            setOptionSelected(
                options.find(option => option.id === defaultValue)
            );
        }
    }, [defaultValue, multiple, options]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: ref.current,
            path: 'state.value',
            parseValue: parseSelectValue,
            clearValue: selectRef => {
                selectRef.select.clearValue();
            },
        });
    }, [ref.current, fieldName]); // eslint-disable-line

    return (
        <SContainer>
            {label && (
                <SLabel htmlFor={fieldName} label={label ? 1 : 0}>
                    {label.toUpperCase()}
                </SLabel>
            )}

            <SSelectInput
                name={fieldName}
                label={label}
                aria-label={fieldName}
                options={options}
                isMulti={multiple}
                // defaultValue={selectedOption}
                value={selectedOption}
                onChange={value => {
                    setOptionSelected(value);
                    onChange(value);
                }}
                ref={ref}
                isDisabled={disabled}
                loadingMessage={() => 'Carregando...'}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.title || option.name}
                {...rest}
            />

            {error && <span>{error}</span>}
        </SContainer>
    );
}

SelectInput.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

SelectInput.defaultProps = {
    disabled: false,
    multiple: false,
    onChange: () => {},
};
