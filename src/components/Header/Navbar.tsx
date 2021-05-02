import React from 'react';
import SpaceXLogo from '../../resources/SpaceX-Logo.png';
import { useStyletron, styled } from "styletron-react";

export default function Navbar() {
    const [css] = useStyletron();
    return (
        <>
            <nav className={css({
                                    width: '100%',
                                    margin: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    color: "white",
                                })}>
            
                <img className={css({   
                                        width: '40%',
                                        height: '3rem',
                                        background: "black",
                                        padding: "2rem",
                                        borderRadius: "0rem 0rem 1.1rem 1.1rem"
                                        })} src={SpaceXLogo} alt="SpaceX-Logo"/>
        
            </nav>
        <hr />
        </>
    )
}
