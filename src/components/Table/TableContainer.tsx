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
   let { status, data, error, isFetching, isPreviousData, items } = useApiCall('https://api.spacexdata.com/v4','/launches/query', '', 'launches', 1);
  

   const Thead = styled("thead", () => ({
        background: "black",
        color: "white",
        padding: "2rem",
        margin: "2rem",
        border: "2rem solid black",
        "text-align": "centre"
      
  }) );

  
  //console.log("Inside Container component", totalPages, page, hasNextPage, hasPrevPage);
    return (
    <>
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
                  {status === 'loading' ? (
                    <tr><td><StyledSpinnerNext />Please wait...</td></tr>
                  ) : status === 'error' ? (
                    <tr><td>An Error occured</td></tr>
                  ) : (
                  
                    <TableRow items={data.docs} />
                  )}
             {/* {data!=undefined?<TableRow items={data} />:<tr><td><StyledSpinnerNext />Please wait...</td></tr>} */}
            </tbody>
      </table>
       {status==='success'?
        [...Array(data.totalPages)].map((item, index) => {
         return <button>{index + 1}</button>
        })
       :""}   
    </>
    )
}

export default TableContainer;