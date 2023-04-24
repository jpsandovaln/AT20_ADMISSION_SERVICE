/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information '). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Questions from './Questions.json';
import Answers from './Answers.json';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import Header from '../../../../components/header.jsx';
import { useState, useEffect } from "react"
import { GET_QUESTIONS_BY_TEST } from '../../../../graphql/questionnaire';
import {useMutation, useQuery} from '@apollo/client'
// builds the aptitude test page
const Logical = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedOptions, setSelectedOptions] = React.useState({});
    const [formSubmitted, setFormSubmitted] = React.useState(false);
    const [showThankYouMessage, setShowThankYouMessage] = React.useState(false);
    const [examTaken, setExamTaken] = React.useState(localStorage.getItem('examTaken'));
    const [questions, setQuestions] = useState([]);
    const { loading, error, data } = useQuery(GET_QUESTIONS_BY_TEST, {
        variables: { test: 'logical' },
      });

    useEffect(() => {
        if (data && data.getQuestionnaire) {
          setQuestions(data.getQuestionnaire);
        }
      }, [data]);
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error: {error.message}</p>;
      }
      const Questions = data.getQuestionnaire;
      const answer = data.getQuestionnaire.map(question => question.Answer);
     // console.log(answer[1])
    const getTestName = () => {
        return 'Aptitude Test';
        };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };
    localStorage.clear();
    const handleSubmit = async () => {
        setFormSubmitted(true);
        setShowThankYouMessage(true);
        localStorage.setItem('examTaken', true);
        setExamTaken(true);


        // Save selected answers and score to Notes.json
        const selectedAnswers = Object.values(selectedOptions);
        const notes = {
            selectedAnswers: selectedAnswers,
            score: calculateScore(),
            testName: getTestName()
        };

        const json = JSON.stringify(notes);

    };

    const handleSelectAnswer = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setSelectedOptions((prevSelectedOptions) => {
                const prevSelectedValues = prevSelectedOptions[name] || [];
                let updatedSelectedValues;

                if (checked) {
                    updatedSelectedValues = [...prevSelectedValues, value];
                } else {
                    updatedSelectedValues = prevSelectedValues.filter(
                        (selectedValue) => selectedValue !== value
                    );
                }

                return {
                    ...prevSelectedOptions,
                    [name]: updatedSelectedValues
                };
            });
            // saves a data when is a radio in the selectedOptions object
        } else if (type === 'radio') {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [name]: value
            }));
        }
    };

    const currentQuestion = Questions[currentQuestionIndex];
    console.log(selectedOptions)
    const calculateScore = () => {
        const totalQuestions = Questions.length;
        let correctAnswers = 0;

        for (let i = 0; i < totalQuestions; i++) {
            const correctAnswer = answer[i];
            const userAnswer = selectedOptions[i];

            if (correctAnswer === userAnswer) {
                correctAnswers++;
            } else if (Array.isArray(userAnswer)) {
                const isAnswerCorrect = userAnswer.every((answer) =>
                    correctAnswer.includes(answer)
                );
                if (isAnswerCorrect) {
                    correctAnswers++;
                }
            }
        }

        const score = (correctAnswers / totalQuestions) * 100;
        console.log(score)
        return score;
    };

    const renderThankYouMessage = (score) => {
        const passOrFail = score >= 50 ? 'pass' : 'fail';
        return (
            <>
                <Typography variant='h4' gutterBottom align='center'>
                    It's complete, thank you!
                </Typography>
                <Typography variant='h5' gutterBottom align='center'>
                    Your score is {score.toFixed(2)}% and you {passOrFail}.
                </Typography>
            </>
        );
    };

    const renderContent = () => {
        if (examTaken) {
            return (
                <>
                    <Typography variant='h4' gutterBottom align='center'>
                    Congratulations, you completed the exam!
                    </Typography>
                </>
            );
        } else if (showThankYouMessage) {
            const score = calculateScore();
            return renderThankYouMessage(score);
        }

        return (
            <>
                {/* The rest of the components */}
                <Box sx={{ m: '50px' }}>
                    <Header title='TEST' subtitle='Aptitude test' />
                    <Typography variant='h3' gutterBottom>Please answer the following question:</Typography>
                    <Typography variant='h4' gutterBottom>
                        {currentQuestion.Question}
                    </Typography>
                    <FormControl component='fieldset'>
                        {currentQuestion.type === 'radioButton' && (
                            <RadioGroup
                                aria-label='quiz'
                                name={`${currentQuestionIndex}`}
                                value={selectedOptions[`${currentQuestionIndex}`] || ''}
                                onChange={handleSelectAnswer}
                            >
                                {currentQuestion.options.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={option.Value}
                                        control={<Radio />}
                                        label={option.Label}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                        {currentQuestion.type === 'checkBox' && (
                            <FormGroup>
                                {currentQuestion.options.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={
                                                    selectedOptions[`${currentQuestionIndex}`] &&
                                                    selectedOptions[`${currentQuestionIndex}`].includes(
                                                        option.Value
                                                    )
                                                }
                                                onChange={handleSelectAnswer}
                                                name={`${currentQuestionIndex}`}
                                                value={option.Value}
                                            />
                                        }
                                        label={option.Label}
                                    />
                                ))}
                            </FormGroup>
                        )}
                    </FormControl>
                    <Stack spacing={2} direction='row'>
                        {currentQuestionIndex > 0 && (
                            <Button variant='contained' onClick={handlePreviousQuestion}>
                                Previous
                            </Button>
                        )}
                        {currentQuestionIndex < Questions.length - 1 && (
                            <Button variant='contained' onClick={handleNextQuestion}>
                                Next
                            </Button>
                        )}
                        {currentQuestionIndex === Questions.length - 1 && (
                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                                disabled={formSubmitted}
                            >Submit</Button>
                        )}
                    </Stack>
                </Box>
            </>
        );
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

export default Logical;
