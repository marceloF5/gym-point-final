import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const plans = await Plan.findAll({
            order: ['updated_at'],
            limit: 10,
            offset: (page - 1) * 10,
            attributes: ['id', 'title', 'duration', 'price'],
        });

        if (!plans) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Plans are not found.',
                    message: 'There are no plans in our database!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Plans were found.',
                message: 'Plans has been found with success!',
            },
            payload: plans,
        });
    }

    async indexById(req, res) {
        const plan = await Plan.findByPk(req.params.id, {
            attributes: ['id', 'title', 'duration', 'price'],
        });

        if (!plan) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Plan are not found.',
                    message: 'There are no plan in our database!',
                },
            });
        }

        return res.json({
            toast: {
                type: 'success',
                title: 'Plan was found.',
                message: 'Plan has been found with success!',
            },
            payload: plan,
        });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify  fields.',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const plan = await Plan.create(req.body);

        return res.json({
            toast: {
                type: 'success',
                title: 'Plan was created.',
                message: 'Plan has been created with success!',
            },
            payload: plan,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify  fields.',
                    message:
                        'Fields are required, verify if which did not filled',
                },
            });
        }

        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Plan was not found.',
                    message: 'It is not possible update a plan unregistered!',
                },
            });
        }

        const { title, duration, price } = await plan.update(req.body);

        return res.json({
            toast: {
                type: 'success',
                title: 'Plan was created.',
                message: 'Plan has been updated with success!',
            },
            payload: { title, duration, price },
        });
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Plan are not found.',
                    message: 'There are no plan in our database!',
                },
            });
        }

        await Plan.destroy({ where: { id: req.params.id } });

        res.json({
            toast: {
                type: 'success',
                title: 'Plan removed',
                message: 'Plan was removed with success!',
            },
        });
    }
}

export default new PlanController();
