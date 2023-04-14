import { useState } from 'react';
import { Box, Button, TextField, InputLabel, Select, MenuItem, useTheme, TextareaAutosize } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { tokens } from '../../alternative_theme';
import Header from '../../components/header';
import { compilerCode } from '../../apis/compilerService';
//import { saveAs } from 'file-saver';

export default function Workshop() {
    const [codingText, setCodingText] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('');
    const [compileCode, setCompileCode] = useState('');

    const handleChangeLanguage = (event) => {
        setCodeLanguage(event.target.value);
    };

    const handleChangeCodingText = (event) => {
        setCodingText(event.target.value);
    };
    const buttonRunCode = async () => {
        const blob = new Blob([codingText], { type: 'text/plain;charset=utf-8' });
        const file = new File([blob], `code${codeLanguage}`, { type: 'text/plain;charset=utf-8' });
        //saveAs(file);
        //sendFileToServer(file);
        const result = await compilerCode(file, codeLanguage);
        console.log(result);
        // Here can send the document
    };
    // const sendFileToConvertService = (file) => {
    //     // code to send file to server for processing
    // };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="50px">
            <Header title='Technical test' subtitle='Resolve the problem' />
            <FormControl sx={{ width: '20ch' }} variant="filled">
                <InputLabel>Select a Language</InputLabel>
                <Select name="language" value={codeLanguage} onChange={handleChangeLanguage}>
                    <MenuItem value='.java'>Java</MenuItem>
                    <MenuItem value='.js'>Javascript</MenuItem>
                    <MenuItem value='.cs'>C#</MenuItem>
                    <MenuItem value='.py'>Python</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" style={{ background: colors.primary[100] }} variant="contained" onClick={buttonRunCode}>
                Run
            </Button>
            <TextareaAutosize
                maxRows={4}
                name='coding'
                aria-label="maximum height"
                value={codingText}
                onChange={handleChangeCodingText}
                style={{ width: 650, height: 450 }}
            />
            <TextareaAutosize
                maxRows={4}
                name='output'
                aria-label="maximum height"
                value={compileCode}
                // onChange={handleChangeCodingText}
                style={{ width: 650, height: 70 }}
            />
        </Box>
    );
}
