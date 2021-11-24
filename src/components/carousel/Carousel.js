import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox } from "./../../styled/styles";

function Carousel(props) {
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const visibleImages = 3;
  const [sliderIndex, setSliderIndex] = useState(0);
  let { images } = props;
  const [sliderImages, setSliderImages] = useState([]);

  const handleFirstImages = () => {
    let sliderImages = [];
    let index = sliderIndex;
    const indexDebug = []
    while (sliderImages.length !== visibleImages) {
      if (images[index] !== props.images[currentMainIndex]) {
        if (index >= images.length) {
          index = 0;
          setSliderIndex(0);
          sliderImages.push(images[index]);
          index++;
        } else if (index <= 0) {
          setSliderIndex(images.length - 1);
          index = images.length - 1;
        } else {
          sliderImages.push(images[index]);
          index++;
        }
        indexDebug.push(index);
      } else {
        index = index+2;
      }
    }
    setSliderImages(sliderImages);
    console.log(indexDebug, "s123");
  };

  useEffect(() => {
    console.log("ok123", sliderIndex);
    handleFirstImages();
    return () => {
      handleFirstImages();
    };
  }, [sliderIndex]);

  useEffect(() => {
    handleFirstImages();
    console.log(props.images, "images");
  }, [props.images]);

  //   const handleFirstImages = (command) => {
  //       console.log("getting called");
  //     let imagesHandleImages = [];
  //     let index = currentIndex;
  //     while (imagesHandleImages.length !== visibleImages) {
  //       if (command === "increase") {
  //         index++;
  //       }
  //       if (command === "decrease") {
  //         index--;
  //       }
  //       if (index !== currentMainIndex) {
  //         //check if over length
  //         if (index > images.length) {
  //           index = 0;
  //           imagesHandleImages.push(props.images[index]);
  //         } else if (index < 0) {
  //           index = props.images.length;
  //           imagesHandleImages.push(props.images[index]);
  //         } else {
  //           index++;
  //           imagesHandleImages.push(props.images[index]);
  //         }
  //       }
  //       console.log(imagesHandleImages, "img123");
  //       setSliderImages(imagesHandleImages);
  //     }
  //   };

  const increaseCarouselSlider = () => {
      setSliderIndex(sliderIndex + 1);
  };
  const decreaseCarouselSlider = () => {
    if (sliderIndex <= 0) {
      setSliderIndex(images.length - 1);
    } else {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const handleOnClickImage = (e, index) => {
    setCurrentMainIndex(sliderIndex - 1);
  };

  if (images === undefined || images === [] || images.length === 0) {
    return <div>error</div>;
  } else {
    return (
      <CarouselStyled className={props.className} width="60vw" z="column">
        <div className="main-carousel-image">
          <img src={images[currentMainIndex]} />
        </div>
        <ButtonFlexBox width="60vw">
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
