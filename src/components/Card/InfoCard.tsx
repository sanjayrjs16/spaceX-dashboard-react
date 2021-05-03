import React from 'react'

import { useStyletron } from "styletron-react";
import useApiCall from '../../hooks/useApiCall';

import WikiLogo from '../../resources/Wikipedia-W-logo.svg';
import YTLogo from '../../resources/YouTube_logo.svg';
import WebsiteLogo from '../../resources/SpaceX-logo-mini.png';


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
  
  import {
    StatefulTooltip,
    TRIGGER_TYPE,
    PLACEMENT
  } from "baseui/tooltip";
  import {Block} from 'baseui/block';
  import { Notification } from "baseui/notification";
interface CardItems  {
    theme: any,
    cardDetails: any,
    ToggleRowClick: any,
    showCard: any
};

const InfoCard: React.FC<CardItems> = ({theme, cardDetails, ToggleRowClick, showCard}) => {
    const [css] = useStyletron();
    // let {items} = useApiCall('https://api.spacexdata.com/','v4/launches/query', ``,'POST','launches',1, ["payloads"]);
    // console.log("The mission details in Info Card", items);
  
    return (
        <>
             <Drawer
                    isOpen={showCard}
                    autoFocus
                    onClose={() => ToggleRowClick()}
                    size={SIZE.auto}
                    anchor={ANCHOR.bottom}
                    showBackdrop={false}
                >
                <Card   title={`Mission - ${cardDetails.name}`}>
                    <StyledThumbnail src={cardDetails.links.patch.small!=null?cardDetails.links.patch.small:WebsiteLogo} />
                    <StyledBody>
                   
                        <p>🚀<Tag closeable={false}>{`${cardDetails.rocket.name}`}</Tag> </p>

                        {cardDetails.success!= null?(cardDetails.success?<Tag closeable={false} kind={KIND.positive}>Success</Tag>:<Tag closeable={false} kind={KIND.negative}>Failed</Tag>):<Tag closeable={false} kind={KIND.orange}>Upcoming</Tag>}<br />
                        
                        <span>
                         
                            {cardDetails.links.wikipedia!=null?<a href={cardDetails.links.wikipedia} target="_blank" rel="noreferrer" title="Wikipedia article">
                                <img className={css({ width: "2.7%", margin: "0rem 0.4rem 0px 0.4rem", background: "white", borderRadius: "50%", padding:"0.3rem 0.1rem 0.3rem 0.1rem"
                                            })} src={WikiLogo} alt="Wikipedia logo" />
                            </a>:""} 
                            {cardDetails.links.webcast!=null?<a href={cardDetails.links.webcast} target="_blank" rel="noreferrer" title="Youtube video">
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
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Launch site</Tag>{`${cardDetails.launchpad.full_name}, ${cardDetails.launchpad.region}`}</div>
                        <hr />
                        {/* <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Payloads</Tag> {cardDetails.rocket}</div> */}
                        <Accordion onChange={({ expanded }) => console.log(expanded)}>
                            <Panel title="Payload details">
                                {cardDetails.payloads.length>0?cardDetails.payloads.map((item: any, index: number) => {
                                    return        <StatefulTooltip
                                                    
                                                        key={index}
                                                        content={() => (
                                                            <Block padding={"20px"}overrides={{
                                                                Block: {
                                                                  style: {display: 'flex', flexDirection: "column"},
                                                                },
                                                              }}>
                                                                <p  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Name</Tag><p>{item.name}</p></p>
                                                                <p  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Type</Tag><p>{item.type}</p></p>
                                                                <p  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Lifespan</Tag><p>{item.lifespan_years?`${item.lifespan_years} year(s)`:`No data present`}</p></p>
                                                                <p  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Mass(kg)</Tag><p>{item.mass_kg?item.mass_kg:`No data present`}</p></p>
                                                                <p  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Customers</Tag><p>{item.customers.length>0?item.customers:`No data present`}</p></p>
                                                            </Block>
                                                        )}
                                                        triggerType={TRIGGER_TYPE.click}
                                                        showArrow
                                                        placement={PLACEMENT.top}
                                                        autoFocus
                                                        >
                                                        <Tag closeable={false}>{item.name}</Tag>
                                            </StatefulTooltip>
                                }):<Tag closeable={false}>No Payloads</Tag>}
                            
                            </Panel>
                            <Panel title="Images">
                            <div className={css({display: "flex", "flex-direction": "row"})}>
                        {cardDetails.links.flickr.original.length>0?cardDetails.links.flickr.original.map((link: any, index: number) => {
                            return  <StatefulTooltip   
                                                key={index}
                                                content={() => (
                                                   
                                                        <img className={css({ width: "20%", height: "1%"})} src={link} alt={"Launch image"} />
                                                    
                                                )}
                                                triggerType={TRIGGER_TYPE.click}
                                                showArrow
                                                placement={PLACEMENT.bottom}
                                                
                            >
                            <img className={css({ width: "10%", height: "20%"})} src={link} alt={"Launch image"} />
                </StatefulTooltip>
                                   
                        }):"No images present"}
                         </div>
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