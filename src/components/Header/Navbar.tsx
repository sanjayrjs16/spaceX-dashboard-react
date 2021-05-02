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
       justifyContent: "space-around"

   })}>
        <h1>The</h1>
       <img className={css({
          marginLeft: "2rem",  
       width: '40%',
       height: '3rem'
       
   })} src={SpaceXLogo} alt="SpaceX-Logo"/>
   <h1>Dashboard</h1>
   </nav>
       <hr />
    </>
    )
}
