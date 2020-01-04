import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
    async index(req, res) {
        const { page = 1, name = '', email = '' } = req.query;

        const students = await Student.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` },
                email: { [Op.iLike]: `%${email}%` },
            },
            order: ['name'],
            limit: 10,
            offset: (page - 1) * 10,
            attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        });

        if (!students) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Students are not found.',
                    message: 'There are no students in our database!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Students were found.',
                message: 'Students has been found with success!',
            },
            payload: students,
        });
    }

    async indexById(req, res) {
        const student = await Student.findByPk(req.params.id, {
            attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        });

        if (!student) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Students are not found.',
                    message: 'There are no students in our database!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Student was found.',
                message: 'Student has been found with success!',
            },
            payload: student,
        });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required('Email is not formatted correctly.'),
            age: Yup.string().required(),
            weight: Yup.string().required(),
            height: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify Fields',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const student = await Student.findOne({
            where: { email: req.body.email },
        });

        if (student) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student already exist.',
                    message: 'Student already have been registered before.',
                },
            });
        }

        const { id, name, email } = await Student.create(req.body);

        return res.json({
            toast: {
                type: 'success',
                title: 'Student created.',
                message: 'Student has been created!',
            },
            payload: { id, name, email },
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required('Email is not formatted correctly.'),
            age: Yup.string().required(),
            weight: Yup.string().required(),
            height: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify Fields',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const student = await Student.findByPk(req.params.id);

        if (!student || student.email !== req.body.email) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student was not found.',
                    message:
                        'It is not possible update a student unregistered!',
                },
            });
        }

        const { id, name, email } = await student.update(req.body);

        return res.json({
            toast: {
                type: 'success',
                title: 'Student updated.',
                message: 'Student has been updated with success!',
            },
            payload: { id, name, email },
        });
    }

    async delete(req, res) {
        const student = await Student.findByPk(req.params.id);

        if (!student) {
            res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student are not found.',
                    message: 'There are no Student in our database!',
                },
            });
        }

        await Student.destroy({ where: { id: req.params.id } });

        res.json({
            toast: {
                type: 'success',
                title: 'Student removed',
                message: 'Student was removed with success!',
            },
        });
    }
}

export default new StudentController();
