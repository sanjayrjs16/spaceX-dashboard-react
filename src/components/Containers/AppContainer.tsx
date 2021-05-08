//React related
import React from 'react'
import Navbar from '../Header/Navbar'
import LaunchContainer from '../Launch/LaunchContainer';
import  CrewContainer  from '../Crew/CrewContainer';

//Redux related
import {connect} from 'react-redux';
import { setAppTheme } from '../../redux/actions/AppActionCreator';

//React router Related
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

//Styling related
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import { BaseProvider, styled, DarkTheme, LightTheme} from 'baseui';
import {  H4,Label2, Paragraph1} from 'baseui/typography';
import { useStyletron } from "styletron-react";


const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '90%',
  margin: "7% auto 1% auto",
  
});

interface AppContainerItems {
    theme: any,
    setAppTheme: any
  } 
 const AppContainer:React.FC<AppContainerItems> = ({theme, setAppTheme}) => {
    const [css] = useStyletron();
    return (
        <>
           <StyletronProvider value={engine}>
            <BaseProvider theme={theme?LightTheme:DarkTheme}>
               
                    <Navbar theme={theme} setAppTheme={setAppTheme}/>
                    <Centered>
                        <Router>
                          <Link to="/launches">Launches</Link>
                          <Link to="/crew">Crew</Link>
                          <Switch>
                            <Route path="/launches">
                              <LaunchContainer />
                            </Route>
                            <Route path="/crew">
                              <CrewContainer />
                            </Route>
                          </Switch> 
                        </Router>
                        <Label2 className={css({color: theme?"black":"white"})}>Made by Sanjay</Label2>
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