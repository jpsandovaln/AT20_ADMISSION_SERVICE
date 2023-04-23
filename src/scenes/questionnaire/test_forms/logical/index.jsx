/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Questions from "./Questions.json";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Box } from '@mui/system';
import '../../test_forms/test.css';

// builds the logical test page
const Logical = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [selectedOptions, setSelectedOptions] = React.useState({});
    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const handleSelectAnswer = (event) => {
        const { name, value, type, checked } = event.target;
        // saves an array when is a checkbox in the selectedOptions object
        if (type === "checkbox") {
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
                    [name]: updatedSelectedValues,
                };
            });
            // saves a data when is a radio in the selectedOptions object
        } else if (type === "radio") {
            setSelectedOptions((prevSelectedOptions) => ({
                ...prevSelectedOptions,
                [name]: value,
            }));
        }
    };
    const currentQuestion = Questions[currentQuestionIndex];

    return (
        <>
            <Typography variant="h1" gutterBottom align="center"padding={'10px 0% 30px'}>
                Logical test
            </Typography>
            <Box className="container">
                <Typography variant="h3" gutterBottom padding={'10px 0% 20px'}>
                    Please answer the following question:
                </Typography>
                <Typography variant="h4" gutterBottom className="question-title" padding={'10px 0% 20px'}>
                    {currentQuestion.question}
                </Typography>
                <FormControl component="fieldset" >
                    {currentQuestion.type === "radioButton" && (
                        <RadioGroup
                            aria-label="quiz"
                            name={`${currentQuestionIndex}`}
                            value={selectedOptions[`${currentQuestionIndex}`] || ""}
                            onChange={handleSelectAnswer}
                        >{currentQuestion.options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                        </RadioGroup>
                    )}
                    {currentQuestion.type === "checkBox" && (
                        <FormGroup>
                            {currentQuestion.options.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={
                                                selectedOptions[`${currentQuestionIndex}`] &&
                                                selectedOptions[`${currentQuestionIndex}`].includes(
                                                    option.value
                                                )
                                            }
                                            onChange={handleSelectAnswer}
                                            name={`${currentQuestionIndex}`}
                                            value={option.value}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                    )}
                </FormControl>
                <Stack spacing={2} direction="row" className="button-container">
                    {currentQuestionIndex > 0 && (
                        <Button
                            variant="contained"
                            onClick={handlePreviousQuestion}
                            className="color-button"
                        >
                            Previous
                        </Button>
                    )}
                    {currentQuestionIndex < Questions.length - 1 && (
                        <Button variant="contained" onClick={handleNextQuestion} className="color-button">
                            Next
                        </Button>
                    )}
                    {currentQuestionIndex === Questions.length - 1 && (
                        <Button variant="contained" className="submit-button">
                            Submit
                        </Button>
                    )}
                </Stack>
            </Box>
        </>);
};

export default Logical;
