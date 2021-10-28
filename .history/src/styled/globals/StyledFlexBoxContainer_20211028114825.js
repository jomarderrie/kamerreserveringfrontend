import styled from "styled-components"
import {FlexBox} from "../styles"
export const LinkFlexBoxContainer = ({className, children, x}) => {
    return (
        <StyledFlexBoxContainer className={className}
            x={x}>
            {children} </StyledFlexBoxContainer>
    )
}
export const StyledFlexBoxContainer = styled(FlexBox)`
        /* ${(props) => {
            if(props.link-box-container){

            }
        }} */
       /* .link-box-container{ */
        /* border-bottom-color: rgba(140, 130, 115, 0.12); */
     /* border-bottom: 2px solid; */
       }
    `
