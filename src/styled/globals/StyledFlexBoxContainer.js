import styled from "styled-components";
import { FlexBox, setUpDownPadding } from "../styles";

// <div className={className}
//     <StyledFlexBoxContainer>

//     </StyledFlexBoxContainer>
//         {children}
//         </div>

export const FlexBoxUpDown = styled(FlexBox)`
  ${(props) =>
    setUpDownPadding({ upDown: props.upDown, leftRight: props.leftRight })}
`;

export const GridImages = styled(FlexBoxUpDown)`
  width: 640px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-row-gap: 0.1rem;
  padding-bottom:20px;
  grid-column-gap: 0.1rem;
  img {
    width: 200px;
    display: block;
    height: 200px;
  }
  .imgA1{
      color:red;
      position: relative;
      bottom: -50px;
      width: 50px;
      height: 50px;
      cursor:pointer;
  }
`;
