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
import { Button, KIND as BTN_KIND, SIZE as BTN_SIZE, SHAPE } from "baseui/button";
import { ArrowUp, ArrowDown } from "baseui/icon";
import {DatePicker} from 'baseui/datepicker';
import {addDays} from 'date-fns';
import { SIZE as INPUT_SIZE } from "baseui/input";
//React query related
// import {focusManager} from 'react-query';



interface TableContainerItems  {
  theme: boolean,
  query: any,//For the lauch status table filter
  setLaunchesQuery: any
}
const  TableContainer: React.FC<TableContainerItems> = ({theme, query, setLaunchesQuery}) => {
  const [css] = useStyletron();
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState({ "flight_number":"asc"});
  const [showCard, setShowCard] = useState({show: false, rowIdentifier: 0});
  const [selectedRowData, setSelectedRowData] = React.useState<any>({});
  const [launchStatusFilter, setLaunchFilter] = React.useState<any>();
  const [rangeDate, setRangeDate] = React.useState<any>([
    new Date('2006-01-01T00:00:00.000Z'),
    
  ]);
  // const [query, setQuery] = useState({});

 

  let { status, data, isFetching, isPreviousData,  refetch} = useApiCall('https://api.spacexdata.com/v4','/launches/query', '','POST','launches', {page: currentPage, populate: ["payloads", "rocket", "launchpad", "crew"], sort},query);
  
  useEffect(() => {
    console.log("Query changed", )
    if(status!="idle"){
      refetch();}
  }, [query, sort, refetch])
  
  useEffect(() => {
    console.log("Current page changed changed", )
    if(status!="idle"){
      refetch();}
  }, [currentPage, refetch])
  
  const addLaunchStatusFilter= (event:any) => { //This function to add launch status filter
    setLaunchFilter((prevFilter: any) => {return {...prevFilter, status: {filter: event.option.filter, tagType: event.option.tagType}}});
    switch(event.option.filter){
    case "All":{
      const {success, upcoming, ...newQuery} = query;
      setLaunchesQuery(newQuery);
      setCurrentPage(1);
      break;
    }
    case "Success":{
      const { upcoming, ...newQuery} = query;
      setLaunchesQuery({...newQuery, "success": true});
      setCurrentPage(1);
      break;
    }
    case "Failed":{
      const { upcoming, ...newQuery} = query;
      setLaunchesQuery({...newQuery, "success": false});
      setCurrentPage(1);
      break;
    }
    case "Upcoming":{
      const { success, ...newQuery} = query;
      setLaunchesQuery({...newQuery, "upcoming": true});
      setCurrentPage(1);
      break;
    }
}
}

const addLaunchDateFilter = (date: any[]) => {
  console.log("Got the date in here as", date);
  if(date.length<=1){
    console.log("only 1 date");
    setLaunchesQuery({...query, "date_utc": {"$gte": new Date(date[0].toString()).toJSON()}});
  }
  else{
    setLaunchesQuery({...query, "date_utc": {"$gte": new Date(date[0].toString()).toJSON(), "$lte": new Date(date[1].toString()).toJSON() }});
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
                <th>
                  Flight No.
                  <div className={css({display: "flex", justifyContent: "space-around"})} title={"Sort by flight number asc/desc"}>
                    <Button onClick={() => setSort({ "flight_number":"asc"})}
                            size={BTN_SIZE.mini}
                            shape={SHAPE.square}
                            kind={sort.flight_number==="asc"?BTN_KIND.secondary:BTN_KIND.tertiary}>
                        <ArrowUp title={"Sort ascending"}/>
                    </Button>
                    <Button onClick={() => setSort({ "flight_number":"desc"})}
                            size={BTN_SIZE.mini}
                            shape={SHAPE.square}
                            kind={sort.flight_number==="desc"?BTN_KIND.secondary:BTN_KIND.tertiary}>
                        <ArrowDown title={"Sort descending"}/>
                    </Button>
                  </div>
                </th>
                <th>Mission name</th>
                <th>Rocket</th>
                <th>
                  Launch Status
                  <Select backspaceRemoves={false}
                          clearable={false}
                          size={SIZESELECT.mini}
                          options={[
                                  {filter: "All", tagType: KIND.primary},
                                  {filter: "Success", tagType: KIND.positive},
                                  {filter: "Failed", tagType: KIND.negative},
                                  {filter: "Upcoming", tagType: KIND.orange},
                                  ]}
                          placeholder={launchStatusFilter && launchStatusFilter.status?<><Tag kind={launchStatusFilter.status.tagType} closeable={false}>{launchStatusFilter.status.filter} </Tag><Filter /></>:<><Tag kind={KIND.primary} closeable={false}>{"All"} </Tag> <Filter /></>  }
                          searchable={false}
                          labelKey="filter"
                          valueKey="filter"
                          onChange={addLaunchStatusFilter}/>
                </th>
                <th>
                  Launch Date
                  <div className={css({display: "flex", width:"100%", margin: "auto", textAlign: "center"})}>
                   
                    <DatePicker
                        range
                        value={rangeDate}
                        onChange={({date}: any) => { setRangeDate(date); addLaunchDateFilter(date); }}
                        placeholder="YYYY/MM/DD – YYYY/MM/DD"
                        size={INPUT_SIZE.mini}
                        quickSelect
                        
                    />
                     <Filter />
                  </div>
                </th>
                <th>Launch pad</th>
                <th>Location</th>
                <th>Orbit</th>
              </TR>
            </thead>
            <tbody>
                  {status === 'loading' || (isFetching )? (
                    <tr><td><StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />Please wait...</td></tr>
                  ) : status === 'error' ? (
                    <tr>An Error occured</tr>
                  ) : (data.docs.length>0?data.docs.map((item: any, index: number) => {
                    return  <TableRow key={index} theme={theme} item={item} index={index}  showCard={showCard} ToggleRowClick={ToggleRowClick} selectedRowData={selectedRowData} setSelectedRowData={setSelectedRowData} />
                 }):<tr><td></td><td></td><td></td><td></td>There are no launches for the applied filter. </tr>)}
     
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