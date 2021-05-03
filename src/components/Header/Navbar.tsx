import React from 'react';
import SpaceXLogo from '../../resources/SpaceX-Logo.png';
import { useStyletron } from "styletron-react";

import {Button, SHAPE, KIND} from 'baseui/button';

interface NavBarItems  {
    theme: boolean,
    setTheme: any
}
 
 const Navbar:React.FC<NavBarItems> = ({theme, setTheme}) => {
    const [css] = useStyletron();
    return (
        <>
            <nav className={css({   "z-index": -10,
                                    position: "fixed",
                                    width: '100%',
                                    top: 0,
                                    margin: "0 0 0 0",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent:"space-between",
                                    color: "white",
                                })}>
            
                <img className={css({   
                                        width: '50%',
                                        height: '3rem',
                                        background: theme?"rgb(217, 217, 217, 0.4)":"rgb(0, 0, 0,0.5)",
                                        padding: "0rem 0rem 3rem 5rem",
                                        borderRadius: "0rem 0rem 5rem 5rem"
                                        })} src={SpaceXLogo} alt="SpaceX-Logo"/>

                <div className={css({ position: "absolute", top: "5%", right: "5%"})}>
                    <Button shape={SHAPE.circle} kind={KIND.primary} onClick={() =>
                                        setTheme(!theme)
                    }>{theme?"🌙":"🌞"}</Button>
                </div>
        
            </nav>
        
        </>
    )
}
export default Navbar;