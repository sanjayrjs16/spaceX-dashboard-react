//React related
import React, {useEffect, useState} from 'react';

//Redux related


//Router related
import {  Link } from 'react-router-dom';

//Styling related
import { useStyletron, styled } from "styletron-react";
import {Button, SHAPE, KIND, SIZE as BTNSIZE} from 'baseui/button';
import {Menu} from 'baseui/icon';
import { Drawer, SIZE, ANCHOR } from "baseui/drawer";
import { Tag, SIZE as TAG_SIZE } from 'baseui/tag';


//Images and resources
import darkThemeBG from '../../resources/planet-earth.jpg';
import lightThemeBG from '../../resources/light-theme-bg.png'
import Heading from './Heading';


const MenuItem = styled('div', { width: "100%", 
            textAlign: "center", 
            marginBottom: "2rem",
            ":hover": {
                backgroundColor: "rgba(115, 115, 115, 0.4)",
                transform: "scale(1.06, 1.06)"
            }
    
  });

interface NavBarItems  {
    theme: boolean,
    setAppTheme: any,
    showMenu: any,
    setToggleMenu: any
}
 
 const Navbar:React.FC<NavBarItems> = ({theme, setAppTheme, showMenu, setToggleMenu}) => {
    const [css] = useStyletron();
    const [hideMenu, setHideMenu] = useState(false);
    const [activeKey, setActiveKey] = React.useState<React.Key>(0);
    useEffect(() => {
        //console.log("Runnung useEffect in APpp", document.body.style)
        theme?document.body.style.backgroundImage = ` url(${lightThemeBG})`:document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${darkThemeBG})`;
      }, [theme]);
      useEffect(() => {
         // console.log("Navbar detected a scroll,");
        window.addEventListener("scroll", handleScroll)
        return () => {
           // console.log("Navbar: It stopped now, removing event listner");
            window.removeEventListener("scroll", handleScroll)
        }
      },[hideMenu])
      const handleScroll = (e: any) => {
           // console.log("Navbar: Handling it now", window.scrollY);
            const currentScrollPosition = window.scrollY;
            if(currentScrollPosition>65){
               // console.log("Navbar: Hiding now");
                setHideMenu(true);
            }
            else{
               // console.log("Navbar: Revealing now", window.scrollY);
                setHideMenu(false);
            }
      }
    return (
        <>
            <nav className={css({   "z-index": 1,
                                    position: "fixed",
                                    width: '100%',
                                    top: 0,
                                    margin: "0 0 0 0",
                                    display: hideMenu?"none":"flex",
                                    opacity: hideMenu?0:1,
                                    justifyContent: "center",
                                    alignContent:"space-between",
                                    color: "white",
                                    padding: 0,
                                   
                                })}>
                <div title={"Change theme"} className={css({ position: "absolute", top: "10%", left: "2%", display: showMenu?"none":"inline"})}>
                    <Button shape={SHAPE.circle} kind={KIND.primary} onClick={() => {setToggleMenu(showMenu)}}>
                        <Menu />
                    </Button>
                </div>                     
                <h1 className={css({     color: theme?"black":"white",
                                        fontSize: "150%",
                                        width: '30%',
                                        height: '2%',
                                        margin: 0,
                                        background: theme?"rgb(217, 217, 217, 0.4)":"rgb(0, 0, 0,0.7)",
                                        padding: "1rem",
                                        textAlign: "center",
                                        borderRadius: "0rem 0rem 5rem 5rem",
                                        border: theme?".1rem solid rgb(0, 0, 0)":".1rem solid rgb(217, 217, 217)",
                                        })} >The SpaceX dashboard</h1>

                <div title={"Change theme"} className={css({ position: "absolute", top: "15%", right: "2%"})}>
                    <Button shape={SHAPE.circle} kind={KIND.primary} onClick={() =>
                                        setAppTheme(theme)}>
                            {theme?"🌙":"🌞"}
                    </Button>
                </div>
        
            </nav>
                {showMenu?(<Drawer
                                isOpen={showMenu}
                                autoFocus
                                onClose={() => setToggleMenu(showMenu)}
                                size={SIZE.default}
                                anchor={ANCHOR.left}
                                overrides={{
                                    Root: {
                                      style: {"z-index": 3}
                                  }}}
                                >
                                   
                                    <div className={css({display: "flex", flexDirection: "column", padding: 0})}>
                                       
                                        <Heading size={4} value="Menu" />
                                        
                                        <MenuItem title={"Home"} onClick={() => {setToggleMenu(showMenu)}}>
                                            <Link to="/" > 
                                                <Button size={BTNSIZE.large} shape={SHAPE.circle} kind={KIND.secondary}>
                                                <span className={css({ fontSize: "2rem"})} role="img" aria-label="launches">🌏</span> 
                                                </Button>
                                                <Tag closeable={false} size={TAG_SIZE.large}>Home</Tag>
                                            </Link>
                                        </MenuItem>

                                        <MenuItem title={"Launch missions"} onClick={() => {setToggleMenu(showMenu)}}>
                                            <Link to="/launches" > 
                                                <Button size={BTNSIZE.large} shape={SHAPE.circle} kind={KIND.secondary}>
                                                <span className={css({ fontSize: "2rem"})} role="img" aria-label="launches">🚀</span> 
                                                </Button>
                                                <Tag closeable={false} size={TAG_SIZE.large}>Launches</Tag>
                                            </Link>
                                        </MenuItem>

                                        <MenuItem title={"Crew members"} onClick={() => {setToggleMenu(showMenu)}}>
                                            <Link to="/crew" >
                                                <Button size={BTNSIZE.large} shape={SHAPE.circle} kind={KIND.secondary}>
                                                    <span className={css({ fontSize: "2rem"})} role="img" aria-label="astronaught">🧑‍🚀</span>
                                                </Button>
                                                <Tag closeable={false} size={TAG_SIZE.large}>The Crew</Tag>
                                            </Link>
                                        </MenuItem>

                                        <MenuItem title={"History Milestones"} onClick={() => {setToggleMenu(showMenu)}}>
                                            <Link to="/history" >
                                           
                                                <Button size={BTNSIZE.large} shape={SHAPE.circle} kind={KIND.secondary}>
                                                    <span className={css({ fontSize: "2rem"})} role="img" aria-label="history">🏆</span>
                                                  
                                                </Button>
                                                <Tag closeable={false} size={TAG_SIZE.large}> Milestones</Tag>
                                            </Link>
                                        </MenuItem>
                                    </div>
                                </Drawer>):""}
        </>
    )
}

export default (Navbar);