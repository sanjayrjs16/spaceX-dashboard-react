//React  related
import React from 'react'

//Styling related
import { useStyletron  } from "styletron-react";

interface HeadingItems {
    theme: boolean,
    value: string,
}
export const Heading:React.FC<HeadingItems> = ({theme, value}) => {
    
    const darkNormalColour = "rgba(210, 210, 210, 0.5)";
    const lightNormalColour = "rgba(10, 10, 10, 0.5)";
    const darkStretchColour = "rgba(255, 255, 255, 0.9)";
    const lightStretchColour = "rgba(0, 0, 0, 0.9)";

    let hoverStyle = {
        color: theme?"black":"white",
        fontSize: "2.8rem",
        margin: "0 auto 1.7rem auto",
        transform: "scale(1.01, 1.01)",
        width: "35%",
        borderTop: theme?`.1rem double ${lightNormalColour}`:`.1rem double ${darkNormalColour}`,
        borderBottom: theme?`.1rem double ${lightNormalColour}`:`.1rem double ${darkNormalColour}`,
        borderRight: theme?`0.5rem solid ${lightStretchColour}`:`0.5rem solid ${darkStretchColour}`,
        borderLeft:  theme?`0.5rem solid ${lightStretchColour}`:`0.5rem solid ${darkStretchColour}`,
        borderRadius: 0
    }

    let NormalStyle= {
                            color: theme?"rgba(0, 0, 0, 0.8)":"rgba(255, 255, 255, 0.8)",
                            width: "50%", 
                            margin: "0 auto 2rem auto",
                            padding: 0,
                            "text-align": "center",
                            fontSize: "2.5rem",
                           borderRight: theme?`3rem solid ${lightNormalColour}`:`3rem solid ${darkNormalColour}`,
                            borderLeft:  theme?`3rem solid ${lightNormalColour}`:`3rem solid ${darkNormalColour}`,
                            borderRadius: ".2rem .2rem .2rem .2rem",
                            "transition-duration": "0.25s",
                            ":hover": hoverStyle
                    }
    const [css] = useStyletron();
    return (
        <>
             <h1 className={css(NormalStyle)}>{value}</h1>
        </>
    )
}
