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

// import meetings from '../helpers/meetings';
import { useQuery } from '@apollo/client';
import { GET_MY_MEETINGS } from '../../../graphql/metting';

const MeetingsTable = (props) => {
  const { loginData } = props;
  const roleLogin = loginData.info._id;
  const roleData = loginData.info.role.name;

const titleStyles = {
    fontSize: '2rem',
    margin: '16px 0'
    // center
};

const MeetingsTable = () => {

    const user = JSON.parse(localStorage.getItem('loginData')).info;
    const { loading, error, data } = useQuery(GET_MY_MEETINGS, {
        variables: { id: user._id }
    });


    const tryJoinMeeting = (meeting) => {
        window.location.href = `/meeting/room/${meeting._id}`;
    };

    useEffect(() => {
        // setMeetings(data);
    }, []);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const meetings = data.myMeetings;

    return (
        <Box m="50px" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header title='MY MEETINGS' subtitle='' />
            {/* <h1>{meetings}</h1> */}
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
                                <TableCell>{meeting.date.split('T')[0]}{/*meeting.date.substring(0, 10)*/}</TableCell>
                                <TableCell>
                                    <AccessTime />
                                    {meeting.start_time.split('T')[1].split('.')[0]}{/*meeting.start_time.substring(11, 16)*/}
                                </TableCell>
                                <TableCell>
                                    <AccessTime />
                                    {meeting.end_time.split('T')[1].split('.')[0]}{/*meeting.end_time.substring(11, 16)*/}
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