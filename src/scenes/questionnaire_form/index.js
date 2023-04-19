/* eslint-disable react/react-in-jsx-scope */
/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/
import { Box, Button, TextField, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { Formik } from 'formik';
import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import { useState } from 'react';
import Header from '../../components/header';
import { tokens } from '../../alternative_theme';

export const initialValues = {
    test: '',
    question: '',
    type: '',
    answer1: '',
    answer2: '',
    answer3: ''
};
const checkoutSchema = yup.object().shape({
    test: yup.string().required('Test is required'),
    question: yup.string().required('Question is required'),
    answer1: yup.string().required('Answer is required'),
    answer2: yup.string().required('Answer is required'),
    answer3: yup.string().required('Answer is required')
});

export default function NewQuestionnaireForm () {
    const [count, setCount] = useState(0);
    const [questions, setQuestions] = useState([]);

    const handleFormSubmit = (values, { resetForm }) => {
        const question = JSON.stringify(values);
        setQuestions([...questions, question]);
        questions.push(question);
        resetForm();
    };

    const handleButtonClick = () => {
        setCount(count + 1);
    };

    const handleButtonClickSend = () => {
        setCount(0);
        // Here you can send the all questions to backend
        // console.log('Send all questions');
        // console.info(questions);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <Box m="50px">
                <Header title='QUESTIONNAIRE' subtitle='Create Question' />
                <Formik onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Type of Test"
                                    name="test"
                                    value={values.test}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.test && !!errors.test}
                                    helperText={touched.test && errors.test}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Question"
                                    name="question"
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.question && !!errors.question}
                                    helperText={touched.question && errors.question}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <FormControl variant="filled">
                                    <InputLabel>Type of Question</InputLabel>
                                    <Select name="type" value={values.type} onChange={handleChange}>
                                        <MenuItem value='checkBox'>Multiple Response</MenuItem>
                                        <MenuItem value='radioButton'>Single Response</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer"
                                    name="answer1"
                                    value={values.answer1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer1 && !!errors.answer1}
                                    helperText={touched.answer1 && errors.answer1}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer"
                                    name="answer2"
                                    value={values.answer2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer2 && !!errors.answer2}
                                    helperText={touched.answer2 && errors.answer2}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer"
                                    name="answer3"
                                    value={values.answer3}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer3 && !!errors.answer3}
                                    helperText={touched.answer3 && errors.answer3}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Box mr={2}>
                                    <Button type="submit" style={{ background: colors.success[100] }} variant="contained" onClick={handleButtonClick}>
                                        Save Question ({count})
                                    </Button>
                                </Box>
                                <Box mr={2}>
                                    <Button type="submit" style={{ background: colors.primary[100] }} variant="contained" onClick={handleButtonClickSend}>
                                        Send All
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}
