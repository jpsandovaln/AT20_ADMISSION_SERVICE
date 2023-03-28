/* eslint-disable react/react-in-jsx-scope */
/*
@index.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information '). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

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
import Header from '../../components/header';
import { useTheme } from '@mui/material';
import { tokens } from '../../alternative_theme';
import useMediaQuery from '@mui/material/useMediaQuery';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function NewMeeting () {
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m='50px'>
            <Header title='MEETING' subtitle='Create new Meeting' />

            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Meeting'
                        sx={{ gridColumn: 'span 2' }}
                    />
                    <TextField fullWidth
                        id='filled-basic'
                        variant='filled'
                        label='Description'
                        sx={{ gridColumn: 'span 2' }}
                    />
                </Box>
            </div>

            <div style={{ width: '100%' }}>
                <h3 style={{
                    color: colors.primary[100]
                }}>Schedule</h3>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1' }}
                    >
                        <DemoContainer components={['DatePicker']} >
                            <DatePicker label='Select a Date' slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1', textAlign: 'row' }}
                    >
                        <DemoContainer components={['TimePicker']} >
                            <TimePicker label='Start time' slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        sx={{ gridColumn: 'span 1' }}
                    >
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label='End time' slotProps={{ textField: { variant: 'filled' } }} sx={{ width: '100% !important' }}/>
                        </DemoContainer>
                    </LocalizationProvider>

                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        label='Time Zone'
                        options={timeZone}
                        sx={{ mt: 1, gridColumn: 'span 1', with: '100%' }}
                        renderInput={(params) => <TextField {...params} id='filled-basic' variant='filled' label='Time Zone' />}
                    />
                </Box>
            </div>
            <div style={{ width: '100%' }}>
                <h3 style={{
                    color: colors.primary[100]
                }}>Participants</h3>
                <Box
                    sx={{
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                    }}
                >
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={host}
                        sx={{ gridColumn: 'span 1' }}
                        renderInput={(params) => <TextField {...params} id='filled-basic' variant='filled' label='Select Host' />}
                    />
                    <Autocomplete
                        multiple
                        id='checkboxes-tags-demo'
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
                        sx={{ gridColumn: 'span 1' }}
                        renderInput={(params) => (
                            <TextField {...params} label='Select Guests' id='filled-basic' variant='filled' placeholder=' ' />
                        )}
                    />
                </Box>
            </div>
            <Box
                sx={{
                    my: 5,
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                }}
            >
                <Stack spacing={2} direction='row'
                    textAlign='center'
                    sx={{ '& > :not(style)': { ml: 'auto' } }}>
                    <Button variant='contained' style={{ background: colors.success[100] }} size='medium' href='#outlined-buttons'>Save</Button>
                    <Button variant='contained' style={{ background: colors.secondary[100] }} size='medium' href='#outlined-buttons'>Cancel</Button>
                </Stack>
                <p style={{
                    color: colors.secondary[100],
                    marginTop: 50
                }}>Organized by: Pepito Perez</p>
            </Box>
        </Box>
    );
}
