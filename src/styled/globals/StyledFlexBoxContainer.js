import styled from "styled-components"
import {FlexBox} from "../styles"
export const LinkFlexBoxContainer = ({className, children, x}) => {
    return (<div className={className}>
            <FlexBox x={x}>
            {children}
            </FlexBox>
        </div>
    )
}
export const StyledFlexBoxContainer = styled(FlexBox)`
.link-box-container {
    padding-top:5px;
        border-bottom-color: rgba(140, 130, 115, 0.12); 
     border-bottom: 2px solid; 
}
        
`
// <div className={className}
    //     <StyledFlexBoxContainer>

    //     </StyledFlexBoxContainer>
    //         {children} 
    //         </div>