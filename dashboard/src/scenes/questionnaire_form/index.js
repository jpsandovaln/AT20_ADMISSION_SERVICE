import { Box, Button, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";

const initialValues = {
    test: '',
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
}
const checkoutSchema = yup.object().shape({
    test: yup.string().required("Test is required"),
    question: yup.string().required("Question is required"),
    answer1: yup.string().required("Answer is required"),
    answer2: yup.string().required("Answer is required"),
    answer3: yup.string().required("Answer is required"),
});

export default function newQuestionnaireForm() {
    const handleFormSubmit = (values, { resetForm }) => {
        resetForm();
        //e.preventDefault();here you send the values to an API
        console.log(values);
        console.log('the bottom works');
    };
    return (
        <>
            <Box m="20px">
                <Typography variant="h2" gutterBottom align="center">Questionnaire Form</Typography>
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
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.test && !!errors.test}
                                    helperText={touched.test && errors.test}
                                    sx={{ gridColumn: "span 4" }}
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
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <FormControl>
                                    <InputLabel id="type-of-question">Type of Question</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        //value={value.Select}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='checkBox'>CheckBox</MenuItem>
                                        <MenuItem value='radioButton'>RadioButton</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer"
                                    name="answer1"
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer1 && !!errors.answer1}
                                    helperText={touched.answer1 && errors.answer1}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer"
                                    name="answer2"
                                    value={values.answer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer2 && !!errors.answer2}
                                    helperText={touched.answer2 && errors.answer2}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Answer"
                                    name="answer3"
                                    value={values.answer}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={!!touched.answer3 && !!errors.answer3}
                                    helperText={touched.answer3 && errors.answer3}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Send Questions
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
};