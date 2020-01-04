import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { MdAddCircleOutline, MdBackspace } from 'react-icons/md';
import { addMonths } from 'date-fns';

import handleChangeRoute from '~/utils/handle-change-route';
import EnrollmentActions from '~/store/ducks/enrollment';
import StudentActions from '~/store/ducks/student';
import PlanActions from '~/store/ducks/plan';

import { SContainer, SWrapperContent, SWrapperHeader } from './styles';

import Button from '~/components/Button';
import Confirm from '~/components/Confirm';
import DatePickerInput from '~/components/DatePicker';
import TextInput from '~/components/Input';
import SelectInput from '~/components/Select';

export default function Enrollment({ match }) {
    const dispatch = useDispatch();

    const { id } = match.params;
    const enrollment = useSelector(state => state.enrollment.enrollment || {});
    const students = useSelector(state => [...state.student.students] || []);
    const plans = useSelector(state => [...state.plan.plans] || []);

    const [selectedStudent, setStudent] = useState({});
    const [selectedPlan, setPlan] = useState({});
    const [selectedStartDate, setStartDate] = useState();

    const loadStudents = useCallback(async () => {
        dispatch(StudentActions.getStudentsRequest());
    }, []);

    const loadPlans = useCallback(async () => {
        dispatch(PlanActions.getPlansRequest());
    });

    useEffect(() => {
        if (id) {
            dispatch(EnrollmentActions.getEnrollmentRequest(id));
        }
        loadStudents();
        loadPlans();

        return () => {
            dispatch(EnrollmentActions.enrollmentsInitial());
            dispatch(StudentActions.studentsInitial());
            dispatch(PlanActions.plansInitial());
        };
    }, []);

    useEffect(() => {
        if (enrollment && enrollment.id) {
            setPlan(enrollment.plan);
            setStudent(enrollment.student);
            setStartDate(enrollment.start_date);
        }
    }, [enrollment]);

    const endDate = useMemo(() => {
        if (
            Object.keys(selectedPlan).length &&
            typeof selectedStartDate === 'object'
        ) {
            return addMonths(selectedStartDate, selectedPlan.duration);
        }

        return '';
    }, [selectedPlan, selectedStartDate]);

    const totalPrice = useMemo(() => {
        const { duration, price } = selectedPlan;
        const priceConverted = parseFloat(price).toFixed(2);

        if (
            Object.keys(selectedPlan).length &&
            Object.keys(enrollment).length
        ) {
            return parseFloat(enrollment.price).toFixed(2);
        }

        if (duration && price) {
            return (duration * priceConverted).toFixed(2);
        }
        return (0).toFixed(2);
    }, [selectedPlan]);

    const handleSelectStartDate = date => {
        setStartDate(date);
    };

    function handleUpdateEnrollment(formData) {
        Confirm({
            title: 'Update data',
            onConfirm: () =>
                dispatch(
                    EnrollmentActions.putEnrollmentRequest({
                        formData,
                        id,
                    })
                ),
            content: <p>Would you really like to update data?</p>,
        });
    }

    function handleCreateEnrollment(formData) {
        dispatch(EnrollmentActions.postEnrollmentRequest(formData));
    }

    function handleSubmit() {
        const newEnrollment = {
            student_id: selectedStudent.id,
            plan_id: selectedPlan.id,
            start_date: selectedStartDate,
        };
        if (!id) {
            handleCreateEnrollment(newEnrollment);
        } else {
            handleUpdateEnrollment(newEnrollment);
        }
    }

    return (
        <SContainer>
            <SWrapperHeader>
                <h1>
                    {!Object.keys(enrollment).length
                        ? 'Add Enrollment'
                        : 'Edit Enrollment'}
                </h1>
                <div className="actions-container">
                    <Button
                        type="success"
                        onClick={() => handleChangeRoute('/enrollments')}
                    >
                        <MdBackspace size="20" />
                        {'back'.toUpperCase()}
                    </Button>
                </div>
            </SWrapperHeader>
            <SWrapperContent>
                <Form initialData={enrollment} onSubmit={handleSubmit}>
                    <SelectInput
                        noOptionsMessage={() => 'There are not student'}
                        name="student.id"
                        label="student"
                        options={students}
                        loadOptions={loadStudents}
                        placeholder="Select a student"
                        onChange={data => setStudent(data)}
                        cacheOptions
                        disabled={!!id}
                    />
                    <div className="input-group">
                        <SelectInput
                            noOptionsMessage={() => 'There are not plans'}
                            name="plan.id"
                            label="plan"
                            options={plans}
                            loadOptions={loadPlans}
                            placeholder="Select a plan"
                            onChange={data => setPlan(data)}
                            cacheOptions
                        />
                        <DatePickerInput
                            name="start_date"
                            label="START DATE"
                            placeholder="Choose a date"
                            onChange={handleSelectStartDate}
                        />
                        <DatePickerInput
                            name="end_date"
                            label="END DATE"
                            value={endDate}
                            disabled
                        />
                        <TextInput
                            name="price"
                            label="total price"
                            value={totalPrice}
                            disabled
                        />
                    </div>

                    <Button type="submit" onClick={() => {}}>
                        <MdAddCircleOutline size="20" />
                        {'save'.toUpperCase()}
                    </Button>
                </Form>
            </SWrapperContent>
        </SContainer>
    );
}

Enrollment.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }),
};

Enrollment.defaultProps = {
    match: { params: { id: '' } },
};
