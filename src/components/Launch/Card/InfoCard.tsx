//React related
import React, {useState} from 'react'
import { ImageCarousel } from './ImageCarousel';
import  Heading  from '../../Header/Heading';


import WikiLogo from '../../../resources/Wikipedia-W-logo.svg';
import YTLogo from '../../../resources/YouTube_logo.svg';
import WebsiteLogo from '../../../resources/SpaceX-logo-mini.png';


import { useStyletron } from "styletron-react";
import {
    Card,
    StyledBody,
  } from "baseui/card";
import {  Drawer, SIZE, ANCHOR  } from "baseui/drawer";
import { Button} from "baseui/button";
import { Tag, KIND } from "baseui/tag";
import { Accordion, Panel } from "baseui/accordion";
import {
    StatefulTooltip,
    PLACEMENT,
    TRIGGER_TYPE
  } from "baseui/tooltip";
import {Block} from 'baseui/block';
import { StyledLink } from "baseui/link";
import {  H4,Label1, Paragraph1} from 'baseui/typography';


interface CardItems  {
    theme: any,
    cardDetails: any,
    ToggleRowClick?: any,
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
                    size={SIZE.full}
                    anchor={ANCHOR.bottom}
                    showBackdrop={false}
                    overrides={{
                        Root: {
                          style: ({ $theme }) => ({
                            "z-index": 10
                          })
                        }
                      }}
                >
                <Card overrides={{
                                    Root: { style: { margin: "auto", display: "flex", flexDirection: "column" } }
                 }} >
                  
                    <StyledBody>
                        <Heading size={3} value={ `Mission - ${cardDetails.name}`} />
                        <img className={css({display: "block", margin: "0 auto", width: "12rem"})}src={cardDetails.links.patch.small!=null?cardDetails.links.patch.small:WebsiteLogo} alt={"Mission patch"} />
                        <p className={css({textAlign: "center"})}><Tag closeable={false}>{`🚀 ${cardDetails.rocket.name}`}</Tag></p>
                        <p className={css({textAlign: "center"})}>{cardDetails.success!= null?(cardDetails.success?<Tag closeable={false} kind={KIND.positive}>Success</Tag>:<Tag closeable={false} kind={KIND.negative}>Failed</Tag>):<Tag closeable={false} kind={KIND.orange}>Upcoming</Tag>}</p><br />
                        
                        <div className={css({textAlign: "center"})}>
                         
                            {cardDetails.links.wikipedia!=null?<a href={cardDetails.links.wikipedia} target="_blank" rel="noreferrer" title="Wikipedia article">
                                <img className={css({ width: "2.7%", margin: "0rem 0.4rem 0px 0.4rem", background: "white", borderRadius: "50%", padding:"0.3rem 0.1rem 0.3rem 0.1rem"
                                            })} src={WikiLogo} alt="Wikipedia logo" />
                            </a>:""} 
                            {cardDetails.links.webcast!=null?<a href={cardDetails.links.webcast} target="_blank" rel="noreferrer" title="Youtube video">
                                <img className={css({ width: "2.7%",  margin: "0rem 0.4rem 0px 0.4rem"
                                            })} src={YTLogo} alt="Youtube logo" />
                            </a>:""} 
                            
                        </div>
                        <hr />
                        {cardDetails.details!=null?
                        (<><H4 className={css({textAlign: "center"})}>Description</H4>
                        <Paragraph1 className={css({
                            textAlign: "center",
                            "text-align": "justify",
                            "text-justify": "inter-word",
                            padding: "2rem"})}>{cardDetails.links.wikipedia!=null?<span>{cardDetails.details.slice(0, 700)} <StyledLink  target="_blank" rel="noreferrer" title="Description" href={cardDetails.links.wikipedia}>
                              Read more...
                          </StyledLink></span>:cardDetails.details}</Paragraph1 ></>):(cardDetails.failures.length>0?<Paragraph1 className={css({
                            "text-align": "center",
                            })}>{cardDetails.failures[0].reason}</Paragraph1>:<Paragraph1 className={css({
                                "text-align": "center",
                                })}>No description available for mission :(</Paragraph1>)}
                        
                        <div className={css({display: "flex", alignContent: "center", justifyContent: "space-between", width: "50%", margin: "auto"})}><Tag closeable={false}>Flight Number</Tag> <Label1 >{cardDetails.flight_number}</Label1></div>
                        <hr />
                        <div className={css({display: "flex", alignContent: "center", justifyContent: "space-between", width: "50%", margin: "auto"})}><Tag closeable={false}>Launch date</Tag> <Label1>{new Date(cardDetails.date_local).toString()}</Label1></div>
                        <hr />
                        <div className={css({display: "flex", alignContent: "center", justifyContent: "space-between", width: "50%", margin: "auto"})}><Tag closeable={false}>Launch site</Tag><Label1>{`${cardDetails.launchpad.full_name}, ${cardDetails.launchpad.region}`}</Label1></div>
                        <hr />
                        {/* <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Payloads</Tag> {cardDetails.rocket}</div> */}
                        <Accordion  onChange={({ expanded }) => {console.log("Clicked accordion", expanded); }}>
                            <Panel  title="Payload details">
                                {cardDetails.payloads.length>0?cardDetails.payloads.map((item: any, index: number) => {
                                    return     (    <StatefulTooltip accessibilityType={'tooltip'}
                                                                        content={() =>  { console.log("Tooltip activated!!");
                                                                            return (<Block padding={"20px"} overrides={{
                                                                Block: {
                                                                  style: {display: 'flex', flexDirection: "column"},
                                                                },
                                                              }}>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Name</Tag><p>{item.name}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Type</Tag><p>{item.type}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Lifespan</Tag><p>{item.lifespan_years?`${item.lifespan_years} year(s)`:`No data present`}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Mass(kg)</Tag><p>{item.mass_kg?item.mass_kg:`No data present`}</p></div>
                                                                <div  className={css({display: "flex", justifyContent: "flex-start"})}><Tag variant="solid" closeable={false}>Customers</Tag><p>{item.customers.length>0?item.customers:`No data present`}</p></div>
                                                            </Block>)}
                                    }showArrow
                                    returnFocus
                                    autoFocus
                                    
                                    placement={PLACEMENT.top}
                                    overrides={{
                                        Body: {
                                          style: {
                                              "z-index": 30 ,
                                          }
                                        }
                                      }}><Button >{item.name}</Button></StatefulTooltip>)
                                                      
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
                            
                                    return  <div key={index} title={"Click to view"}className={css({ ":hover":{cursor: "pointer", transform:" scale(1.05, 1.05)"}})} onClick={() => {console.log("The image has been clicked!", expandImage);setExpandImage((prevValue) => {return {...prevValue, status: !prevValue.status, link: [link], index}})}}>
                                               
                                                <img src={link} alt={"Launch pics"} className={css({ maxHeight: "18rem", width: "25rem"})} />
                                                
                                            </div>
                                    }):"No images available"}
                                </div>
                                 {expandImage.status?<ImageCarousel theme={theme} expandImage={expandImage} setExpandImage={setExpandImage} cardDetails={cardDetails} />:""}
                         
                            </Panel>
                        </Accordion>
                    </StyledBody>
                    
                </Card>
                </Drawer>
        </>
    )
}

export default InfoCard;