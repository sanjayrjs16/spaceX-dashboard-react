//React related
import React from 'react';
import TableContainer from './Table/TableContainer';
import  Heading  from '../Header/Heading';

//Redux related
import { connect } from 'react-redux';
import { setLaunchesQuery } from '../../redux/actions/Launches/LaunchesActionCreator';
import Chart from './Stats/Charts';
// import { StatsContainer } from './Stats/StatsContainer';

//custom hook
import useApiCall from '../../hooks/useApiCall';

//Styling related
import {StyledSpinnerNext} from 'baseui/spinner';

//This is for containing everything related to launches
interface LaunchContainerItems {
  theme: boolean,
  query: any,
  setLauncQuery?: any
}
 const LaunchContainer:React.FC<LaunchContainerItems> = ({theme, query, setLauncQuery}) => {
    // let { status: statusUpcoming, data: dataUpcoming, isFetching: isFetchingUpcoming, isPreviousData: isPreviousDataU } = useApiCall('https://api.spacexdata.com/v4','/launches/next', '','GET','launchesNextPartial');
    // let { status: statusLatest, data: dataLatest, isFetching: isFetchingLatest, isPreviousData: isPreviousDataLatest, } = useApiCall('https://api.spacexdata.com/v4','/launches/latest', '','GET','launchesLatestPartial');
    // The above two lines, gets the unpopulated version of latest and next launces, then pass into the stats container to query each populated one(The latest and upcoming are get routes, can't query to populate the data unlinke queries route)
    //console.log("got the partial data", dataLatest)
    return (
        <>
            
            <Heading  size={2} value={"Launches"} />
            {/* {statusUpcoming === 'loading' || (isFetchingUpcoming) || statusLatest==='loading' || (isFetchingLatest)? (
                <StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />):statusUpcoming === 'error' ? "An error occured":
            <StatsContainer theme={theme}latestData={dataLatest} upcomingData={dataUpcoming} />
               } */}
            <TableContainer theme={theme} query={query} setLaunchesQuery={setLauncQuery}/>
           
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        theme: state.app.theme,
        query: state.launch.query
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
       
        setLauncQuery: (query: any) => dispatch(setLaunchesQuery(query))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);