/*
* @CountDownTimer.jsx Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

import useCountDown from './useCountDown';

const ExpiredNotice = () => {
    return (
        <div style={{textAlign: "center"}}>
            <h1>Meeting Time</h1>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div style={{textAlign: "center"}}>
            <h1>{days}d : {hours}h : {minutes}m : {seconds}s </h1>
        </div>
    );
};

const CountDownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountDown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
    }
};

export default CountDownTimer;