import React, {useState} from 'react'

import InfoCard from '../Card/InfoCard'; 

import { useStyletron,  styled  } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';
import useApiCall from '../../hooks/useApiCall';

import axios from 'axios';

interface TableItems  {
    items: {
        flight_number: any,
        date_local: any,
        launchpad:  any,
        name: any,
        mission_id: any,
        rocket: any,
        success: boolean
      
        links: any,
       
       
    }[]
}

const TableRow: React.FC<TableItems> = ({items}) => {
    const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0});
    const [launchPad, setLaunchPads] = useState();
    const [css] = useStyletron();
   
    const ToggleRowClick = (rowIdentifier: number) => {
       
            setShowCard((prevShowCard) => {
                return {rowIdentifier, show: !prevShowCard.show }
            })
        
    }
    const callApi = async (resource: any) => {
        axios({url: `https://api.spacexdata.com/v4`+resource, 
            method: "get",
            data: {
              "query": {},
              "options": {}
            }
          })
          .then((res) => {
            setLaunchPads(res.data);
            console.log("Inside callApi, got the data as ", res.data);
          })
        return await launchPad;
        }
       

    
    const Td = styled("td", () => ({
        background: "white",
        padding: "0.7rem",
        margin: "1.40rem",
        border: "0"
  }) );
  
 
    return (
        <>
        
        {items.length>0?
                items.map((item, index) => {
                    return (
                        <tr key={item.date_local}  className={css({
                           
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
                            <Td>{new Date(item.date_local).toString()}</Td>
                            <Td>{item.launchpad}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.success!= null?(item.success?"Success":"Failed"):"Upcoming"}</Td>
                            <Td>{item.rocket}</Td>
                        </tr>);
                })
            : <tr><td><StyledSpinnerNext />Please wait...</td></tr>}
            {showCard.show?<InfoCard cardDetails={items[showCard.rowIdentifier]} ToggleRowClick={ToggleRowClick} />:null}

        </>
    )
}
export default TableRow;