//React related
import React from 'react'
import Navbar from '../Header/Navbar'
import LaunchContainer from '../Launch/LaunchContainer';
import  CrewContainer  from '../Crew/CrewContainer';

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
import {  Label2 } from 'baseui/typography';
import { useStyletron } from "styletron-react";
import { HistoryPath } from '../History/HistoryPath';
import { StyledLink } from 'baseui/link';
import { AboutCompany } from '../About/AboutCompany';
import { KIND, Tag, VARIANT } from 'baseui/tag';


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
    setAppTheme: any,
    showMenu: any,
    setToggleMenu: any
  } 
 const AppContainer:React.FC<AppContainerItems> = ({theme, setAppTheme, showMenu, setToggleMenu}) => {
    const [css] = useStyletron();
    return (
        <>
           <StyletronProvider value={engine}>
            <BaseProvider theme={theme?LightTheme:DarkTheme}>
               
                    <Centered>
                        <Router>
                        <Navbar theme={theme} setAppTheme={setAppTheme} showMenu={showMenu} setToggleMenu={setToggleMenu}/>
                         
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
                        </Router>
                    </Centered>
                    <div className={css({margin: "auto", textAlign: "center", color: "red", padding: "2rem"})}>
                        <StyledLink target="_blank" title="Sanjay's GitHub profile" href={"https://github.com/sanjayrjs16"}> Made by 👨‍💻 </StyledLink>
                        with <StyledLink target="_blank" title="r/SpaceX v4 API GitHub docs" href={"https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4"}>r/SpaceX </StyledLink>🔥
                    </div>
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