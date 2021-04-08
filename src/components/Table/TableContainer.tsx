import React from 'react'
import TableRow from './TableRow';

import { useStyletron, styled } from "styletron-react";

import {useState, useEffect} from 'react';
import axios from 'axios';

import useApiCall from '../../hooks/useApiCall';

 const  TableContainer: React.FC = () => {
   const [css] = useStyletron();

  const Thead = styled("thead", () => ({
        background: "grey",
        padding: "2rem",
        margin: "2rem",
        border: "2rem solid black"
  }) );

  let items = useApiCall('https://api.spacexdata.com/','v3/launches', '?limit=12&offset=12&sort=launch_year&order=desc');

    return (
            <table className={css({
           position: "relative",
           width: "100%",
         
          
            
          })}>
                <Thead>
                  <tr>
                    <td>No.</td>
                    <td>Launched (UTC)</td>
                    <td>Location</td>
                    <td>Mission</td>
                    <td>Orbit</td>  
                    <td>Launch Status</td>
                    <td>Rocket</td>
                  </tr>
                </Thead>
                <tbody>
                    <TableRow details={items} />
                </tbody>
            </table>
          

    )
}

export default TableContainer;