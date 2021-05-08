import React, {useState, useEffect} from 'react';

import { useStyletron } from "styletron-react";

import {  Drawer, SIZE, ANCHOR  } from "baseui/drawer";
import { ArrowRight, ArrowLeft, Delete} from 'baseui/icon';
import { Button, SHAPE } from "baseui/button";
import { Tag } from "baseui/tag";

interface ImageCarouselItems {
    theme: any,
    expandImage: any,
    setExpandImage: any,
    cardDetails: any
}
// This component is for the image carousel inside the InfoCardComponent(Image gallery)
export const ImageCarousel: React.FC<ImageCarouselItems> =({theme, expandImage, setExpandImage, cardDetails}) => {
    const [css] = useStyletron();
    const handelKeyPress = (event:any) => {
        event.preventDefault();
        if(event.keyCode ===37 || event.keyCode === 40){
          
            setExpandImage((prevValue: any) => { return {...prevValue, link: [cardDetails.links.flickr.original[cardDetails.links.flickr.original.indexOf(expandImage.link[0])>0?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) - 1:cardDetails.links.flickr.original.length-1]], index: cardDetails.links.flickr.original.indexOf(expandImage.link[0])>0?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) - 1:cardDetails.links.flickr.original.length-1 }
            })
        }
        else if(event.keyCode ===38 || event.keyCode === 39){
            
            setExpandImage((prevValue: any) => { return {...prevValue, link: [cardDetails.links.flickr.original[cardDetails.links.flickr.original.indexOf(expandImage.link[0])<cardDetails.links.flickr.original.length-1?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) + 1:0]], index: cardDetails.links.flickr.original.indexOf(expandImage.link[0])<cardDetails.links.flickr.original.length-1?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) + 1:0}
            })
        }
        else{
            return
        }
    }
    useEffect(() => {
        console.log("Adding event listner")
        window.addEventListener("keydown", handelKeyPress);
        return () => {
            console.log("removing event listner");
            
            window.removeEventListener("keydown", handelKeyPress);
        }
    });
    return (
        <>
            {/* <Drawer isOpen={expandImage.status}
                    onClose={(e: any) => {setExpandImage((prevValue: any) => { return {...prevValue, status: !prevValue.status}}); }}
                    size={SIZE.full}
                    anchor={ANCHOR.top}
                    showBackdrop={false}> */}
                                               
                <div className={css({width: "100%", height: "100%", background: theme?"rgba(215, 215, 215, 0.9)":"rgba(0, 0, 0, 0.9)", position: "absolute", top: 0, left: 0, display: "flex", "flex-direction": "column", "align-items": "center","justify-content": "center", padding: "0"})}
                    >
                    <Button   overrides={{
        BaseButton: {
          style: { position: "absolute", right: 0, top: 0, margin: "0.5rem 0.5rem 0 0 "}
        }
      }} shape={SHAPE.circle} onClick={() => {setExpandImage((prevValue: any) => { return {...prevValue, status: !prevValue.status}})}}>
                        <Delete title={"Close"}/>
                    </Button>
                    <div className={css({display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "center", marginTop: "0.5rem"})}>
                        <Button shape={SHAPE.circle} onClick={() => {setExpandImage((prevValue: any) => { return {...prevValue, link: [cardDetails.links.flickr.original[cardDetails.links.flickr.original.indexOf(expandImage.link[0])>0?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) - 1:cardDetails.links.flickr.original.length-1]], index: cardDetails.links.flickr.original.indexOf(expandImage.link[0])>0?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) - 1:cardDetails.links.flickr.original.length-1 }
                                                                            }
                        )}}><ArrowLeft title="Previous image"  size={36} /></Button>
                       <hr /> 
                    <div className={css({width: "90%"})}><img src={expandImage.link[0]} alt={"Mission "} className={css({"object-fit": "contain", width: "100%", height: "45rem"})}/></div>
                    <hr /> 
                    <Button shape={SHAPE.circle} onClick={() => {setExpandImage((prevValue: any) => { return {...prevValue, link: [cardDetails.links.flickr.original[cardDetails.links.flickr.original.indexOf(expandImage.link[0])<cardDetails.links.flickr.original.length-1?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) + 1:0]], index: cardDetails.links.flickr.original.indexOf(expandImage.link[0])<cardDetails.links.flickr.original.length-1?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) + 1:0}
                    
                                                                            }
                        )}}><ArrowRight  title="Next image" size={36} /></Button>
                    </div>
                    <div>
                        <Tag closeable={false} variant={"light"}>{`${expandImage.index + 1} out of ${cardDetails.links.flickr.original.length}`}</Tag>
                    </div>
                </div>
                                           
            {/* </Drawer>  */}
        </>
    )
}
