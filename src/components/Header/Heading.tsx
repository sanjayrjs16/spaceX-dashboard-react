//React  related
import React from 'react'

//Redux related
import {connect} from 'react-redux';

//Styling related
import { useStyletron  } from "styletron-react";

interface HeadingItems {
    theme: boolean,
    value: string,
    size: number
}
const Heading:React.FC<HeadingItems> = ({theme, size, value}) => {
    
    const darkNormalColour = "rgba(210, 210, 210, 0.5)";
    const lightNormalColour = "rgba(10, 10, 10, 0.5)";
    const darkStretchColour = "rgba(255, 255, 255, 0.9)";
    const lightStretchColour = "rgba(0, 0, 0, 0.9)";

    let fontSize ;
    switch(size){
        case 1:{
            fontSize =2.5;
            break;
        }
        case 2: {
            fontSize=2;
            break;
        }
        case 3: {
            fontSize=1.5;
            break;
        }
        case 4: {
            fontSize=1;
            break;
        }
        case 5: {
            fontSize=0.5;
            break;
        }
        default: {
            fontSize = 0.25;
            break;
        }
    }
    let hoverStyle = {
        color: theme?"black":"white",
        width: "40%",
        borderRight: theme?`0.5rem solid ${lightStretchColour}`:`0.5rem solid ${darkStretchColour}`,
        borderLeft:  theme?`0.5rem solid ${lightStretchColour}`:`0.5rem solid ${darkStretchColour}`,
        borderRadius: 0
    }

    let NormalStyle= {
                            color: theme?"rgba(0, 0, 0, 0.8)":"rgba(255, 255, 255, 0.8)",
                            width: "50%", 
                            margin: "0 auto 1.8rem auto",
                            padding: 0,
                            "text-align": "center",
                            fontSize: `${fontSize}rem`,
                            borderRight: theme?`3rem solid ${lightNormalColour}`:`3rem solid ${darkNormalColour}`,
                            borderLeft:  theme?`3rem solid ${lightNormalColour}`:`3rem solid ${darkNormalColour}`,
                            borderRadius: ".2rem .2rem .2rem .2rem",
                            "transition-duration": "0.25s",
                            ":hover": hoverStyle
                    }
    const [css] = useStyletron();
    return (
        <>
        
             <h1 title={value} className={css(NormalStyle)}>{value}</h1>
        </>
    )
}
const mapStateToProps = (state:any) => {
    return {
        theme: state.app.theme,
    }
}
export default connect(mapStateToProps)(Heading);