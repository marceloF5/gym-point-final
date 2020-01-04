import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
    async index(req, res) {
        const { page = 1, per_page = 5 } = req.query;
        const { student_id } = req.params;

        const student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student was not found.',
                    message: 'There is no student in our database!',
                },
            });
        }

        const helpOrders = await HelpOrder.findAll({
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
            ],
            where: { student_id },
            order: [['updated_at', 'DESC']],
        });

        if (!helpOrders.length) {
            return res.status(400).json({
                toast: {
                    type: 'success',
                    title: 'There are not help order',
                    message: 'There are not help order requested yet',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Help order was found.',
                message: 'Help order has been found with success!',
            },
            payload: helpOrders,
        });
    }

    async store(req, res) {
        const { question } = req.body;
        const { student_id } = req.params;

        const student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Student was not found.',
                    message: 'There is no student in our database!',
                },
            });
        }

        if (!req.body.question) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Question is required.',
                    message: 'There is no question!',
                },
            });
        }
        const helpOrder = await HelpOrder.create({
            student_id,
            question,
        });

        return res.json({
            toast: {
                type: 'success',
                title: 'Help order was created.',
                message: 'Help order has been created with success!',
            },
            payload: helpOrder,
        });
    }
}

export default new HelpOrderController();
