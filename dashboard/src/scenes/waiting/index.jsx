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
//import Typography from "@mui/material/Typography";
import meeting from "./meeting.json";

const actualMeeting = meeting[0];
const separator = "/";
let dates = actualMeeting.Date.split(separator);
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dateObject = new Date(`${month[parseInt(dates[0])-1]} ${parseInt(dates[1])}, ${parseInt(dates[2])}`);
let dayOfWeek = dateObject.getDay();

export default function WaitingRoom() {
    return (
        <div >
            <h4 style={{textAlign: "center"}}>WAITING ROOM</h4>
            <h1 style={{textAlign: "center"}}>Your meeting is schedulet to:</h1>
            <h1 style={{textAlign: "center"}}>{daysInWeek[dayOfWeek]}, {month[parseInt(dates[0])-1]} {dates[1]}, {actualMeeting.Start}, {dates[2]}</h1>
            <br></br>
            <h3 style={{textAlign: "center"}}>Name: {actualMeeting.Name}</h3>
            <h3 style={{textAlign: "center"}}>Meeting ID: {actualMeeting.id}</h3>
            <h3 style={{textAlign: "center"}}>Description: {actualMeeting.Description}</h3>
            <h3 style={{textAlign: "center"}}>Final time: {actualMeeting.Final}</h3>
            <h3 style={{textAlign: "center"}}>Time zone: {actualMeeting['Time zone']}</h3>
            <h3 style={{textAlign: "center"}}>Host: {actualMeeting.Host}</h3>
            <h3 style={{textAlign: "center"}}>Guests: {actualMeeting.Quests.map((data) => (
                <li>{data.name}</li>
            ))}</h3>
        </div>
    );
  }