import React, {useState} from 'react'

import Card from '../Card/Card'; 

import { useStyletron,  styled  } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';

interface TableItems  {
    details: {
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
    }[]
}

const TableRow: React.FC<TableItems> = ({details}) => {
    const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0})
    const [css] = useStyletron();
    let today = new Date();
    const ToggleRowClick = (rowIdentifier: number) => {
       
            setShowCard((prevShowCard) => {
                return {rowIdentifier, show: !prevShowCard.show }
            })
        
    }
    const Td = styled("td", () => ({
        background: "white",
        padding: "0.7rem",
        margin: "1.40rem",
        border: "0"
  }) );
    return (
        <>
        
        {details.length>0?
                details.map((item, index) => {
                    return (
                        <tr key={item.launch_date_utc}  className={css({
                           
                            padding: "2rem",
                            margin: "3rem",
                            width: "100%",
                            border: "none",
                            ":hover": {
                               transform: "scale(1.01,1.01)",
                                color: "red"
                              }
                            
                          })} onClick={() => {ToggleRowClick(index);console.log(showCard)}}>
                            <Td>{item.flight_number}</Td>
                            <Td>{item.launch_date_utc}</Td>
                            <Td>{item.launch_site.site_name}</Td>
                            <Td>{item.mission_name}</Td>
                            <Td>{item.rocket.second_stage.payloads[0].orbit}</Td>
                            <Td>{today<item.launch_date_utc?`upcoming`:(item.launch_success?`Success`:`Failed`)}</Td>
                            <Td>{item.rocket.rocket_name}</Td>
                        </tr>);
                })
            : <tr><td><StyledSpinnerNext /></td></tr>}
            {showCard.show?<Card cardDetails={details[showCard.rowIdentifier]} ToggleRowClick={ToggleRowClick} />:null}
        </>
    )
}
export default TableRow;