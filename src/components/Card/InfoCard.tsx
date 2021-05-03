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
  import { Button } from "baseui/button";
  import { Tag, KIND } from "baseui/tag";
  
interface CardItems  {
    cardDetails: {
        flight_number: any,
        date_local: any,
        launchpad:  any,
        name: any,
        mission_id: any,
        rocket: any,
        success: boolean
      
        links: any,
    },
    ToggleRowClick: any
};

const InfoCard: React.FC<CardItems> = ({cardDetails, ToggleRowClick}) => {
    const [css] = useStyletron();
    let {items} = useApiCall('https://api.spacexdata.com/','v3/missions', `/${cardDetails.mission_id}`,'POST','missions', 1);
    console.log("The mission details in Info Card", items);
    let today = new Date();
    return (
        <>
            <tr>
                <td>
                <Card overrides={{Root: {style: {position: "absolute",  top: 0, left: 0, right: 0, width: '60%', margin: "auto", padding: "2rem"}}}}  title={cardDetails.name}>
                    <StyledThumbnail src={cardDetails.links.mission_patch_small!=null?cardDetails.links.mission_patch_small:WebsiteLogo} />
                    <StyledBody>
                        <p>{cardDetails.rocket}</p>{today<cardDetails.date_local?<Tag closeable={false} kind={KIND.orange}>Upcoming</Tag>:(cardDetails.success?<Tag closeable={false} kind={KIND.positive}>Success</Tag>:<Tag closeable={false} kind={KIND.negative}>Failed</Tag>)}
                        <br />
                        <span>
                        {cardDetails.links.article!=null?<a href={cardDetails.links.article} target="_blank" rel="noreferrer">
                                <img className={css({ width: "5%", margin: "0rem 0.05rem 0px 0.4rem"
                                            })} src={WebsiteLogo} alt="Website logo" />
                            </a>:""}  
                            {cardDetails.links.wikipedia!=null?<a href={cardDetails.links.wikipedia} target="_blank" rel="noreferrer">
                                <img className={css({ width: "2.7%", margin: "0rem 0.4rem 0px 0.4rem"
                                            })} src={WikiLogo} alt="Wikipedia logo" />
                            </a>:""} 
                            {cardDetails.links.video_link!=null?<a href={cardDetails.links.video_link} target="_blank" rel="noreferrer">
                                <img className={css({ width: "2.7%",  margin: "0rem 0.4rem 0px 0.4rem"
                                            })} src={YTLogo} alt="Youtube logo" />
                            </a>:""} 
                            {items.twitter!=null?<a href={items.twitter} target="_blank" rel="noreferrer">
                                <img className={css({ width: "2.7%", margin: "0rem 0.4rem 0px 0.4rem"
                                            })} src={TwitterLogo} alt="Twitter Logo" />
                            </a>:""} 
                        </span>
                        {items.description!=null?
                        <p className={css({
                            "text-align": "justify",
                            "text-justify": "inter-word",
                            padding: "2rem"})}>{cardDetails.links.wikipedia!=null?<span>{items.description.slice(0, 700)}<a href={cardDetails.links.wikipedia} target="_blank" rel="noreferrer">...Read more</a></span>:items.description}</p>:<p>No description available for mission :(</p>}
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Flight Number</Tag> {cardDetails.flight_number}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Mission Name</Tag> {items.mission_name}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Launch date</Tag> {cardDetails.date_local}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Rocket Name</Tag> {cardDetails.rocket}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Manufacturer</Tag> {cardDetails.date_local}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Launch site</Tag> {cardDetails.launchpad}</div>
                        <hr />
                        <div className={css({display: "flex", justifyContent: "space-between"})}><Tag closeable={false}>Orbit</Tag> {cardDetails.rocket}</div>
                        <hr />
                    </StyledBody>
                    <StyledAction>
                        <Button
                        overrides={{
                            BaseButton: { style: { borderRadius: "100%", border: "0.15rem solid white", background: "black", color:"white", width: "3%", padding:"0rem", position: "absolute", top: 0, right: 0, margin: "0.75rem" , ":hover": { color: "black", background: "white", transform: "scale(1.1, 1.1)"}} }
                        }}
                        
                       onClick={ToggleRowClick}>
                     X 
                        </Button>
                    </StyledAction>
                </Card>
                    {/* <aside className={css({
                                        position: "absolute",
                                        top: "0",
                                        color: "grey",
                                        background: "white",
                                        padding: "2rem",
                                        margin: "3rem",
                                        width: "80%",
                                        border: "0.2rem solid black"
                                    })}> 
                        {console.log("The card details are:", items, "The mission id is : ", cardDetails.mission_id)}
                       <h3>{cardDetails.mission_name}</h3>
                       {cardDetails.links.mission_patch_small!=null?<img className={css({
                           width: "10%"
                       })}src={cardDetails.links.mission_patch_small} alt="mission patch image" />:""}
                       <span>{today<cardDetails.launch_date_utc?`upcoming`:(cardDetails.launch_success?`Success`:`Failed`)}</span>
                       <a href={items.wikipedia} target="_blank">Wikipedia</a>
                       <a href={items.website} target="_blank">Website</a>
                       <a href={items.twitter} target="_blank">Twitter</a>
                       <a href={`https://www.youtube.com/watch?v=${cardDetails.links.youtube_id}`} target="_blank">Twitter</a>
                       <button onClick={ToggleRowClick}>X</button>
                       <div>{items.description}</div>
                       <div>{cardDetails.flight_number}</div>
                       <div>{items.mission_name}</div>
                       <div>{cardDetails.launch_date_utc}</div>
                       <div>{cardDetails.rocket_name}</div>
                     
                       
                    </aside> */}
               </td>
            </tr>
        </>
    )
}

export default InfoCard;