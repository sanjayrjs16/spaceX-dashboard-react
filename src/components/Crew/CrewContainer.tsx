import React from 'react';
import Heading from '../Header/Heading';
import { CrewCard } from './CrewCard';

//Redux related
import { connect } from 'react-redux';

//custom hook
import useApiCall from '../../hooks/useApiCall';

//Styling related
import { StyledSpinnerNext } from 'baseui/spinner';
import { useStyletron } from "styletron-react";



interface CrewContainerItems {
    theme: any
}
const CrewContainer:React.FC<CrewContainerItems> = ({theme}) => {
    const [css] = useStyletron();
    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/crew/query', '','POST','crew', { populate: ["launches"]},{});
    // console.log("Here's crew data", data);
    return (
        <>
            <Heading size={1} value="Crew (aka The Dragon riders)" />
            <div className={css({display: "flex", justifyContent:"space-around", flexWrap: "wrap"})}>
                {status==="loading" || (isFetching) ? <StyledSpinnerNext  overrides={{Root: {style: { width: '100%', margin: "auto", padding: "2rem"}}}} />:(status==="error"?"Error occured":
                
                data.docs.map((person: any, index: number) => {
                    return (<CrewCard theme={theme} key={index+100} uniqueKey={index + 100} person={person} showButton={true} /> )
                })
                )
                } 
            </div>
    </>
        )
}

const mapStateToProps = (state: any) => {
    return {
        theme: state.app.theme,
        
    }
}


export default connect(mapStateToProps)(CrewContainer);