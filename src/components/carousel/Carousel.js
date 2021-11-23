import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { FlexBox } from "./../../styled/styles";

function Carousel(props) {
  const [index, setIndex] = useState(0);
  let { images } = props;
  useEffect(() => {
    const timer = window.setInterval(() => {
      console.log("1 second has passed");
    }, 1000);
    return () => {
      // Return callback to run on unmount.
      window.clearInterval(timer);
    };
  }, [index]);

  const handleOnClickChange = () => {};

  const checkMinMax = () => {
    if (images.length == index) {
      setIndex(0);
    } else {
      increase();
    }
  };

  const increase = () => {
    setIndex((prevValue) => {
      prevValue++;
    });
  };

  const decrease = () => {
    setIndex((prevValue) => {
      prevValue--;
    });
  };

  const handleOnClickImage = (e, index) => {
    setIndex(index);
    console.log(index);
  };

  if (images === undefined || images === [] || images.length === 0) {
    return <div>error</div>;
  } else {
    return (
      <CarouselStyled className={props.className} width="60vw" z="column">
        <div className="main-carousel-image">
          <img src={images[index]} />
        </div>

        <GridKamerImagesCarousel
          pointer={true}
          gridSize="125px"
          upDown="10"
          width="200px"
        >
          {images.map((item, imagesIndex) => {
            console.log(imagesIndex, "i");
            if (!(index === imagesIndex)) {
              return (
                <div onClick={(e) => handleOnClickImage(e, imagesIndex)}>
                  <img src={item} />
                </div>
              );
            }
          })}
        </GridKamerImagesCarousel>
      </CarouselStyled>
    );
  }
}

const CarouselStyled = styled(FlexBox)`
  .main-carousel-image img {
    width: 55vw;
  }
`;

const GridKamerImagesCarousel = styled(FlexBox)`
  justify-content: flex-start;
  /* padding-right: 10px; */
  width:55vw;
  img {
    border: 3px solid #000000;
    width: 15vw;
    height: 200px;
    cursor: pointer;
    margin-right: 10px;
  }
`;
export default Carousel;
