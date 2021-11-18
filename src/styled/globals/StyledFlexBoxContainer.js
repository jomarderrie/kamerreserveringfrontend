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
  grid-row-gap: 2rem;
  grid-column-gap: 50px;
  img {
    width: 100%;
    display: block;
  }
`;
