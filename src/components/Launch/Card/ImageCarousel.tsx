import React from 'react';

import { useStyletron } from "styletron-react";

import {  Drawer, SIZE, ANCHOR  } from "baseui/drawer";
import { ArrowRight, ArrowLeft,} from 'baseui/icon';
import { Button, SHAPE } from "baseui/button";
import { Tag, KIND } from "baseui/tag";

interface ImageCarouselItems {
    expandImage: any,
    setExpandImage: any,
    cardDetails: any
}
// This component is for the image carousel inside the InfoCardComponent(Image gallery)
export const ImageCarousel: React.FC<ImageCarouselItems> =({expandImage, setExpandImage, cardDetails}) => {
    const [css] = useStyletron();
    return (
        <>
            <Drawer isOpen={expandImage.status}
                    onClose={(e: any) => {setExpandImage((prevValue: any) => { return {...prevValue, status: !prevValue.status}}); }}
                    size={SIZE.full}
                    anchor={ANCHOR.right}
                    showBackdrop={false}>
                                               
                <div className={css({display: "flex", "flex-direction": "column", "align-items": "center","justify-content": "center", padding: "0"})}>
                    
                    <div className={css({display: "flex", "flex-direction": "row", "align-items": "center", "justify-content": "center"})}>
                        <Button shape={SHAPE.circle} onClick={() => {setExpandImage((prevValue: any) => { return {...prevValue, link: [cardDetails.links.flickr.original[cardDetails.links.flickr.original.indexOf(expandImage.link[0])>0?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) - 1:cardDetails.links.flickr.original.length-1]], index: cardDetails.links.flickr.original.indexOf(expandImage.link[0])>0?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) - 1:cardDetails.links.flickr.original.length-1 }
                                                                            }
                        )}}><ArrowLeft title="Previous image"  size={36} /></Button>
                       <hr /> 
                    <img src={expandImage.link[0]} alt={"Mission image"} className={css({"object-fit": "contain", width: "100%", height: "45rem"})}/>
                    <hr /> 
                    <Button shape={SHAPE.circle} onClick={() => {setExpandImage((prevValue: any) => { return {...prevValue, link: [cardDetails.links.flickr.original[cardDetails.links.flickr.original.indexOf(expandImage.link[0])<cardDetails.links.flickr.original.length-1?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) + 1:0]], index: cardDetails.links.flickr.original.indexOf(expandImage.link[0])<cardDetails.links.flickr.original.length-1?cardDetails.links.flickr.original.indexOf(expandImage.link[0]) + 1:0}
                    
                                                                            }
                        )}}><ArrowRight  title="Next image" size={36} /></Button>
                    </div>
                    <div>
                        <Tag closeable={false} variant={"light"}>{`${expandImage.index + 1} out of ${cardDetails.links.flickr.original.length}`}</Tag>
                    </div>
                </div>
                                           
            </Drawer> 
        </>
    )
}
