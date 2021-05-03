import React from 'react'

import { useStyletron } from "styletron-react";
import useApiCall from '../../hooks/useApiCall';

import WikiLogo from '../../resources/Wikipedia-W-logo.svg';
import YTLogo from '../../resources/YouTube_logo.svg';
import WebsiteLogo from '../../resources/SpaceX-logo-mini.png';
import TwitterLogo from '../../resources/Twitter-logo.png';

import {
    Card,
    StyledBody,
    StyledAction,
    StyledThumbnail,
  } from "baseui/card";

  import {  Drawer, SIZE, ANCHOR  } from "baseui/drawer";

  import { Button, SHAPE } from "baseui/button";
  import { Tag, KIND } from "baseui/tag";

  import { Accordion, Panel } from "baseui/accordion";
  
interface CardItems  {
    cardDetails: any,
    ToggleRowClick: any,
    showCard: any
};

const InfoCard: React.FC<CardItems> = ({cardDetails, ToggleRowClick, showCard}) => {
    const [css] = useStyletron();
    let {items} = useApiCall('https://api.spacexdata.com/','v4/launches/query', ``,'POST','launches',1, ["payloads"]);
    console.log("The mission details in Info Card", items);
  
    return (
        <>
             <Drawer
                    isOpen={showCard}
                    autoFocus
                    onClose={() => ToggleRowClick()}
                    size={SIZE.full}
                    anchor={ANCHOR.top}
                    showBackdrop={false}
                >
                <Card   title={`Mission - ${cardDetails.name}`}>
                    <StyledThumbnail src={cardDetails.links.patch.small!=null?cardDetails.links.patch.small:WebsiteLogo} />
                    <StyledBody>
                   
                        <p>🚀<Tag closeable={false}>{`${cardDetails.rocketData.name}`}</Tag> </p>

                        {cardDetails.success!= null?(cardDetails.success?<Tag closeable={false} kind={KIND.positive}>Success</Tag>:<Tag closeable={false} kind={KIND.negative}>Failed</Tag>):<Tag closeable={false} kind={KIND.orange}>Upcoming</Tag>}<br />
                        
                        <span>
                         
                            {cardDetails.links.wikipedia!=null?<a href={cardDetails.links.wikipedia} target="_blank" rel="noreferrer">
                                <img className={css({ width: "2.7%", margin: "0rem 0.4rem 0px 0.4rem"
                                            })} src={WikiLogo} alt="Wikipedia logo" />
                            </a>:""} 
                            {cardDetails.links.webcast!=null?<a href={cardDetails.links.webcast} target="_blank" rel="noreferrer">
                                <img className={css({ width: "2.7%",  margin: "0rem 0.4rem 0px 0.4rem"
                                            })} src={YTLogo} alt="Youtube logo" />
                            </a>:""} 
                            
                        </span>
                        {cardDetails.details!=null?
                        <p className={css({
                            "text-align": "justify",
                            "text-justify": "inter-word",
                            padding: "2rem"})}>{cardDetails.links.wikipedia!=null?<span>{cardDetails.details.slice(0, 700)}<a href={cardDetails.links.wikipedia} target="_blank" rel="noreferrer">...Read more</a></span>:cardDetails.details}</p>:<p>No description available for mission :(</p>}
                        
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Flight Number</Tag> {cardDetails.flight_number}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Launch date</Tag> {new Date(cardDetails.date_local).toString()}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Launch site</Tag>{`${cardDetails.launchData.full_name}, ${cardDetails.launchData.region}`}</div>
                        <hr />
                        {/* <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Payloads</Tag> {cardDetails.rocket}</div> */}
                        <Accordion onChange={({ expanded }) => console.log(expanded)}>
                            <Panel title="Payload details">
                                {cardDetails.payloads.length>0?cardDetails.payloads.map((item: any, index: number) => {
                                    return <Tag key={index} closeable={false}>{index}</Tag>
                                }):"No Payloads"}
                            
                            </Panel>
      
                        </Accordion>
                        <hr />
                    </StyledBody>
                    
                </Card>
                </Drawer>
        </>
    )
}

export default InfoCard;