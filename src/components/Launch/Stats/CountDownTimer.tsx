import React, { useEffect, useState } from 'react'

//Styling related
import {  H4,Label2, Paragraph1} from 'baseui/typography';

interface TimerItems {
    date: Date
}
export const CountDownTimer:React.FC<TimerItems> = ({date}) => {
    type timeLeftType = () => any;
    let isUpcoming = true;
    const computeTimeLeft = (): any => {
        let year = new Date().getFullYear();
        var difference = +new Date(date) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
            };
          }
          else{
            difference =   +new Date() - +new Date(date) ;
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
            };
            isUpcoming = false;
          }
          return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(computeTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(computeTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
      });
      const timerComponents: any = [];

Object.keys(timeLeft).forEach((interval) => {
 
  timerComponents.push(
    <span key={interval}>
      {timeLeft[interval]} {interval}{" "}
    </span>
  );
});
    return (
       
        <div>
            <Label2>{ timerComponents }
            {isUpcoming?" to launch":" (since launch)" }</Label2>
        </div>
    )
}
