import React, { useEffect, useState, useCallback } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import handleChangeRoute from '~/utils/handle-change-route';
import StudentActions from '~/store/ducks/student';

import Button from '~/components/Button';
import Confirm from '~/components/Confirm';
import InputText from '~/components/Input';
import { SContainer, SWrapperHeader, SWrapperContent } from './styles';

export default function Students() {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('');
    const students = useSelector(state => [...state.student.students]);

    const loadStudents = useCallback(() => {
        return dispatch(StudentActions.getStudentsRequest(filter));
    }, [filter]);

    useEffect(() => {
        loadStudents();
    }, [loadStudents]);

    function handleRemoveStudent(student) {
        Confirm({
            title: 'Delete student',
            onConfirm: () =>
                dispatch(StudentActions.deleteStudentRequest(student.id)),
            content: (
                <p>
                    Are you sure want to remove a student
                    <strong>{student.name} </strong>?
                </p>
            ),
        });
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>Student Management</h1>
                <div className="actions-container">
                    <Button
                        onClick={() => handleChangeRoute('/students/create')}
                    >
                        <MdAddCircleOutline size="20" />
                        {'add'.toUpperCase()}
                    </Button>
                    <InputText
                        name="search"
                        haslabel={false}
                        placeholder="Search student"
                        onChange={e => setFilter(e.target.value)}
                    />
                </div>
            </SWrapperHeader>
            <SWrapperContent>
                <ul>
                    <li className="title">{'name'.toUpperCase()}</li>
                    <li className="title">{'email'.toUpperCase()}</li>
                    <li className="title">{'age'.toUpperCase()}</li>
                </ul>

                {students &&
                    students.map(student => (
                        <ul key={student.id}>
                            <li className="content">{student.name}</li>
                            <li className="content">{student.email}</li>
                            <li className="content">{student.age} anos</li>
                            <li
                                className="content-actions content-action-edit"
                                onClick={() =>
                                    handleChangeRoute(`/students/${student.id}`)
                                }
                            >
                                edit
                            </li>
                            <li
                                className="content-actions content-action-delete"
                                onClick={() => handleRemoveStudent(student)}
                            >
                                remove
                            </li>
                        </ul>
                    ))}
            </SWrapperContent>
        </SContainer>
    );
}
