import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import EnrollmentMail from '../jobs/EnrollmentMail';

class EnrollmentController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const enrollments = await Enrollment.findAll({
            limit: 10,
            offset: (page - 1) * 10,
            attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration'],
                },
            ],
        });

        if (!enrollments) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Enrollments were not found.',
                    message: 'There are no enrollments in our database!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Enrollments were found.',
                message: 'Enrollments has been found with success!',
            },
            payload: enrollments,
        });
    }

    async indexById(req, res) {
        const enrollment = await Enrollment.findByPk(req.params.id, {
            attributes: ['id', 'start_date', 'end_date', 'price'],
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration'],
                },
            ],
        });

        if (!enrollment) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Enrollment was not found.',
                    message: 'There are no enrollment in our database!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Enrollment was found.',
                message: 'Enrollment has been found with success!',
            },
            payload: enrollment,
        });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify fields.',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const enrollment = req.body;
        const isStudent = await Enrollment.findOne({
            where: { student_id: enrollment.student_id },
        });

        if (isStudent) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student already enrolled.',
                    message: 'Student has been enrolled before!',
                },
            });
        }

        const { duration, price } = await Plan.findByPk(enrollment.plan_id);

        enrollment.end_date = addMonths(
            parseISO(enrollment.start_date),
            duration
        );
        enrollment.price = (price * duration).toFixed(2);

        const {
            id,
            student_id,
            plan_id,
            start_date,
            end_date,
            price: total_price,
        } = await Enrollment.create(enrollment);

        const studentEnrolled = await Enrollment.findByPk(25, {
            attributes: ['id', 'start_date', 'end_date', 'price'],
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration'],
                },
            ],
        });

        Queue.add(EnrollmentMail.key, {
            studentEnrolled,
        });

        return res.json({
            toast: {
                type: 'success',
                title: 'Enrollment was created.',
                message: 'Enrollment has been created with success!',
            },
            payload: {
                id,
                student_id,
                plan_id,
                start_date,
                end_date,
                total_price,
            },
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify fields.',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const en = await Enrollment.findByPk(req.params.id);

        if (!en) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Enrollment was not found.',
                    message:
                        'It is not possible update an enrollment unregistered!',
                },
            });
        }

        const enrollment = req.body;
        const { duration, price } = await Plan.findByPk(enrollment.plan_id);

        enrollment.end_date = addMonths(
            parseISO(enrollment.start_date),
            duration
        );
        enrollment.price = (price * duration).toFixed(2);

        const {
            id,
            student_id,
            plan_id,
            start_date,
            end_date,
            price: total_price,
        } = await en.update(enrollment);

        return res.json({
            toast: {
                type: 'success',
                title: 'Enrollment was updated.',
                message: 'Enrollment has been updated with success!',
            },
            payload: {
                id,
                student_id,
                plan_id,
                start_date,
                end_date,
                total_price,
            },
        });
    }

    async delete(req, res) {
        const enrollment = await Enrollment.findByPk(req.params.id);

        if (!enrollment) {
            res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Enrollment were not found.',
                    message: 'There are no enrollment in our database!',
                },
            });
        }

        await Enrollment.destroy({ where: { id: req.params.id } });

        res.json({
            toast: {
                type: 'success',
                title: 'Enrollment removed',
                message: 'Enrollment was removed with success!',
            },
        });
    }
}

export default new EnrollmentController();
