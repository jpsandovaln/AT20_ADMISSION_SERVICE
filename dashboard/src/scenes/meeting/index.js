import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import timeZone from './timezone';
import host from './hosts';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import guests from './guests';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function NewMeeting() {
    return (
        <div >
            <h2 style={{textAlign: "center"}}>NEW MEETING</h2>
            {/* <p style={{textAlign: "center"}}></p> */}
            
            <Box
                component="form"
                sx={{
                '& > :not(style)': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
                textAlign="center"
            >
                <br></br>Meeting Name: <br></br>
                <TextField 
                id="outlined-basic" 
                label="Meeting" 
                variant="outlined" 
                />
            </Box>

            <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate                
                textAlign="center"
            >
                Description (Optional):
                <div>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    maxRows={4}
                    />
                </div>
            </Box>

        <h4 style={{textAlign: "center"}}>Schedule</h4>

            <Box component="form"
                sx={{
                '& .MuiTextField-root': { mx: 40, width: '50ch' },
                }} 
                justifyContent="center"
                textAlign="center"       
                >
                Date
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} >
                        <DatePicker label="Select a Date" />
                    </DemoContainer>
                </LocalizationProvider>                
            </Box>
            <Stack spacing={2} direction="row"
                textAlign="center"
                sx={{'& > :not(style)': { ml: 40,}}}>
                
                <Box component="form"
                    sx={{
                    '& .MuiTextField-root': { width: '24ch' },
                    }}
                    >
                    Star                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Star time" />
                        </DemoContainer>
                    </LocalizationProvider>            
                </Box>

                <Box component="form"
                    sx={{
                    '& .MuiTextField-root': { width: '24ch' },
                    }}>
                    Final Time                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="End time" />
                        </DemoContainer>
                    </LocalizationProvider>            
                </Box>
            </Stack>
            <Box
            textAlign="center">
                Time Zone
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={timeZone}
                    sx={{ mt:1, mx:40, width: '50ch' }}
                    renderInput={(params) => <TextField {...params} label="Time Zone" />}
                />
            </Box>
        <h4 style={{textAlign: "center"}}>Participants</h4>
            <Box
            textAlign="center">
                Host
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={host}
                    sx={{ mt:1, mx:40, width: '50ch' }}
                    renderInput={(params) => <TextField {...params} label="Select Host" />}
                />   
            </Box>

            <Box
            textAlign="center">
                Guests
                <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={guests}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.name}
                        </li>
                    )}
                    style={{ width: '50ch' }}
                    sx={{ mt:1, mx:40, width: '50ch' }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Guests" placeholder=" " />
                        )}
                />
            </Box>
            <Box
            textAlign="center"
            >
                <br></br>
                <Stack spacing={2} direction="row"
                textAlign="center"
                sx={{'& > :not(style)': { ml: 75,}}}>
                    <Button variant="contained" color='secondary' href="#outlined-buttons">Save</Button>
                    <Button variant="contained" color='primary'>Cancel</Button>
                </Stack>
                <br></br>
                Organized by: Pepito Perez<br></br><br></br>                
            </Box>
        </div>
    );
  }
