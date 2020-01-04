import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { SContainer } from './styles';

import Button from '~/components/Button';

export default function Confirm({
    title = 'Tem certeza disso ?',
    description = null,
    content = null,
    component = () => {},
    onConfirm = () => {},
}) {
    return confirmAlert({
        // eslint-disable-next-line react/prop-types
        customUI: ({ onClose }) => {
            return (
                <SContainer>
                    {component(onClose) || (
                        <>
                            <h1>{title}</h1>
                            {description && <p>{description}</p>}
                            {content && <section>{content}</section>}
                            <div className="buttons">
                                <Button type="success" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        onClose();
                                        onConfirm();
                                    }}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </>
                    )}
                </SContainer>
            );
        },
    });
}
