import React from 'react'
import TableRow from './TableRow';

import { useStyletron, styled } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';
// import { ButtonGroup, MODE } from "baseui/button-group";
// import { Button } from "baseui/button";

import {useState} from 'react';
// import axios from 'axios';

import useApiCall from '../../hooks/useApiCall';

import PaginationButton from '../Pagination/PaginationButton';


 const  TableContainer: React.FC = () => {
   const [css] = useStyletron();
   const [currentPage, setCurrentPage] = useState(1)
    
  let { status, data, error, isFetching, isPreviousData, items } = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launches', currentPage);
  

   const TR = styled("tr", () => ({
        background: "black",
        color: "white",
        border: "2rem solid black",
        "text-align": "centre",
        borderRadius: "5rem",
    }) );

    return (
    <>
        <table className={css({
                              position: "relative",
                              width: "100%",
                              "background-color": "rgba(0,0,0, 0.4)",
                               border:"solid 1px rgba(0,0,0, 0.4)"
                             })}>
            <thead>
              <TR> 
                <th>No.</th>
                <th>Launched (UTC)</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Launch Status</th>
                <th>Rocket</th>
              </TR>
            </thead>
            <tbody>
                  {status === 'loading' || (isFetching && isPreviousData)? (
                    <tr><td><StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />Please wait...</td></tr>
                  ) : status === 'error' ? (
                    <tr><td>An Error occured</td></tr>
                  ) : data.docs.map((item: any, index: number) => {
                    return  <TableRow item={item} index={index}/>
                  })}
     
            </tbody>
      </table>
      {/* This is the pagination button */}
       {status==='success'?
    
      <PaginationButton currentPage={currentPage} totalPages={data.totalPages} setCurrentPage={setCurrentPage}  />
       :""} 
       
    </>
    )
}

export default TableContainer;