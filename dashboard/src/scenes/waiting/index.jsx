/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import React from 'react';
import CountdownTimer from './CountDownTimer';
import meeting from "./meeting.json";

const actualMeeting = meeting[0];
const separator = "-";
const meetingStartData = actualMeeting.start_time.split(" ");
const meetingHour = meetingStartData[0];
let dates = actualMeeting.Date.split(separator);
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dateObject = new Date(`${month[parseInt(dates[1])-1]} ${dates[2]}, ${dates[0]} ${meetingHour}:00`);
let dayOfWeek = dateObject.getDay();
const meetingDateTime = dateObject.getTime();

export default function WaitingRoom() {
    return (
        <div >
            <h4 style={{textAlign: "center"}}>WAITING ROOM</h4>
            <h1 style={{textAlign: "center"}}>Your meeting is schedulet to:</h1>
            <h1 style={{textAlign: "center"}}>{daysInWeek[dayOfWeek]}, {month[parseInt(dates[1])-1]} {dates[2]} from {actualMeeting.start_time} to {actualMeeting.end_time}, {dates[0]}</h1>
            <CountdownTimer targetDate={meetingDateTime} />
            <h3 style={{textAlign: "center"}}>{actualMeeting.meeting_name}</h3>
            <h3 style={{textAlign: "center"}}>ID: {actualMeeting.id}</h3>
            <h3 style={{textAlign: "center"}}>Description: {actualMeeting.description}</h3>
            <h3 style={{textAlign: "center"}}>Time zone: {actualMeeting.time_zone}</h3>
            <h3 style={{textAlign: "center"}}>Host: {actualMeeting.host}</h3>
            <h3 style={{textAlign: "center"}}>Guests: {actualMeeting.quests.map((data) => (
                <li>{data.name}</li>
            ))}</h3>
        </div>
    );
  }