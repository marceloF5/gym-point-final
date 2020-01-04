import React from 'react';
import PropTypes from 'prop-types';

import {
    SCard,
    SQuestionHeader,
    STitle,
    SQuestionTime,
    SQuestion,
    SAnswer,
    SNotAnswer,
} from './styles';

import Header from '~/components/Header';
import { SGlobalContainer } from '~/styles/global';

export default function Info({ navigation }) {
    const helpOrder = navigation.getParam('helpOrder');

    return (
        <>
            <Header />
            <SGlobalContainer>
                <SCard>
                    <SQuestionHeader>
                        <STitle>{'question'.toUpperCase()}</STitle>
                        <SQuestionTime>{helpOrder.time}</SQuestionTime>
                    </SQuestionHeader>
                    <SQuestion>{helpOrder.question}</SQuestion>

                    {helpOrder.answer ? (
                        <>
                            <STitle>{'answer'.toUpperCase()}</STitle>
                            <SAnswer>{helpOrder.answer}</SAnswer>
                        </>
                    ) : (
                        <SNotAnswer>SEM RESPOSTA</SNotAnswer>
                    )}
                </SCard>
            </SGlobalContainer>
        </>
    );
}

Info.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func,
    }).isRequired,
};
