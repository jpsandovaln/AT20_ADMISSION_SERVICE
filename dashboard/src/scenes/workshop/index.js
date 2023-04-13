// import * as React from 'react';
import { useState } from 'react';
// import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Box, Button, TextField, InputLabel, Select, MenuItem, useTheme, TextareaAutosize } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { tokens } from '../../alternative_theme';
import Header from '../../components/header';
import { saveAs } from 'file-saver';

export default function Workshop() {
    // eslint-disable-next-line no-console
    console.log('is run from workshop');
    const [codingText, setCodingText] = useState('');

    const handleChangeCodingText = (event) => {
        setCodingText(event.target.value);
        // const code = event.target.value;
    };
    const compileCode = () => {
        // console.log(codingText);
        const blob = new Blob([codingText], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'Test.txt');
    };

    const handleChangeLanguage = (event) => {
        // handle the language change here
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="50px">
            <Header title='Technical test' subtitle='Resolve the problem' />
            <FormControl sx={{ width: '20ch' }} variant="filled">
                <Button type="submit" style={{ background: colors.primary[100] }} variant="contained" onClick={compileCode}>
                    Run
                </Button>
                <InputLabel>Select a Language</InputLabel>
                <Select name="language" onChange={handleChangeLanguage}>
                    <MenuItem value='java'>Java</MenuItem>
                    <MenuItem value='javascript'>Javascript</MenuItem>
                    <MenuItem value='c#'>C#</MenuItem>
                    <MenuItem value='python'>Python</MenuItem>
                </Select>
            </FormControl>
            <TextareaAutosize
                maxRows={4}
                name='coding'
                aria-label="maximum height"
                value={codingText}
                onChange={handleChangeCodingText}
                style={{ width: 650, height: 600 }}
            />
        </Box>
    );
}
