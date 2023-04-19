import { useState } from 'react';
import { Box, Button, Stack, InputLabel, Select, MenuItem, useTheme, TextareaAutosize, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { tokens } from '../../alternative_theme';
import Header from '../../components/header';
import { compilerCode } from '../../apis/compilerService';
import {useMutation} from '@apollo/client'
import { COMPILER } from "../../graphql/user";

export default function Workshop () {
    const [codingText, setCodingText] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('');
    const [compileCode, setCompileCode] = useState('');

    const handleChangeLanguage = (event) => {
        setCodeLanguage(event.target.value);
        setCompileCode('');
    };

    const handleChangeCodingText = (event) => {
        setCodingText(event.target.value);
    };
    const buttonRunCode = async ({ resetForm }) => {
          const languages = {
            '.java': 'java',
            '.js': 'javascript',
            '.cs': 'csharp',
            '.py': 'python'
        };
        const language = languages[codeLanguage];

        const [compiler] = useMutation(COMPILER);
        const blob = new Blob([codingText], { type: 'text/plain;charset=utf-8' });
        const file = new File([blob], `code${codeLanguage}`, { type: 'text/plain;charset=utf-8' });
        const comp = await compiler({ variables: { file, language } });
        setCompileCode(comp.data.compiler);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="50px" >
            <Header title='Technical test' subtitle='Resolve the problem' />
            <Stack spacing={2} direction="row">
                <FormControl sx={{ width: '20ch' }} variant="filled">
                    <InputLabel>Select a Language</InputLabel>
                    <Select name="language" value={codeLanguage} onChange={handleChangeLanguage}>
                        <MenuItem value='.java'>Java</MenuItem>
                        <MenuItem value='.js'>Javascript</MenuItem>
                        <MenuItem value='.cs'>C#</MenuItem>
                        <MenuItem value='.py'>Python</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" style={{ background: colors.primary[100], size: 'large' }} variant="contained" onClick={buttonRunCode}>
                    Run Your Code
                </Button>
            </Stack>
            <Box sx={{
                mt: 1,
                display: 'grid',
                gridAutoColumns: '1fr',
                gap: 1
            }}>
                <TextareaAutosize
                    maxRows={4}
                    name='coding'
                    aria-label="maximum height"
                    value={codingText}
                    onChange={handleChangeCodingText}
                    style={{ width: 650, height: 450 }}
                />
                <TextField
                    value={compileCode}
                    label="Output"
                    multiline
                    rows={4}
                    style={{ width: 650 }}
                    InputProps={{
                        readOnly: true
                    }}
                    sx={{ mt: 0.5 }}
                />
            </Box>
        </Box>
    );
}
