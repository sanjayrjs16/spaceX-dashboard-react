import React from 'react'
import Heading from '../Header/Heading';


//Styling related//Styling related
import { StyledSpinnerNext } from 'baseui/spinner';
import {  styled } from "styletron-react";
import {
    Display1,
    Display2,
    Display4,
  } from 'baseui/typography';
  //custom hook
import useApiCall from '../../hooks/useApiCall';

//images
import earth from '../../resources/planet-earth.jpg'
interface AboutRoadsterItems {
    theme: any
}
export const AboutRoadster:React.FC<AboutRoadsterItems> = ({theme}) => {
    let { status, data, isFetching, isPreviousData, refetch} = useApiCall('https://api.spacexdata.com/v4','/roadster', '','GET','aboutRoadster', );
    const RoadsterContainer = styled('div',{    
        width: "100%",
        height: "50rem",
        backgroundImage : data?`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.flickr_images[1]})`:earth,
       " background-attachment": "fixed",
        "background-repeat": "no-repeat",
        "background-size": "cover",
        color: "white",
        textAlign: "center",
        marginBottom: "2rem"
    })
    return (
        <>
             
           
            {status==="loading" || (isFetching)?<StyledSpinnerNext />:(status==="error"?"An error occured!":(
                <RoadsterContainer>
                    <h1>{data.name}</h1>
                    <Display1 color={"white"}marginBottom="scale500">{`${data.earth_distance_km.toFixed(2)} km `}</Display1>
                    <Display4 color={"white"}marginBottom="scale500">from 🌏, at </Display4>
                    <Display2 color={"white"}marginBottom="scale500">{`${data.speed_kph.toFixed(2)} km/h`}</Display2>
                    <Display4 color={"white"}marginBottom="scale500">speed and is</Display4>
                    <Display2 color={"white"}marginBottom="scale500">{`${data.mars_distance_km.toFixed(2)} km`}</Display2>
                    <Display4 color={"white"}marginBottom="scale500">from Mars.</Display4>
                   <h2>{data.details}</h2>
                </RoadsterContainer>))}
        </>
    )
}
