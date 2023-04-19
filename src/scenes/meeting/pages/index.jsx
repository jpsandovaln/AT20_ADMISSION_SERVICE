/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    Box,
    Button
} from '@mui/material';
import { AccessTime, Person } from '@mui/icons-material';
import Header from '../../../components/header';

import meetings from '../helpers/meetings';
const tableStyles = {
    padding: '16px'
};

const titleStyles = {
    fontSize: '2rem',
    margin: '16px 0'
    // center
};

const MeetingsTable = () => {
    const tryJoinMeeting = (meeting) => {
        window.location.href = `/meeting/room/${meeting.id}`;
    };

    return (
        <Box m="50px" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header title='MY MEETINGS' subtitle='' />
            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table aria-label="meetings table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Host</TableCell>
                            <TableCell>Join Meeting</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meetings.map((meeting) => (
                            <TableRow key={meeting.id}>
                                <TableCell component="th" scope="row">
                                    {meeting.meeting_name}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={meeting.description}>
                                        <span>
                                            {meeting.description.substring(0, 20)}
                                            {meeting.description.length > 20 && '...'}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{meeting.date}</TableCell>
                                <TableCell>
                                    <AccessTime />
                                    {meeting.start_time}
                                </TableCell>
                                <TableCell>
                                    <AccessTime />
                                    {meeting.end_time}
                                </TableCell>
                                <TableCell>
                                    <Person />
                                    {meeting.host}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        rel="noopener noreferrer"
                                        onClick={(e) => tryJoinMeeting(meeting)}
                                    >
                                        Join Meeting
                                    </Button>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MeetingsTable;
