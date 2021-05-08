//React related
import React, {useEffect} from 'react';
import { useStyletron } from "styletron-react";

//Redux related


//Styling related
import {Button, SHAPE, KIND} from 'baseui/button';

//Images and resources
import SpaceXLogo from '../../resources/SpaceX-Logo.png';
import darkThemeBG from '../../resources/planet-earth.jpg';
import lightThemeBG from '../../resources/light-theme-bg.png'


interface NavBarItems  {
    theme: boolean,
    setAppTheme: any
}
 
 const Navbar:React.FC<NavBarItems> = ({theme, setAppTheme}) => {
    const [css] = useStyletron();
    useEffect(() => {
        console.log("Runnung useEffect in APpp", document.body.style)
        theme?document.body.style.backgroundImage = ` url(${lightThemeBG})`:document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${darkThemeBG})`;
      }, [theme])
    return (
        <>
            <nav className={css({   "z-index": 1,
                                    position: "fixed",
                                    width: '100%',
                                    top: 0,
                                    margin: "0 0 0 0",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent:"space-between",
                                    color: "white",
                                    padding: 0
                                })}>
            
                <img className={css({   
                                        width: '30%',
                                        height: '2.5rem',
                                        background: theme?"rgb(217, 217, 217, 0.4)":"rgb(0, 0, 0,0.7)",
                                        padding: "0rem 0rem 1rem 5rem",
                                        borderRadius: "0rem 0rem 5rem 5rem",
                                        border: theme?".1rem solid rgb(0, 0, 0)":".1rem solid rgb(217, 217, 217)",
                                        })} src={SpaceXLogo} alt="SpaceX-Logo"/>

                <div className={css({ position: "absolute", top: "5%", right: "5%"})}>
                    <Button shape={SHAPE.circle} kind={KIND.primary} onClick={() =>
                                        setAppTheme(theme)
                    }  >{theme?"🌙":"🌞"}</Button>
                </div>
        
            </nav>
        
        </>
    )
}

export default (Navbar);