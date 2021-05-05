//React related
import React from 'react';
import TableContainer from './Table/TableContainer';
import  Heading  from '../Header/Heading';

//Redux related
import { connect } from 'react-redux';
import { setAppTheme } from '../../redux/actions/AppActionCreator';

//Styling related
import { useStyletron  } from "styletron-react";

//This is for containing everything related to launches
interface LaunchContainerItems {
  theme: boolean  
}
 const LaunchContainer:React.FC<LaunchContainerItems> = ({theme}) => {
    const [css] = useStyletron();
    return (
        <>
            <Heading  size={2} value={"Launches"} />
            <TableContainer theme={theme}/>
           
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        theme: state.app.theme
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAppTheme: (theme: any) => dispatch(setAppTheme(theme))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchContainer);