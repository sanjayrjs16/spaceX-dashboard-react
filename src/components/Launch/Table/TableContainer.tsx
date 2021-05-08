//React and components related
import React, {useState, useEffect} from 'react'
import TableRow from './TableRow';
import InfoCard from '../Card/InfoCard'; 
// import PaginationButton from '../../Pagination/PaginationButton';

//custom hook
import useApiCall from '../../../hooks/useApiCall';

//Styling related
import { useStyletron, styled } from "styletron-react";
import {StyledSpinnerNext} from 'baseui/spinner';
import { Pagination, SIZE } from "baseui/pagination";
import { Select, SIZE as SIZESELECT } from "baseui/select";
import { Filter} from 'baseui/icon';
import { Tag, KIND } from "baseui/tag";

//React query related
// import {focusManager} from 'react-query';



interface TableContainerItems  {
  theme: boolean,
  query: any,
  setLaunchesQuery: any
}
const  TableContainer: React.FC<TableContainerItems> = ({theme, query, setLaunchesQuery}) => {
  const [css] = useStyletron();
  const [currentPage, setCurrentPage] = useState(1)
  const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0});
  const [selectedRowData, setSelectedRowData] = useState({});
  const [statusFilter, setStatueFilter] = useState({filter: "All", tagType: KIND.primary});
  // const [query, setQuery] = useState({});

 

  let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launches', {page: currentPage, populate: ["payloads", "rocket", "launchpad", "crew"]},query);
  
  useEffect(() => {
    console.log("Query changed", )
    refetch();
  }, [query])
  
  const setLaunchFilter = (event:any) => { 
    setStatueFilter({filter: event.option.filter, tagType: event.option.tagType})
    switch(event.option.filter){
    case "All":{
      setLaunchesQuery({});
      setCurrentPage(1);
      break;
    }
    case "Success":{
      setLaunchesQuery({"success": true});
      setCurrentPage(1);
      break;
    }
    case "Failed":{
      setLaunchesQuery({"success": false});
      setCurrentPage(1);
      break;
    }
    case "Upcoming":{
      setLaunchesQuery({"upcoming": true});
      setCurrentPage(1);
      break;
    }

}
}
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
        padding: "0rem"
    }) );

    return (
    <>

        <table className={css({
                              position: "relative",
                              width: "100%",
                              background: theme?"rgb(217, 217, 217, 0.6)":"rgb(0, 0, 0, 0.7)",
                               border:theme?"solid 1px rgb(217, 217, 217, 0.4)":"solid 1px rgba(0,0,0, 0.4)"
                             })}>
            <thead>
              <TR> 
                <th>No.</th>
                <th>Mission name</th>
                <th>Rocket</th>
                <th>Launch Status <Select backspaceRemoves={false}
                                                    clearable={false}
                                                    size={SIZESELECT.mini}
                                                    options={[
                                                            {filter: "All", tagType: KIND.primary},
                                                            {filter: "Success", tagType: KIND.positive},
                                                            {filter: "Failed", tagType: KIND.negative},
                                                            {filter: "Upcoming", tagType: KIND.orange},
                                                          ]}
                                                  placeholder={<><Tag kind={statusFilter.tagType} closeable={false}>{statusFilter.filter} </Tag> <Filter /></> }
                                                 
                                                  searchable={false}
                                                  labelKey="filter"
                                                  valueKey="filter"
                                                  onChange={setLaunchFilter}/>
                </th>
                <th>Launch Date</th>
                <th>Launch pad</th>
                <th>Location</th>
                <th>Orbit</th>
              </TR>
            </thead>
            <tbody>
                  {status === 'loading' || (isFetching )? (
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