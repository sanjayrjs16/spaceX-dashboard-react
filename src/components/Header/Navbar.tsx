import React from 'react';
import SpaceXLogo from '../../resources/SpaceX-Logo.png';
import { useStyletron } from "styletron-react";

export default function Navbar() {
    const [css] = useStyletron();
    return (
        <>
            <nav className={css({
                                    width: '100%',
                                    margin: "0 0 2% 0",
                                    display: "flex",
                                    justifyContent: "center",
                                    color: "white",
                                })}>
            
                <img className={css({   
                                        width: '50%',
                                        height: '3rem',
                                        background: "rgb(217, 217, 217, 0.7)",
                                        padding: "0rem 0rem 3rem 5rem",
                                        borderRadius: "0rem 0rem 5rem 5rem"
                                        })} src={SpaceXLogo} alt="SpaceX-Logo"/>
        
            </nav>
        
        </>
    )
}
