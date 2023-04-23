/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
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
import { getMeetingData } from '../../../apis/meetingService';
import meetings from '../helpers/meetings';
import './styleMeeting.css';

const MeetingsTable = () => {
    const tryJoinMeeting = (meeting) => {
        window.location.href = `/meeting/room/${meeting.id}`;
    };

    useEffect(() => {
        const fetchMeetings = async () => {
            const meetingData = await getMeetingData();
            setMeetings(meetingData);
        };
        fetchMeetings();
    }, []);

    return (
        <Box className='general-view'>
            <Header title='MY MEETINGS' subtitle='' />
            <TableContainer component={Paper} className='table-container'>
                <Table aria-label="meetings table" className='table-view'>
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
                                <TableCell>{meeting.date}{/*meeting.date.substring(0, 10)*/}</TableCell>
                                <TableCell>
                                    <AccessTime />
                                    {meeting.start_time}{/*meeting.start_time.substring(11, 16)*/}
                                </TableCell>
                                <TableCell>
                                    <AccessTime />
                                    {meeting.end_time}{/*meeting.end_time.substring(11, 16)*/}
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
