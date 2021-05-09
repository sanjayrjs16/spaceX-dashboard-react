import React, {useState} from 'react'

//Styling related
import {
    ProgressSteps,
    Step
  } from "baseui/progress-steps";
import { StyledSpinnerNext } from 'baseui/spinner';
import {  H4,Label3, Paragraph2} from 'baseui/typography';
import { useStyletron, styled } from "styletron-react";
import { Button } from 'baseui/button';

//custom hook
import useApiCall from '../../hooks/useApiCall';

export const HistoryPath = () => {
    const [css] = useStyletron();
    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/history', '','GET','history', );
    const [currentEvent, setCurrentEvent] = useState(1)
    return (
        <div className={css({width: "90%" })}>
            {status==="loading" || (isFetching)?<StyledSpinnerNext />:(status==="error"?"An error occured":(
                  <ProgressSteps
                  current={currentEvent}
                  overrides={{
                    Root: {
                      style: {backgroundColor: "grey"}
                    }
                  }}
                >
                    {data.slice().reverse().map((eventDetails: any) =>{
                       
                        return (<Step title={eventDetails.title}>
                                    <Label3><span className={css({ fontSize: "1rem"})} role="img" aria-label="history">📅 </span>{new Date(eventDetails.event_date_utc).toString()}</Label3>
                                    <Paragraph2>{eventDetails.details}</Paragraph2>
                                    <Button  onClick={() => {setCurrentEvent((prevValue: any) => prevValue>=1?prevValue - 1: prevValue)}}>Previous</Button>
                                    <Button onClick={() =>{ setCurrentEvent((prevValue: any) => prevValue<data.length?prevValue + 1: prevValue)}}>Next</Button>
                                </Step>
                    )
                    })}
            </ProgressSteps>
            ))}
        </div>
    )
}
