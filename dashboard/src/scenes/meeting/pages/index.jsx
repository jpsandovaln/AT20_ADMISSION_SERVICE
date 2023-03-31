import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    Typography,
    Box,
    Button,
} from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import Header from "../../../components/header";

import meetings from "../helpers/meetings";
const tableStyles = {
    minWidth: 650,
    padding: "16px",
};

const titleStyles = {
    fontSize: "2rem",
    margin: "16px 0",
    //center
};


const MeetingsTable = () => {
    return (
        <Box m="50px">
            <Header title='MY MEETINGS' subtitle='' />
            <TableContainer component={Paper}>
                <Table sx={tableStyles} aria-label="meetings table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Host</TableCell>
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
                                            {meeting.description.length > 20 && "..."}
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
                                        href={`https://yourmeetingroom.com/${meeting.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
