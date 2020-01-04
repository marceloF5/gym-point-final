import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required('Verify your email/password'),
            password: Yup.string().required('Verify your email/password'),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                toast: {
                    type: 'error',
                    title: 'Verify your email/password.',
                    message:
                        'Your crendetials are not submitted, please submit!',
                },
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.checkPassword(password))) {
            return res.status(401).json({
                toast: {
                    type: 'error',
                    title: 'Incorrect crendedials.',
                    message: 'Please, verify your credencials!',
                },
            });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
