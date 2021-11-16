import styled from "styled-components"
import {FlexBox, setUpDownPadding} from "../styles"

// <div className={className}
    //     <StyledFlexBoxContainer>

    //     </StyledFlexBoxContainer>
    //         {children} 
    //         </div>

export const FlexBoxUpDown = styled(FlexBox)`
    ${(props) => setUpDownPadding({upDown:props.upDown, leftRight:props.leftRight})} 
      
`