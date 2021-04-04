import React from 'react';
import SpaceXLogo from '../../resources/SpaceX-Logo.png';
import { useStyletron, styled } from "styletron-react";

export default function Navbar() {
    const [css] = useStyletron();
    return (
     <nav className={css({
         width: '100%',

     })}>
         <img className={css({
             alignItems: "center",
         width: '70%',
         height: '5rem'
         
     })} src={SpaceXLogo} alt="SpaceX-Logo"/>
         <hr />
     </nav>
    )
}
