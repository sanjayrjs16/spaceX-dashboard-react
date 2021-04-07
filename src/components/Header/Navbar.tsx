import React from 'react';
import SpaceXLogo from '../../resources/SpaceX-Logo.png';
import { useStyletron, styled } from "styletron-react";

export default function Navbar() {
    const [css] = useStyletron();
    return (
     <nav className={css({
         width: '100%',
         margin: "auto"

     })}>
         <img className={css({
            margin: "auto",
         width: '70%',
         height: '5rem'
         
     })} src={SpaceXLogo} alt="SpaceX-Logo"/>
     <h1>Dashboard</h1>
         <hr />
     </nav>
    )
}
