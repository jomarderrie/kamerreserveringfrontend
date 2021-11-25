import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox } from "./../../styled/styles";

function Carousel(props) {
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const visibleImages = 4;
  const [sliderIndex, setSliderIndex] = useState(0);
  let { images } = props;
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    handleFirstImages();
  }, []);

  useEffect(() => {
    handleFirstImages();
  }, [sliderIndex]);

  const handleFirstImages = () => {
    let sliderImages2 = [];
    let index = sliderIndex;
    while (!(sliderImages2.length === visibleImages)) {
      if (images[currentMainIndex] !== images[index]) {
        if (index > images.length - 1) {
          index = 0;
          if (images[currentMainIndex] !== images[index]) {
            sliderImages2.push(images[index]);
          }
          index++;
        } else if (index <= 0) {
          index = images.length - 1;
          if (images[currentMainIndex] !== images[index]) {
            sliderImages2.push(images[index]);
          }
        } else {
          sliderImages2.push(images[index]);
          index++;
        }
      } else {
        index++;
      }
    }
    setSliderImages(sliderImages2);
  };

  const increaseCarouselSlider = () => {
    if (sliderIndex > images.length - 1) {
      if (currentMainIndex === 0) {
        setSliderIndex(2);
      } else {
        setSliderIndex(0);
      }
    } else {
      if (currentMainIndex === sliderIndex) {
        setSliderIndex(sliderIndex + 2);
      } else {
        setSliderIndex(sliderIndex + 1);
      }
    }
  };
  const decreaseCarouselSlider = () => {
    if (sliderIndex <= 0) {
      setSliderIndex(images.length - 1);
    } else {
      if (currentMainIndex === sliderIndex - 1) {
        setSliderIndex(images.length - 1);
      } else {
        setSliderIndex(sliderIndex - 1);
      }
    }
  };
  const handleOnClickImage = (e, index) => {
    let kIndex;
    images.find((item, index) => {
      if (e.target.src === item) {
        kIndex = index;
        return index;
      }
    });
    setCurrentMainIndex(kIndex);
  };

  if (images === undefined || images === [] || images.length === 0) {
    return <div>error</div>;
  } else {
    return (
      <CarouselStyled className={props.className} width="55vw" z="column">
        <div className="main-carousel-image">
          <img src={images[currentMainIndex]} />
        </div>
        <ButtonFlexBox width="55vw">
          <button onClick={() => decreaseCarouselSlider()}>Previous</button>
          <GridKamerImagesCarousel
            pointer={true}
            gridSize="150px"
            upDown="10"
            width="200px"
          >
            {sliderImages.map((item, imagesIndex) => {
              if (sliderImages[imagesIndex] !== images[currentMainIndex]) {
                return (
                  <div onClick={(e) => handleOnClickImage(e, imagesIndex)}>
                    <img src={item} />
                  </div>
                );
              }
            })}
          </GridKamerImagesCarousel>
          <button onClick={() => increaseCarouselSlider()}>Next</button>
        </ButtonFlexBox>
      </CarouselStyled>
    );
  }
}

const CarouselStyled = styled(FlexBox)`
  .main-carousel-image img {
    width: 55vw;
    height: 45vh;
  }
`;

const ButtonFlexBox = styled(FlexBox)`
  button {
    margin: 10px;
    padding: 5px;
  }
`;

const GridKamerImagesCarousel = styled(FlexBox)`
  justify-content: flex-start;
  /* padding-right: 10px; */
  width: 55vw;
  overflow: hidden;
  button:first-child {
    margin-right: 10px;
  }
  .hidden {
    display: none;
  }
  img {
    border: 3px solid #000000;
    width: 15vw;
    height: 200px;
    cursor: pointer;
    margin-right: 10px;
  }
  .leftImg {
    margin-left: -20%;
  }
`;
export default Carousel;
