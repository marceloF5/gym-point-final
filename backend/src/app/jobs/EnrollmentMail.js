import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class EnrollmentMail {
    get key() {
        return 'EnrollmentMail';
    }

    async handle({ data }) {
        const { studentEnrolled } = data;
        const { student, plan, end_date, price } = studentEnrolled;

        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'WELCOME TO GYM POINT!',
            template: 'enrollment',
            context: {
                student: student.name,
                plan: plan.title,
                end_date: format(parseISO(end_date), "'dia' dd 'de' MMMM'", {
                    locale: pt,
                }),
                price: `$ ${price}`,
            },
        });
    }
}

export default new EnrollmentMail();
