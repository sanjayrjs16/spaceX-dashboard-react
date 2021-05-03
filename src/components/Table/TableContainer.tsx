import React from 'react'
import TableRow from './TableRow';

import { useStyletron, styled } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';
// import { ButtonGroup, MODE } from "baseui/button-group";
// import { Button } from "baseui/button";

import {useState} from 'react';
// import axios from 'axios';

import useApiCall from '../../hooks/useApiCall';

import InfoCard from '../Card/InfoCard'; 
import PaginationButton from '../Pagination/PaginationButton';


 const  TableContainer: React.FC = () => {
   const [css] = useStyletron();
   const [currentPage, setCurrentPage] = useState(1)
   const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0});
   const [selectedRowData, setSelectedRowData] = useState({});

  let { status, data, error, isFetching, isPreviousData, items } = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launches', currentPage);
  
  const ToggleRowClick = (rowIdentifier: number) => {
       
    setShowCard((prevShowCard) => {
        return {rowIdentifier, show: !prevShowCard.show }
    })

}

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
                <th>Mission name</th>
                <th>Rocket</th>
                <th>Launch Status</th>
                <th>Launched (UTC)</th>
                <th>Launch pad</th>
                <th>Location</th>
              </TR>
            </thead>
            <tbody>
                  {status === 'loading' || (isFetching && isPreviousData)? (
                    <tr><td><StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />Please wait...</td></tr>
                  ) : status === 'error' ? (
                    <tr><td>An Error occured</td></tr>
                  ) : data.docs.map((item: any, index: number) => {
                    return  <TableRow key={index} item={item} index={index}  showCard={showCard} ToggleRowClick={ToggleRowClick} selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} />
                  })}
     
            </tbody>
      </table>
      {showCard.show && status ==="success"?<InfoCard cardDetails={selectedRowData} ToggleRowClick={ToggleRowClick} showCard={showCard.show}/>:null}
      {/* This is the pagination button */}
       {status==='success'?
    
      <PaginationButton currentPage={currentPage} totalPages={data.totalPages} setCurrentPage={setCurrentPage}  />
       :""} 
       
    </>
    )
}

export default TableContainer;