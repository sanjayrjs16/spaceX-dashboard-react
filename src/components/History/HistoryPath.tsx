import React, {useState, useEffect} from 'react'
import Heading from '../Header/Heading';

//Styling related
import {
    ProgressSteps,
    NumberedStep
  } from "baseui/progress-steps";
import { StyledSpinnerNext } from 'baseui/spinner';
import { Label3,Paragraph3} from 'baseui/typography';
import { useStyletron, styled } from "styletron-react";
import { Button } from 'baseui/button';
import { ArrowUp, ArrowDown } from "baseui/icon";
import { StyledLink } from 'baseui/link';

//custom hook
import useApiCall from '../../hooks/useApiCall';

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
            setCurrentEvent((prevValue: any) => prevValue>=1?prevValue - 1: prevValue); 
            window.scrollBy(0, currentEvent*10);
        }
        else if(event.keyCode ===38 || event.keyCode === 39){

            setCurrentEvent((prevValue: any) => prevValue<=(data.length-2)?prevValue + 1: prevValue); 
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
    useEffect(() => {
        if(data)
            setCurrentEvent(data.length-1)
    }, [data])
    return (
        <>
        <Heading size={2} value="🎉 Historic milestones 🎉" />
        <h2 title={"Motivational caption"}className={css({color: theme?"black":"white"})}>Started from the bottom, now we're here !</h2>
        <div className={css({width: "100%" , display: "flex", flexDirection: "column"})}>
            {status==="loading" || (isFetching)?<StyledSpinnerNext />:(status==="error"?"An error occured":(
                <>
                <div className={css({  position: "sticky", top: 0, "z-index": 10, margin: "auto", backgroundColor: "rgba(0, 0, 0, 0.9)"})} title={"Click or use arrow keys to move"}>
                    <Button disabled={currentEvent>=(data.length-1)?true:false} onClick={() => {setCurrentEvent((prevValue: any) => prevValue<=(data.length-2)?prevValue + 1: prevValue); window.scrollBy(0, -1*currentEvent*10);}}><ArrowUp />{"See recent milestone"}</Button>
                    <Button disabled={ currentEvent<=0?true:false} onClick={() =>{setCurrentEvent((prevValue: any) => prevValue>=1?prevValue - 1: prevValue); window.scrollBy(0, currentEvent*11);}}><ArrowDown />{"See past milestone"}</Button>
                </div>
                  <ProgressSteps
                        current={currentEvent}
                        overrides={{Root: {
                            style: {display: "flex", flexDirection: "column-reverse"}
                        }}}
                >
                    {data.map((eventDetails: any, index: number) =>{
                       
                        return (<NumberedStep key={index}title={eventDetails.title} overrides={{Root: {
                            style: {
                               backgroundColor: currentEvent===index?(theme?"rgba(215, 215, 215, 0.7)":"rgba(0, 0, 0, 0.8)"):"rgba(115, 115, 115, 0.3)",
                                width: "100%",
                                
                            }
                        }}}  >       
                                    <Label3><span className={css({ fontSize: "1rem"})} role="img" aria-label="history">📅 </span>{new Date(eventDetails.event_date_utc).toString()}</Label3>
                                    <Paragraph3  ><span className={css({ fontSize: "2rem"})} role="img" aria-label="history">🎉 </span> {eventDetails.details}</Paragraph3>
                                <StyledLink href={eventDetails.links.article} target="_blank"> Read more..</StyledLink>
                               
                                    </NumberedStep>
                    )
                    })}
            </ProgressSteps>
            </>
            ))}
            
                                
        </div>
        </>
    )
}
