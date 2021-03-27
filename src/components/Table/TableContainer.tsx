import React from 'react'
import TableRow from './TableRow';

import { useStyletron } from "styletron-react";

import {useState, useEffect} from 'react';
import axios from 'axios';

import useApiCall from '../../hooks/useApiCall';

 const  TableContainer: React.FC = () => {
   const [css] = useStyletron();
  //   let [items, setItems]: any[] = useState([]);
  //   let boom = useApiCall("boom");
 
  // useEffect(() => {
  //   axios.get('https://api.spacexdata.com/v3/launches?limit=12&sort=launch_year&order=desc')
  //   .then((res) => {
  //     setItems(res.data);
  //     console.log(res.data);
  //   })
  // }, []);
  let items = useApiCall('https://api.spacexdata.com/','v3/launches', '?limit=12&sort=launch_year&order=desc');

    return (
        <div  className={css({
           position: "relative",
           width: "100%"
            
          })}>
            <table>
                <thead>
                  <tr>
                        <td>No.</td>
                        <td>Launched (UTC)</td>
                        <td>Location</td>
                        <td>Mission</td>
                        <td>Orbit</td>  
                        <td>Launch Status</td>
                        <td>Rocket</td>
                  </tr>
                </thead>
                <tbody>
                    <TableRow details={items} />
                </tbody>
            </table>
            {/* <Table columns={["No.", "Launched (UTC)", "Location", "Mission", "Orbit", "Launch Status", "Rocket"]} data={items.map((item: any) => {
                return [item.flight_number, item.launch_date_utc, item.launch_site.site_name, item.mission_name, item.rocket.second_stage.payloads[0].orbit, String(item.launch_success), item.rocket.rocket_name ] 
            })} /> */}
          
        </div>
    )
}

export default TableContainer;