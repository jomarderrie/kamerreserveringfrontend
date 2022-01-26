import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexBox } from "./../../styled/styles";
import imageNoFound from "../../images/image_not_found.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function CarouselController(props) {
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const visibleImages = 2;
  const [sliderIndex, setSliderIndex] = useState(0);
  let { images } = props;
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    props.images.map((item) =>{
      console.log(item);
    })
    console.log(props);
    // if (images.length > 3) {
    //   handleFirstImages();
    // } else {
    //   let sliderImg = [];
    //   for (let index = 1; index < images?.length; index++) {
    //     sliderImg.push(images[index]);
    //   }
    //   setSliderImages(sliderImg);
    // }
  }, []);

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

  if (images === undefined || images === [] || images?.length === 0) {
    return (
      <CarouselStyled className={props.className} width="55vw" z="column">
        <div className="main-carousel-image">
          <img src={imageNoFound} />
        </div>
      </CarouselStyled>
    );
  } else {
    return (

      <Carousel>

      {images.map((image) =>{
        return <img src={image} />
      })}
      {/* <div>
          <img src="assets/1.jpeg" />
          <p className="legend">Legend 1</p>
      </div>
      <div>
          <img src="assets/2.jpeg" />
          <p className="legend">Legend 2</p>
      </div>
      <div>
          <img src="assets/3.jpeg" />
          <p className="legend">Legend 3</p>
      </div> */}
  </Carousel>

      // <CarouselStyled className={props.className} width="55vw" z="column">
      //   <div className="main-carousel-image">
      //     <img src={images[currentMainIndex]} />
      //   </div>
      //   <ButtonFlexBox width="55vw">
      //     {images.length > 4 && (
      //       <button onClick={() => decreaseCarouselSlider()}>Previous</button>
      //     )}

      //     <GridKamerImagesCarousel
      //       pointer={true}
      //       gridSize="150px"
      //       upDown="10"
      //       width="200px"
      //     >
      //       {sliderImages.length !== 1 &&
      //         sliderImages.map((item, imagesIndex) => {
      //           if (sliderImages[imagesIndex] !== images[currentMainIndex]) {
      //             return (
      //               <div onClick={(e) => handleOnClickImage(e, imagesIndex)}>
      //                 <img src={item} />
      //               </div>
      //             );
      //           }
      //         })}
      //     </GridKamerImagesCarousel>
      //     {images.length > 4 && (
      //       <button onClick={() => increaseCarouselSlider()}>Next</button>
      //     )}
      //   </ButtonFlexBox>
      // </CarouselStyled>
    );
  }
}

const CarouselStyled = styled(FlexBox)`
  .main-carousel-image img {
    width: 35vw;
    height: 35vh;
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
  width: 35vw;
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
export default CarouselController;
