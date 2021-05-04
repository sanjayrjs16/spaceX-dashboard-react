//React related
import React from 'react'
import Navbar from '../Header/Navbar'
import LaunchContainer from '../Launch/LaunchContainer';

//Redux related
import {connect} from 'react-redux';
import { setAppTheme } from '../../redux/actions/AppActionCreator';

//Styling related
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider, useStyletron} from 'styletron-react';
import { BaseProvider, styled, DarkTheme, LightTheme} from 'baseui';

const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '90%',
  margin: "8% auto 2% auto"
});

interface AppContainerItems {
    theme: any,
    setAppTheme: any
  } 
 const AppContainer:React.FC<AppContainerItems> = ({theme, setAppTheme}) => {
    return (
        <>
           <StyletronProvider value={engine}>
            <BaseProvider theme={theme?LightTheme:DarkTheme}>
               
                    <Navbar theme={theme} setAppTheme={setAppTheme}/>
                    <Centered>
                        <LaunchContainer />
                    </Centered>
                
            </BaseProvider>
        </StyletronProvider>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
      theme: state.app.theme
    }
  }
  
  const mapDispatchToProps =(dispatch: any) => {
    return {
        setAppTheme: (theme: any) => { dispatch(setAppTheme(theme))}
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);