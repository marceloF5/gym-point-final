import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdAddCircleOutline, MdBackspace } from 'react-icons/md';

import handleChangeRoute from '~/utils/handle-change-route';
import StudentActions from '~/store/ducks/student';

import { SContainer, SWrapperContent, SWrapperHeader } from './styles';

import Button from '~/components/Button';
import Confirm from '~/components/Confirm';
import InputText from '~/components/Input';

const schema = Yup.object().shape({
    name: Yup.string().required('Required field'),
    email: Yup.string()
        .email('Email is incorrect')
        .required('Required field'),
    age: Yup.number()
        .typeError('Field must be a number')
        .positive('Idade não pode ser negativa')
        .required('Required field'),
    weight: Yup.number()
        .typeError('Field must be a number')
        .required('Required field'),
    height: Yup.number()
        .typeError('Field must be a number')
        .required('Required field'),
});

export default function Student({ match }) {
    const { id } = match.params;
    const dispatch = useDispatch();
    const student = useSelector(state => state.student.student || {});

    useEffect(() => {
        if (id) {
            dispatch(StudentActions.getStudentRequest(id));
        }
        return () => {
            dispatch(StudentActions.studentsInitial());
        };
    }, []);

    function handleUpdateStudent(formData) {
        Confirm({
            title: 'Update Data',
            onConfirm: () =>
                dispatch(StudentActions.putStudentRequest({ formData, id })),
            content: <p>Would you really like to update data?</p>,
        });
    }

    function handleCreateStudent(formData) {
        dispatch(StudentActions.postStudentRequest(formData));
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>{id ? 'Edit Student' : 'Add Student'}</h1>
                <div className="actions-container">
                    <Button
                        type="success"
                        onClick={() => handleChangeRoute('/students')}
                    >
                        <MdBackspace size="20" />
                        {'back'.toUpperCase()}
                    </Button>
                </div>
            </SWrapperHeader>
            <SWrapperContent>
                {!Object.keys(student).length && (
                    <Form schema={schema} onSubmit={handleCreateStudent}>
                        <InputText label="full name" name="name" />
                        <InputText label="email" name="email" />
                        <div className="input-group">
                            <InputText label="age" name="age" />
                            <InputText label="weight (kg)" name="weight" />
                            <InputText label="height" name="height" />
                        </div>

                        <Button type="submit" onClick={() => {}}>
                            <MdAddCircleOutline size="20" />
                            {'save'.toUpperCase()}
                        </Button>
                    </Form>
                )}
                {!!Object.keys(student).length && (
                    <Form
                        schema={schema}
                        initialData={student}
                        onSubmit={handleUpdateStudent}
                    >
                        <InputText label="full name" name="name" />
                        <InputText label="email" name="email" disabled />
                        <div className="input-group">
                            <InputText label="age" name="age" />
                            <InputText label="weight (kg)" name="weight" />
                            <InputText label="height" name="height" />
                        </div>

                        <Button type="submit" onClick={() => {}}>
                            <MdAddCircleOutline size="20" />
                            {'save'.toUpperCase()}
                        </Button>
                    </Form>
                )}
            </SWrapperContent>
        </SContainer>
    );
}

Student.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

Student.defaultProps = {
    match: { params: { id: '' } },
};
