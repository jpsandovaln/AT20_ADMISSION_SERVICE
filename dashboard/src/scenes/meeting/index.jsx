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
            <br></br>Schedule<br></br><br></br>
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}>
                Date
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Select a Date" />
                    </DemoContainer>
                </LocalizationProvider>                
            </Box>
            <Stack spacing={2} direction="row">
            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '23ch' },
                }}>
                Start
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="Star time" />
                    </DemoContainer>
                </LocalizationProvider>            
            </Box>

            <Box component="form"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '23ch' },
                }}>
                Final time
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                        <TimePicker label="End time" />
                    </DemoContainer>
                </LocalizationProvider>            
            </Box>
            </Stack>
            <Box>
                Time Zone
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={timeZone}
                    sx={{ m:1, width: '50ch' }}
                    renderInput={(params) => <TextField {...params} label="Time Zone" />}
                />
            </Box>
            <br></br>Participants<br></br><br></br>
            <Box>
                Host
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={host}
                    sx={{ m:1, width: '50ch' }}
                    renderInput={(params) => <TextField {...params} label="Select Host" />}
                />   
            </Box>

            <Box>
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
                    sx={{ m:1, width: '50ch' }}
                    renderInput={(params) => (
                        <TextField {...params} label="Select Guests" placeholder=" " />
                        )}
                />
            </Box>
            <Box>
                <br></br>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" color='secondary' href="#outlined-buttons">Save</Button>
                    <Button variant="contained" color='primary'>Cancel</Button>
                </Stack>
                <br></br>Organized by: Pepito Perez<br></br><br></br>
            </Box>
        </div>
    );
  }
