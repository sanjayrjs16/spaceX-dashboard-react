import React, {useState} from 'react'
import Chart from './Charts';
import InfoCard from '../Card/InfoCard'; 
import { CountDownTimer } from './CountDownTimer';

//Styling related
import { useStyletron, styled } from "styletron-react";
import { Accordion, Panel } from "baseui/accordion";
import { Card, StyledBody,  StyledThumbnail} from "baseui/card";
import {StyledSpinnerNext} from 'baseui/spinner';
import { Tag, KIND } from "baseui/tag";
import {Button, SIZE, KIND as btnKIND } from 'baseui/button';

//custom hook
import useApiCall from '../../../hooks/useApiCall';


interface statsContainerItems {
    theme: any,
    latestData: any,
    upcomingData: any
}
export const StatsContainer:React.FC<statsContainerItems> = ({theme, latestData, upcomingData}) => {
    const [css] = useStyletron();
    const [showCard, setShowCard] = useState({show: false, cardDetailes: {}});
    
    let { status: statusUpcoming, data: dataUpcoming, isFetching: isFetchingUpcoming, isPreviousData: isPreviousDataUpcoming } = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launchesNext', {populate: ["payloads", "rocket", "launchpad", "crew"]}, {"name": upcomingData.name});
    let { status: statusLatest, data: dataLatest, isFetching: isFetchingLatest, isPreviousData: isPreviousDataLatest, } = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launchesLatest', {populate: ["payloads", "rocket", "launchpad", "crew"]}, {"name": latestData.name});
    console.log("Stats, upcoming data", dataUpcoming, "Latest data", dataLatest)
  
    const ShowCard = () => {
        setShowCard((prevShowCard: any) => {
            return {...prevShowCard,  show: !prevShowCard.show }
        })
    }
    return (
        <>
            {statusUpcoming === 'loading' || (isFetchingUpcoming) || statusLatest==='loading' || (isFetchingLatest)? (
                <StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />):statusUpcoming === 'error' ? "An error occured":
                (
                <div className={css({display: "flex", flexDirection: "column", "justify-content": "space-around", backgroundColor: theme?"rgba(191, 191, 191, 0.6)":"rgba(0, 0, 0, 0.6)", width: "80%", })}>
                    <Chart theme={theme}/>
                    <Button kind={btnKIND.secondary} onClick={() => setShowCard({show: true, cardDetailes: dataUpcoming.docs[0]})}>
                        <Card   overrides={{Root: {style: {width: '22rem'}}}} title={`Upcoming launch`}>
                            <StyledThumbnail src={dataUpcoming.docs[0].links.patch.small}/>
                            <StyledBody>
                                <p>{dataUpcoming.docs[0].name}</p>
                                <CountDownTimer date={dataUpcoming.docs[0].date_utc} />
                            </StyledBody>
                        </Card>  
                    </Button>
                   <Button size={SIZE.compact}kind={btnKIND.secondary} onClick={() => setShowCard({show: true, cardDetailes: dataLatest.docs[0]})}>
                        <Card overrides={{Root: {style: {width: '22rem'}}}} title={`Latest launch`}>
                            <StyledThumbnail src={dataLatest.docs[0].links.patch.small}/>
                            <StyledBody>
                                <p>{dataLatest.docs[0].name}</p>
                                {dataLatest.docs[0].success?<Tag closeable={false} kind={KIND.positive}>Success</Tag>:<Tag closeable={false}  kind={KIND.negative}>Failed</Tag>}
                                <CountDownTimer date={dataLatest.docs[0].date_utc} />
                            </StyledBody>
                        </Card>  
                    </Button>
                  
                    {showCard.show && statusUpcoming ==="success"?<InfoCard theme={theme} cardDetails={showCard.cardDetailes} ToggleRowClick={ShowCard} showCard={showCard.show}/>:null}
     
                </div>)}
     
    </>)
}
