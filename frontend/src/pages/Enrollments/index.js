import React, { useEffect } from 'react';
import { MdAddCircleOutline, MdCheck, MdClear } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import handleChangeRoute from '~/utils/handle-change-route';
import EnrollmentActions from '~/store/ducks/enrollment';

import Button from '~/components/Button';
import Confirm from '~/components/Confirm';
import { SContainer, SWrapperHeader, SWrapperContent } from './styles';

export default function Enrollments() {
    const dispatch = useDispatch();
    const enrollments = useSelector(
        state => [...state.enrollment.enrollments] || []
    );

    useEffect(() => {
        dispatch(EnrollmentActions.getEnrollmentsRequest());
    }, []);

    function handleRemoveEnrollment(enrollment) {
        Confirm({
            title: 'Delete enrollment',
            onConfirm: () =>
                dispatch(
                    EnrollmentActions.deleteEnrollmentRequest(enrollment.id)
                ),
            content: <p>Are you sure want to remove an enrollment</p>,
        });
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>Enrollments Management</h1>
                <div className="actions-container">
                    <Button
                        onClick={() => handleChangeRoute('/enrollments/create')}
                    >
                        <MdAddCircleOutline size="20" />
                        {'add'.toUpperCase()}
                    </Button>
                </div>
            </SWrapperHeader>
            <SWrapperContent>
                <ul>
                    <li className="title">{'student'.toUpperCase()}</li>
                    <li className="title">{'plan'.toUpperCase()}</li>
                    <li className="title">{'start'.toUpperCase()}</li>
                    <li className="title">{'end'.toUpperCase()}</li>
                    <li className="title">{'active'.toUpperCase()}</li>
                </ul>

                {enrollments &&
                    enrollments.map(enrollment => (
                        <ul key={enrollment.id}>
                            <li className="content">
                                {enrollment.student.name}
                            </li>
                            <li className="content">{enrollment.plan.title}</li>
                            <li className="content">{enrollment.start_date}</li>
                            <li className="content">{enrollment.end_date}</li>
                            <li className="content">
                                {enrollment.active ? (
                                    <MdCheck size="20" color="green" />
                                ) : (
                                    <MdClear size="20" color="#ee4d64" />
                                )}
                            </li>
                            <li
                                className="content-actions content-action-edit"
                                onClick={() =>
                                    handleChangeRoute(
                                        `/enrollments/${enrollment.id}`
                                    )
                                }
                            >
                                edit
                            </li>
                            <li
                                className="content-actions content-action-delete"
                                onClick={() =>
                                    handleRemoveEnrollment(enrollment)
                                }
                            >
                                remove
                            </li>
                        </ul>
                    ))}
            </SWrapperContent>
        </SContainer>
    );
}
