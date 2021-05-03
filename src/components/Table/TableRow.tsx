import React, {useState} from 'react'

import InfoCard from '../Card/InfoCard'; 

import { useStyletron,  styled  } from "styletron-react";

 import useApiCall from '../../hooks/useApiCall';

// import axios from 'axios';

import { Tag, KIND } from "baseui/tag";
import { StyledSpinnerNext } from 'baseui/spinner';
  

interface TableItems  {
    item: {
        flight_number: any,
        date_local: any,
        launchpad:  any,
        name: any,
        mission_id: any,
        rocket: any,
        success: boolean
        payloads: any,
        links: any,
       
       
    },
    index: number,
    showCard: any,
    ToggleRowClick: any,
    selectedRowData: any,
    setSelectedRowData: any
}

const TableRow: React.FC<TableItems> = ({item, index, showCard, ToggleRowClick, selectedRowData, setSelectedRowData}) => {
   // const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0});
    const [launchPad, setLaunchPads] = useState();
    const [css] = useStyletron();
   
    let { status: statusLaunch , data: launchData, error: launchError, isFetching: launchFetching } = useApiCall('https://api.spacexdata.com/v4','/launchpads/', item.launchpad,'GET', 'launchPads');
    let { status: stausRocket , data: rocketData, error: rocketError, isFetching: rocketFetching} = useApiCall('https://api.spacexdata.com/v4','/rockets/', item.rocket,'GET', 'rockets');
  
    // const ToggleRowClick = (rowIdentifier: number) => {
       
    //         setShowCard((prevShowCard) => {
    //             return {rowIdentifier, show: !prevShowCard.show }
    //         })
        
    // }
  

    
    const Td = styled("td", () => ({
       
       
        border: "0",
        padding: "0.2rem"

  }) );
  
 
    return (
        <>
      
        {index===1?console.log(rocketData, launchData):""}
                        <tr key={item.flight_number}  className={css({
                                                                        width: "100%",
                                                                        border: "none",
                                                                        color: "white",
                                                                        textAlign: "center",
                                                                        ":hover": {
                                                                            transform: "scale(1.05,1.05)",
                                                                            color: "rgb(255, 255, 128)",
                                                                            "background-color": "rgba(230, 230, 255, 0.4)",
                                                                            padding: "3rem",
                                                                            cursor: "pointer"
                                                                        }
                        })} onClick={() => {ToggleRowClick(index); setSelectedRowData({...item, launchData: {...launchData} , rocketData:{...rocketData}}); console.log(showCard)}}>
                            <Td>{item.flight_number}</Td>
                            <Td>{item.name}</Td>
                            <Td>{stausRocket==="success"?rocketData.name:<StyledSpinnerNext />}</Td>
                            <Td>{item.success!= null?(item.success?<Tag closeable={false} kind={KIND.positive}>Success</Tag>:<Tag closeable={false} kind={KIND.negative}>Failed</Tag>):<Tag closeable={false} kind={KIND.orange}>Upcoming</Tag>}</Td>
                            <Td>{new Date(item.date_local).toString()}</Td>
                            <Td>{statusLaunch==="success"?launchData.name:<StyledSpinnerNext />}</Td>
                            <Td>{statusLaunch==="success"?`${launchData.locality}, ${launchData.region}`:<StyledSpinnerNext />}</Td>
                            <Td>{item.payloads[0].orbit}</Td>
                        </tr>);
                )
            
            
        </>
    )
}
export default TableRow;