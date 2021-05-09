import React, {useState, useEffect} from 'react'

//Styling related
import {
    ProgressSteps,
    Step
  } from "baseui/progress-steps";
import { StyledSpinnerNext } from 'baseui/spinner';
import { Label3, Paragraph2} from 'baseui/typography';
import { useStyletron, styled } from "styletron-react";
import { Button } from 'baseui/button';
import { ArrowUp, ArrowDown } from "baseui/icon";

//custom hook
import useApiCall from '../../hooks/useApiCall';
import Heading from '../Header/Heading';
import { StyledLink } from 'baseui/link';

interface HistoryItems {
    theme: any
}
export const HistoryPath:React.FC<HistoryItems> = ({theme}) => {
    const [css] = useStyletron();
    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/history', '','GET','history', );
    const [currentEvent, setCurrentEvent] = useState(0)
    const handelKeyPress = (event:any) => {
        event.preventDefault();
        if(event.keyCode ===37 || event.keyCode === 40){
          
            setCurrentEvent((prevValue: any) => prevValue<=(data.length-2)?prevValue + 1: prevValue); 
            window.scrollBy(0, currentEvent*10);
        }
        else if(event.keyCode ===38 || event.keyCode === 39){
            setCurrentEvent((prevValue: any) => prevValue>=1?prevValue - 1: prevValue); 
            window.scrollBy(0, -1*currentEvent*10); 
            
        }
        else{
            return
        }
    }
    useEffect(() => {
        console.log("Adding event listner")
        window.addEventListener("keydown", handelKeyPress);
        return () => {
            console.log("removing event listner");
            
            window.removeEventListener("keydown", handelKeyPress);
        }
    });
    return (
        <>
        <Heading size={2} value="🎉 Historic milestones 🎉" />
        <div className={css({width: "100%" , display: "flex", flexDirection: "column"})}>
            {status==="loading" || (isFetching)?<StyledSpinnerNext />:(status==="error"?"An error occured":(
                <>
                <div className={css({  position: "sticky", top: 0, "z-index": 10, margin: "auto", backgroundColor: "rgba(0, 0, 0, 0.9)"})}>
                    <Button disabled={currentEvent<=0?true:false} onClick={() => {setCurrentEvent((prevValue: any) => prevValue>=1?prevValue - 1: prevValue); window.scrollBy(0, -80);}}><ArrowUp />{"Recent"}</Button>
                    <Button disabled={currentEvent>=(data.length-1)?true:false} onClick={() =>{ setCurrentEvent((prevValue: any) => prevValue<=(data.length-2)?prevValue + 1: prevValue); window.scrollBy(0, 80);}}><ArrowDown />{"Older"}</Button>
                </div>
                  <ProgressSteps
                  current={currentEvent}
               
                >
                    {data.slice().reverse().map((eventDetails: any, index: number) =>{
                       
                        return (<Step title={eventDetails.title} overrides={{Root: {
                            style: {
                                backgroundColor: currentEvent===index?(theme?"rgba(215, 215, 215, 0.9)":"rgba(0, 0, 0, 0.8)"):"rgba(115, 115, 115, 0.5)",
                                width: "100%",
                                padding: "0 0.4rem 0 0.4rem"
                            }
                        }}}>       <span className={css({ fontSize: "2rem"})} role="img" aria-label="history">🎉 </span> 
                                    <Label3><span className={css({ fontSize: "1rem"})} role="img" aria-label="history">📅 </span>{new Date(eventDetails.event_date_utc).toString()}</Label3>
                                    <p  className={css({ "textAlign": "justify",
                                "textJustify": "inter-word", width: "100%" })}>{eventDetails.details}</p>
                                <StyledLink href={eventDetails.links.article} target="_blank"> Read more..</StyledLink>
                                <hr />
                                    </Step>
                    )
                    })}
            </ProgressSteps>
            </>
            ))}
            
                                
        </div>
        </>
    )
}
