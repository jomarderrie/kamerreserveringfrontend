import styled from "styled-components";
import { FlexBox, setUpDownPadding } from "../styles";



export const FlexBoxUpDown = styled(FlexBox)`
  ${(props) =>
    setUpDownPadding({ upDown: props.upDown, leftRight: props.leftRight })}
`;

export const ContainerKamerInfo = styled(FlexBoxUpDown)`
background-color: #8ec1e9;
`


export const GridImages = styled(FlexBoxUpDown)`
  width: ${(props) => props.width};
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${(props) =>
    `repeat(auto-fit, minmax(${props.gridSize}, 1fr));`};
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  img {
    width: 100%;
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
  }
`;

// export const GridKamerImagesCarousel = styled(FlexBox)`
// justify-content:flex-start;
//     img{
//       border: 3px solid #000000;
//       width:200px;
//       height:200px;
//       cursor:pointer;
//     }
// ` 