import React, {useState} from 'react'

import Card from '../Card/Card'; 

import { useStyletron } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';

interface TableItems  {
    details: {
        flight_number: any,
        launch_date_utc: any,
        launch_site:  any,
        mission_name: any,
        rocket: any,
        launch_success: boolean
        rocket_name: any,
    }[]
}

const TableRow: React.FC<TableItems> = ({details}) => {
    const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0})
    const [css] = useStyletron();
    const ToggleRowClick = (rowIdentifier: number) => {
       
            setShowCard((prevShowCard) => {
                return {rowIdentifier, show: !prevShowCard.show }
            })
        
    }
    return (
        <>
        
        {details.length>0?
                details.map((item, index) => {
                    return (
                        <tr key={item.flight_number}  className={css({
                            color: "grey",
                            background: "white",
                            padding: "8rem",
                            margin: "3rem",
                            width: "100%",
                            
                          })} onClick={() => {ToggleRowClick(index);console.log(showCard)}}>
                            <td >{item.flight_number}</td>
                            <td>{item.launch_date_utc}</td>
                            <td>{item.launch_site.site_name}</td>
                            <td>{item.mission_name}</td>
                            <td>{item.rocket.second_stage.payloads[0].orbit}</td>
                            <td>{String(item.launch_success)}</td>
                            <td>{item.rocket.rocket_name}</td>
                        </tr>);
                })
            : <StyledSpinnerNext />}
            {showCard.show?<Card cardDetails={details[showCard.rowIdentifier]} ToggleRowClick={ToggleRowClick} />:null}
        </>
    )
}
export default TableRow;