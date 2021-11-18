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
  width: ${(props) => props.width};
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(auto-fit, minmax(${props.gridSize}, 1fr));`};
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  img {
    width: 200px;
    display: block;
    height: 200px;
  }

  .imgA1 {
    color: red;
    position: relative;
    bottom: -50px;
    left: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
`;

export const kamerImagesContainer = styled(FlexBox)`
    border: 1px solid #ddd;
` 