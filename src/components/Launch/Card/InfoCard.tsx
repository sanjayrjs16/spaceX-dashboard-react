import React, {useState} from 'react'

import { useStyletron } from "styletron-react";


import WikiLogo from '../../../resources/Wikipedia-W-logo.svg';
import YTLogo from '../../../resources/YouTube_logo.svg';
import WebsiteLogo from '../../../resources/SpaceX-logo-mini.png';


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
  import {
    
    ArrowRight,
    
    ArrowLeft,
  } from 'baseui/icon';
import { ImageCarousel } from './ImageCarousel';

interface CardItems  {
    theme: any,
    cardDetails: any,
    ToggleRowClick: any,
    showCard: any
};

const InfoCard: React.FC<CardItems> = ({theme, cardDetails, ToggleRowClick, showCard}) => {
    const [css] = useStyletron();
    const [expandImage, setExpandImage] = useState({status: false, link: [""], index: 0});
    // let {items} = useApiCall('https://api.spacexdata.com/','v4/launches/query', ``,'POST','launches',1, ["payloads"]);
     console.log("The mission details in Info Card", cardDetails);
  
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
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Name</Tag><p>{item.name}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Type</Tag><p>{item.type}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Lifespan</Tag><p>{item.lifespan_years?`${item.lifespan_years} year(s)`:`No data present`}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Mass(kg)</Tag><p>{item.mass_kg?item.mass_kg:`No data present`}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Customers</Tag><p>{item.customers.length>0?item.customers:`No data present`}</p></div>
                                                            </Block>
                                                        )}
                                                        placement={PLACEMENT.top}
                                                        showArrow
                                                        returnFocus
                                                        autoFocus
                                                        
                                                        >
                                                        <Button>{item.name}</Button>
                                            </StatefulTooltip>
                                }):<Tag closeable={false}>No Payloads</Tag>}
                            
                            </Panel>
                            <Panel title="Crew members">
                                <div className={css({display: "flex", "flex-direction": "row"})}>
                                        {cardDetails.crew.length>0?cardDetails.crew.map((person: any, index: number) => {
                                                return  <Card   key={index}
                                                                overrides={{Root: {style: {width: '20rem'}}}}
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
                                                            </StyledBody>
                                            
                                                        </Card>         
                                        }):"No data available"}
                                </div>
                            </Panel>
                            <Panel title="Images">
                                <div className={css({display: "grid",  "grid-template-columns": "auto auto auto auto ", "grid-template-rows": "18rem 18rem 18rem 18rem", "align-content": "space-evenly"})}>
                                    {cardDetails.links.flickr.original.length>0?cardDetails.links.flickr.original.map((link: any, index: number) => {
                            
                                    return  <div key={index} title={"Click to view"}className={css({ ":hover":{cursor: "pointer", transform:" scale(1.05, 1.05)"}})}onClick={() => {setExpandImage((prevValue) => {return {status: !prevValue.status, link: [link], index}})}}>
                                                {/* <Card
                                                    overrides={{Root: {style: {width: '26rem', maxHeight: "10rem"}}}}
                                                    headerImage={
                                                    `${link}`
                                                    }>
                                                </Card>  */}
                                                <img src={link} alt={"Launch image"} className={css({ maxHeight: "18rem", width: "25rem"})} />
                                                
                                            </div>
                                    }):"No images available"}
                                </div>
                                     <ImageCarousel expandImage={expandImage} setExpandImage={setExpandImage} cardDetails={cardDetails} />
                         
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