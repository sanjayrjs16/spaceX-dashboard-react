import React from 'react'
import TableRow from './TableRow';

import { useStyletron, styled } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';

import {useState, useEffect} from 'react';
import axios from 'axios';

import useApiCall from '../../hooks/useApiCall';

 const  TableContainer: React.FC = () => {
   const [css] = useStyletron();
   const [tableItems, setTableItems] = useState([])
   let {docs, totalPages, page, hasPrevPage, hasNextPage} = useApiCall('https://api.spacexdata.com/v4','/launches/query', '');
  

   const Thead = styled("thead", () => ({
        background: "black",
        color: "white",
        padding: "2rem",
        margin: "2rem",
        border: "2rem solid black",
        "text-align": "centre"
      
  }) );

  
  console.log("Inside Container component", totalPages, page, hasNextPage, hasPrevPage);
    return (
            <table className={css({
              position: "relative",
              width: "100%",
            })}>
            <Thead>
              <tr> 
                <th>No.</th>
                <th>Launched (UTC)</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Launch Status</th>
                <th>Rocket</th>
              </tr>
            </Thead>
            <tbody>
             
             {docs!=undefined?<TableRow items={docs} />:<tr><td><StyledSpinnerNext />Please wait...</td></tr>}
            </tbody>
            </table>
          

    )
}

export default TableContainer;