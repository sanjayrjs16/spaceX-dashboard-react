import React from 'react'
import { useStyletron } from "styletron-react";

interface CardItems  {
    cardDetails: {
        flight_number: any,
        launch_date_utc: any,
        launch_site:  any,
        mission_name: any,
        rocket: any,
        launch_success: boolean
        rocket_name: any,
    }
};

const Card: React.FC<CardItems> = ({cardDetails}) => {
    const [css] = useStyletron();
    return (
        <>
         {console.log("We're in table rows",cardDetails)}
        <div className={css({
           
            position: "absolute",
            top: "0",
            color: "grey",
            background: "white",
            padding: "2rem",
            margin: "3rem",
            width: "100%"
          })}> 
         
            <button>{cardDetails.flight_number}</button>
        </div>
        </>
    )
}

export default Card;