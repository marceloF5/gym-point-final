import Queue from '../../lib/Queue';
import AnswerHelpOrderMail from '../jobs/AnswerHelpOrderMail';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class AnswerHelpOrderController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const helpOrders = await HelpOrder.findAll({
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
            ],
            where: { answer: null },
            offset: (page - 1) * 10,
            limit: 10,
            order: [['updated_at', 'DESC']],
        });

        return res.json({
            toast: {
                type: 'success',
                title: 'Help orders were found.',
                message: 'Help orders has been found with success!',
            },
            payload: helpOrders,
        });
    }

    async store(req, res) {
        const helpOrder = await HelpOrder.findByPk(req.params.id, {
            include: ['student'],
        });

        if (!helpOrder) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Help order was not found.',
                    message: 'There is no help order in our database!',
                },
            });
        }

        if (helpOrder.answer) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Help order already answered.',
                    message: 'There is no help order to answer more!',
                },
            });
        }

        await helpOrder.update({
            answer: req.body.answer,
            answer_at: new Date(),
        });

        await Queue.add(AnswerHelpOrderMail.key, {
            helpOrder,
        });

        return res.json({
            toast: {
                type: 'success',
                title: 'Help order was answered.',
                message: 'Help order has been answered with success!',
            },
            payload: helpOrder,
        });
    }
}

export default new AnswerHelpOrderController();
