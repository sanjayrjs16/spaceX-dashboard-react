import React from 'react'

//Styling related
import { Tag, VARIANT } from 'baseui/tag';
import { Paragraph3, Paragraph2 } from 'baseui/typography';
import { StyledLink } from 'baseui/link';
import { styled} from 'baseui';

//logoa and images
import sanjayLogoBlack from '../../resources/sanjay-logo-black.svg';
import sanjayLogoWhite from '../../resources/sanjay-logo-white.svg'


const FooterDiv = styled('div', {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
    width: '100%',
    margin: "auto",
    backgroundColor: "rgba(215, 215, 215, 0.3)",
    padding: "0"
    
  }); 
interface FooterItems {
    theme: any
}
export const Footer:React.FC<FooterItems> = ({theme}) => {
    return (
        <FooterDiv>
             <Paragraph2>Made by</Paragraph2>
            <StyledLink target="_blank" title="Sanjay's GitHub profile" href={"https://github.com/sanjayrjs16"}><img height={"100%"} width={"100%"}src={theme?sanjayLogoBlack:sanjayLogoWhite} alt={"Creator logo"}/></StyledLink>
            <StyledLink target="_blank" title="r/SpaceX v4 API GitHub docs" href={"https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4"}><Tag closeable={false} variant={VARIANT.solid}>using r/SpaceX🔥</Tag> </StyledLink>
               <Paragraph3>( This website is not assosciated with SpaceX in any way. It's fan made, with data from r/SpaceX Api )For official updates, please visit their official <a href={"https://www.spacex.com"} target="_black">website</a>)</Paragraph3>     
        </FooterDiv>
    )
}
