import Mail from '../../lib/Mail';

class AnswerHelpOrderMail {
    get key() {
        return 'AnswerHelpOrderMail';
    }

    async handle({ data }) {
        const { helpOrder } = data;
        console.log(helpOrder);

        await Mail.sendMail({
            to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
            subject: 'HELP ORDER ANSWERED!',
            template: 'answer-help-order',
            context: {
                student: helpOrder.student.name,
                question: helpOrder.question,
                answer: helpOrder.answer,
            },
        });
    }
}

export default new AnswerHelpOrderMail();
