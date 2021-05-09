import React, {useState} from 'react'
import InfoCard from '../Launch/Card/InfoCard'; 
//Style related
import { Card, StyledBody} from "baseui/card";
import {Button, KIND  } from 'baseui/button';
import { Tag} from "baseui/tag";
import { useStyletron } from "styletron-react";

//svgs
import WikiLogo from '../../resources/Wikipedia-W-logo.svg';

//custom hook
import useApiCall from '../../hooks/useApiCall';

interface CrewCardItems {
    uniqueKey: any,
    person: any,
    showButton: boolean
    theme?: any
}
export const CrewCard:React.FC<CrewCardItems> = ({theme, uniqueKey, person, showButton}) => {
    const [css] = useStyletron();
    const [showCard, setShowCard] = useState({show: false, cardDetailes: {}});
    let { status, data, isFetching, isPreviousData} = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launchesCrew', {populate: ["payloads", "rocket", "launchpad", "crew"]}, {"$or": [...person.launches.map((mission:any) => ({"name" : mission.name}))]});
   // console.log("Here's crew Card data", data);
    
    const ShowCard = (cardData?: any) => {
        setShowCard((prevShowCard: any) => {
            if(cardData)
                return {...prevShowCard,  show: !prevShowCard.show, cardDetailes: cardData }
            else
            return {...prevShowCard,  show: !prevShowCard.show}
        })
    ;}
    
    return (
    <>
        <Card   key={uniqueKey}
                                    overrides={{Root: {style: {width: '20rem', marginBottom: "2rem"}}}}
                                    headerImage={
                                    `${person.image}`
                                    }
                                    title={`${person.name}`}>
                                <StyledBody>
                                    <hr />
                                    <a href={person.wikipedia} target="_blank" rel="noreferrer" title="Wikipedia page">
                                            <img className={css({ width: "10%", margin: "0rem 0.4rem 0px 0.4rem", background: "white", borderRadius: "50%", padding:"0.3rem 0.1rem 0.3rem 0.1rem"
                                                        })} src={WikiLogo} alt="Wikipedia logo" title={`${person.name} Wiki page`}/>
                                    </a>
                                    <p>Agency: <Tag closeable={false} kind={"accent"}>{person.agency}</Tag></p>
                                    <p>Status: <Tag closeable={false} kind={person.status!=="active"?"warning":"positive"}>{person.status}</Tag></p>
                                   {showButton?(status==="success"?<span>Missions: {data.docs.map((mission: any, index: number) => (<Button onClick={() => {ShowCard({...mission})}} key={index+10}>{mission.name}</Button>))} </span>:""):null}
                                </StyledBody>
        </Card>
        {showCard.show && status ==="success"?<InfoCard theme={theme} cardDetails={showCard.cardDetailes} ToggleRowClick={ShowCard} showCard={showCard.show}/>:null}
     
    </> 
                            
    )
}
