import { Op } from 'sequelize';
import * as Yup from 'yup';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';

class CheckinController {
    async indexById(req, res) {
        const student = await Checkin.findAll({
            where: { student_id: req.params.student_id },
            attributes: ['id', 'student_id', 'created_at'],
            order: [['created_at', 'DESC']],
        });

        if (!student.length) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student does not have check-in.',
                    message: 'Student did not do any check-in before!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'error',
                title: 'Student does not have check-in.',
                message: 'Student did not do any check-in before!',
            },
            payload: student,
        });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify fields.',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const isCheckins = await Checkin.findAll({
            where: {
                student_id: req.params.student_id,
                created_at: {
                    [Op.between]: [subDays(new Date(), 7), new Date()],
                },
            },
            attributes: ['student_id'],
        });

        if (isCheckins.length >= 5) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student does not authorized.',
                    message: 'Student exceeded enrollment limit this week!',
                },
            });
        }

        await Checkin.create({ student_id: req.params.student_id });

        return res.json({
            toast: {
                type: 'success',
                title: 'Student is authorized.',
                message: `Student has ${
                    4 - isCheckins.length === 0 ? 'no' : 4 - isCheckins.length
                } more ${
                    isCheckins.length > 1 ? 'opportunity' : 'opportunities'
                } to use to the gym this week!`,
            },
        });
    }
}

export default new CheckinController();
