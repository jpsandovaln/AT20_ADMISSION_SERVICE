import './datetime.css';
import DateTimeDisplay from './DateTimeDisplay';
import useCountDown from './useCountDown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Meeting Time</span>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <DateTimeDisplay type="Days" value={days} />
      <p>:</p>
      <DateTimeDisplay type="Hours" value={hours} />
      <p>:</p>
      <DateTimeDisplay type="Mins" value={minutes} />
      <p>:</p>
      <DateTimeDisplay type="Seconds" value={seconds} />
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