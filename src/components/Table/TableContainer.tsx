import React from 'react'
import TableRow from './TableRow';

import { useStyletron, styled } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';
import { Pagination, SIZE } from "baseui/pagination";
// import { ButtonGroup, MODE } from "baseui/button-group";
// import { Button } from "baseui/button";

import {useState} from 'react';
// import axios from 'axios';

import useApiCall from '../../hooks/useApiCall';

import InfoCard from '../Card/InfoCard'; 
import PaginationButton from '../Pagination/PaginationButton';

interface TableContainerItems  {
  theme: boolean
}
const  TableContainer: React.FC<TableContainerItems> = ({theme}) => {
  const [css] = useStyletron();
  const [currentPage, setCurrentPage] = useState(1)
  const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0});
  const [selectedRowData, setSelectedRowData] = useState({});
  const [query, setQuery] = useState({});

  let { status, data, error, isFetching, isPreviousData, items } = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launches', {page: currentPage, populate: ["payloads", "rocket", "launchpad"]},query);
  
  const ToggleRowClick = (rowIdentifier: number) => {
       
    setShowCard((prevShowCard) => {
        return {rowIdentifier, show: !prevShowCard.show }
    })

  }

   const TR = styled("tr", () => ({
        background: theme?"white":"black",
        color: theme?"black":"white",
        border: "2rem solid black",
        "text-align": "centre",
        borderRadius: "5rem",
        padding: "2rem"
    }) );

    return (
    <>

        <table className={css({
                              position: "relative",
                              width: "100%",
                              background: theme?"rgb(217, 217, 217, 0.6)":"rgb(0, 0, 0, 0.7)",
                               border:"solid 1px rgba(0,0,0, 0.4)"
                             })}>
            <thead>
              <TR> 
                <th>No.</th>
                <th>Mission name</th>
                <th>Rocket</th>
                <th>Launch Status</th>
                <th>Launch Date</th>
                <th>Launch pad</th>
                <th>Location</th>
                <th>Orbit</th>
              </TR>
            </thead>
            <tbody>
                  {status === 'loading' || (isFetching && isPreviousData)? (
                    <tr><td><StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />Please wait...</td></tr>
                  ) : status === 'error' ? (
                    <tr><td>An Error occured</td></tr>
                  ) : data.docs.map((item: any, index: number) => {
                     return  <TableRow key={index} theme={theme} item={item} index={index}  showCard={showCard} ToggleRowClick={ToggleRowClick} selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} />
                  })}
     
            </tbody>
      </table>
      {showCard.show && status ==="success"?<InfoCard theme={theme}cardDetails={selectedRowData} ToggleRowClick={ToggleRowClick} showCard={showCard.show}/>:null}
      {/* This is the pagination button */}
       {status==='success'?
       <div className={css({   
                        width: '100%',
                        background: theme?"rgb(217, 217, 217, 0.6)":"rgb(0, 0, 0, 0.7)"})}>
          <Pagination
                numPages={data.totalPages}
                size={SIZE.compact}
                currentPage={currentPage}
                onPageChange={({ nextPage }) => {
                  setCurrentPage(
                    Math.min(Math.max(nextPage, 1), 20)
                  );
          }}
        /></div>
      // <PaginationButton currentPage={currentPage} totalPages={data.totalPages} setCurrentPage={setCurrentPage}  />
       :""} 
       
    </>
    )
}

export default TableContainer;