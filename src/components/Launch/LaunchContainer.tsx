//React related
import React from 'react';
import TableContainer from './Table/TableContainer';
import  Heading  from '../Header/Heading';

//Redux related
import { connect } from 'react-redux';
import { setLaunchesQuery } from '../../redux/actions/Launches/LaunchesActionCreator';

//Styling related


//This is for containing everything related to launches
interface LaunchContainerItems {
  theme: boolean,
  query: any,
  setLauncQuery?: any
  
}
 const LaunchContainer:React.FC<LaunchContainerItems> = ({theme, query, setLauncQuery}) => {
   
    return (
        <>
            
            <Heading  size={2} value={"Launches"} />
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