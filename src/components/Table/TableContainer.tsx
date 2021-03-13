import React from 'react'
import TableRow from './TableRow';

import {useState, useEffect} from 'react';
import axios from 'axios';

 const  TableContainer: React.FC = () => {
    let [items, setItems]: any[] = useState();
  useEffect(() => {
    axios.get('https://api.spacexdata.com/v3/launches?limit=12&sort=launch_year&order=desc')
    .then((res) => {
      setItems(res.data);
      console.log(res.data)
    })
  }, []);
    return (
        <div>
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
        </div>
    )
}

export default TableContainer;