import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Questions from './Questions.json';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

const Concentration = () => {
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
      <Typography variant="h2" gutterBottom>Consentration test</Typography>
      <Typography variant="h3" gutterBottom>Please answer the following question:</Typography>
      <Typography variant="h4" gutterBottom>
        {currentQuestion.question}
      </Typography>
      <FormControl component="fieldset">
        {currentQuestion.type === "radioButton" && (
          <RadioGroup
            aria-label="quiz"
            name={`${currentQuestionIndex}`}
            value={selectedOptions[`${currentQuestionIndex}`] || ''}
            onChange={handleSelectAnswer}
          >
            {currentQuestion.options.map((option, index) => (
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
      <Stack spacing={2} direction="row">
        {currentQuestionIndex > 0 && (
          <Button variant="contained" onClick={handlePreviousQuestion}>
            Previous
          </Button>
        )}
        {currentQuestionIndex < Questions.length - 1 && (
          <Button variant="contained" onClick={handleNextQuestion}>
            Next
          </Button>
        )}
        {currentQuestionIndex === Questions.length - 1 && (
          <Button variant="contained">Submit</Button>
        )}
      </Stack>
    </>
  );
};

export default Concentration;