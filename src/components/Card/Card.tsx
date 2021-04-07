import React from 'react'
import { useStyletron } from "styletron-react";

import useApiCall from '../../hooks/useApiCall';


interface CardItems  {
    cardDetails: {
        flight_number: any,
        launch_date_utc: any,
        launch_site:  any,
        mission_name: any,
        mission_id: any,
        rocket: any,
        launch_success: boolean
        rocket_name: any,
        links: any,
        mission_patch_small: any
    },
    ToggleRowClick: any
};

const Card: React.FC<CardItems> = ({cardDetails, ToggleRowClick}) => {
    const [css] = useStyletron();
    let items = useApiCall('https://api.spacexdata.com/','v3/missions/', `${cardDetails.mission_id}`);
    let today = new Date();
    return (
        <>
            <tr>
                <td>
                    <aside className={css({
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
                     
                       
                    </aside>
               </td>
            </tr>
        </>
    )
}

export default Card;