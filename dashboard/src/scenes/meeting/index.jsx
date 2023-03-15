import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';



export default function NewMeeting() {
    return (
        <div>
            NEW MEETING
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <br></br>Meeting Name: <br></br>
                <TextField 
                id="outlined-basic" 
                label="Meeting" 
                variant="outlined" />
            </Box>

            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <br></br>Description (Optional): <br></br>
                <div>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    />
                </div>
            </Box>
            <br></br>Schedule<br></br>
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <br></br>Date
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Pick a Date" />
                    </DemoContainer>
                </LocalizationProvider>                
            </Box>
            
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <br></br>Start
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="Star time" />
                    </DemoContainer>
                </LocalizationProvider>            
            </Box>

            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <br></br>Final time
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="End time" />
                    </DemoContainer>
                </LocalizationProvider>            
            </Box>
            <Box>
     
            </Box>
            

        </div>
    );
  }