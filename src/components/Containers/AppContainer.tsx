//React related
import React from 'react'
import Navbar from '../Header/Navbar'
import LaunchContainer from '../Launch/LaunchContainer';
import  CrewContainer  from '../Crew/CrewContainer';
import { HistoryPath } from '../History/HistoryPath';
import { AboutCompany } from '../About/AboutCompany';

//Redux related
import {connect} from 'react-redux';
import { setAppTheme, setToggleMenu } from '../../redux/actions/AppActionCreator';

//React router Related
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

//Styling related
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import { BaseProvider, styled, DarkTheme, LightTheme} from 'baseui';
import { Footer } from '../Footer/Footer';

const engine = new Styletron();


const Centered = styled('div', {
  display: 'flex',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '90%',
  margin: "7% auto 1% auto",
  backgroundColor: "rgba(215, 215, 215, 0.01)"
  
});
interface AppContainerItems {
  theme: any,
  setAppTheme: any,
  showMenu: any,
  setToggleMenu: any
} 
const AppContainer:React.FC<AppContainerItems> = ({theme, setAppTheme, showMenu, setToggleMenu}) => {
  
    return (
        <>
           <StyletronProvider value={engine}>
            <BaseProvider theme={theme?LightTheme:DarkTheme}>
               
                        <Router>
                        <Navbar theme={theme} setAppTheme={setAppTheme} showMenu={showMenu} setToggleMenu={setToggleMenu}/>
                    <Centered>
                         
                          <Switch>
                            <Route exact path="/">
                              <AboutCompany theme={theme}/>
                            </Route>
                            <Route exact path="/launches">
                              <LaunchContainer />
                            </Route>
                            <Route exact path="/crew">
                              <CrewContainer />
                            </Route>
                            <Route  exact path="/history">
                                <HistoryPath theme={theme}/>
                            </Route>
                          </Switch> 
                    </Centered>
                        </Router>
                    <Footer theme={theme} />
            </BaseProvider>
        </StyletronProvider>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
      theme: state.app.theme,
      showMenu: state.app.showMenu
    }
  }
  
  const mapDispatchToProps =(dispatch: any) => {
    return {
        setAppTheme: (theme: any) => { dispatch(setAppTheme(theme))},
        setToggleMenu: (showMenu: any) => { dispatch(setToggleMenu(showMenu))}
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);