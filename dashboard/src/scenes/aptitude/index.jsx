import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Questions from './Questions.json';

const Aptitude = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState({});

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSelectAnswer = (event) => {
    const { name, value } = event.target;
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [name]: value,
    }));
    console.log(selectedOptions);
  };

  const currentQuestion = Questions[currentQuestionIndex];

  return (
    <>
      <Typography variant="h2" gutterBottom>Test Aptitude</Typography>
      <Typography variant="h3" gutterBottom>Please answer the following question:</Typography>
      <Typography variant="h4" gutterBottom>
        {currentQuestion.question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="quiz"
          name={`${currentQuestionIndex}`}
          value={selectedOptions[`${currentQuestionIndex}`] || ''}
          onChange={handleSelectAnswer}
        >
          {currentQuestion.options.map((option, index) => (
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
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

export default Aptitude;
