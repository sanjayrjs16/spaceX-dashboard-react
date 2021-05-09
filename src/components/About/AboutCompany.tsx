import React from 'react'
import Heading from '../Header/Heading';
import { AboutRoadster } from './AboutRoadster';

//Styling related
import { StyledSpinnerNext } from 'baseui/spinner';
import { Tag, KIND, VARIANT } from 'baseui/tag';
import { useStyletron, styled } from "styletron-react";
import { StyledLink } from 'baseui/link';
import {
    Display1,
    Display2,
    Display4,
  } from 'baseui/typography';

//images
import earth from '../../resources/light-theme-bg.jpg'

//custom hook
import useApiCall from '../../hooks/useApiCall';


interface AboutCompanyItems {
    theme: any
}
export const AboutCompany:React.FC<AboutCompanyItems> = ({theme}) => {
    const AboutContainer = styled('div', {
        padding: "2rem",
        color: theme?"white":"white",
        width: '100%', 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        textAlign: "justify", 
        height: "30rem",
        backgroundImage : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${earth})`,
       " background-attachment": "fixed",
        "background-repeat": "no-repeat",
        "background-size": "cover",

});

    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/company', '','GET','aboutCompany', );
    const [css] = useStyletron();
    return (
        <>
            <Heading size={1} value={"Home"} />
            <AboutRoadster theme={theme}/>
            {status==="loading" || (isFetching)?<StyledSpinnerNext />:(status==="error"?"An error occured!":(
                <AboutContainer>
                        <hr />
                        <Display4 alignSelf={"center"} color={"white"}marginBottom="scale500">Summary</Display4>
                        <h4>{data.summary}</h4>
                        <div className={css({display: "flex", "justifyContent": "space-between"})}>
                            <h3><Tag closeable={false} kind={KIND.orange} variant={VARIANT.solid}>H.Q</Tag>{`${data.headquarters.address}, ${data.headquarters.city}, ${data.headquarters.state}`}</h3>
                            <h3> <Tag closeable={false} kind={KIND.blue} variant={VARIANT.solid}>Founded</Tag>{data.founded}</h3>
                            <h3><Tag closeable={false} kind={KIND.green} variant={VARIANT.solid}>Valuation</Tag> {`${data.valuation/1000000000} billion💲`}</h3>
                            <h3><Tag closeable={false} kind={KIND.purple} variant={VARIANT.solid}>Employees</Tag>{data.employees}</h3>
                            <h3><Tag closeable={false} kind={KIND.orange} variant={VARIANT.solid}>Vehicles</Tag>{data.vehicles}</h3>
                            <h3><Tag closeable={false} kind={KIND.brown} variant={VARIANT.solid}>Launch sites</Tag>{data.launch_sites}</h3>
                        </div>
                        <Display4 alignSelf={"center"} color={"white"}marginBottom="scale500">Key people</Display4>
                        <div className={css({display: "flex", "justifyContent": "space-between"})}>
                            <h3><Tag closeable={false}  kind={KIND.green} variant={VARIANT.solid}>Founder</Tag> {data.founder}</h3>
                            <h3><Tag closeable={false} kind={KIND.red} variant={VARIANT.solid}>C.E.O</Tag> {data.ceo}</h3>
                            <h3><Tag closeable={false} kind={KIND.blue} variant={VARIANT.solid}>C.O.O</Tag>{data.coo}</h3>
                            <h3><Tag closeable={false} kind={KIND.purple} variant={VARIANT.solid}>C.T.O</Tag>{data.cto}</h3>
                            <h3><Tag closeable={false} kind={KIND.orange} variant={VARIANT.solid}>C.T.O Propulsion</Tag>{data.cto_propulsion}</h3>
                        </div>
                        <hr />
                        <Display4 alignSelf={"center"} color={"white"}marginBottom="scale500">Links</Display4>
                        <div className={css({display: "flex", "justifyContent": "space-evenly"})}>
                            <StyledLink href={data.links.website} target="_blank"><Tag closeable={false} variant={VARIANT.solid}>Website</Tag></StyledLink>
                            <StyledLink href={data.links.website}><Tag closeable={false} kind={KIND.blue} variant={VARIANT.solid}   >Twitter</Tag></StyledLink>
                            <StyledLink href={data.links.website}><Tag closeable={false} kind={KIND.blue} variant={VARIANT.solid}   >Elon's Twitter</Tag></StyledLink>
                        </div>
                   
                </AboutContainer>
            ))}
        </>
    )
}
