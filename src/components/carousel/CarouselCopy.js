import React from "react";
import styled  from 'styled-components';
const visible_images = 3;

class CarouselCopy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 3
    };
    this.sliderImg = {};
  }

  componentDidMount() {
    this.showVisibleSlider();
  }

  showVisibleSlider = () => {
    let { currentIndex } = this.state;
    for (let i = currentIndex - visible_images; i < currentIndex; i++) {
      if (i === currentIndex - visible_images) {
        this.sliderImg[i].classList.add("leftImg");
        this.sliderImg[i].classList.remove("hidden");
      } else {
        if (this.sliderImg[i].classList.contains("leftImg"))
          this.sliderImg[i].classList.remove("leftImg");
        this.sliderImg[i].classList.remove("hidden");
      }
    }
  };

  changeImages = () => {
    Object.keys(this.sliderImg).forEach(item => {
      this.sliderImg[item].classList.add("hidden");
    });
    this.showVisibleSlider();
  };

  renderImages = () => {
      
    return this.props.images.map((item, index) => {
      let classname = "imageWrapper hidden";
      return (
        <div
          className={classname}
          key={index}
          id={`img${index}`}
          ref={instance => (this.sliderImg[index] = instance)}
        >
          <img src={item} class="sliderImg" alt="" />
        </div>
      );
    });
  };

  rightHandler = () => {
    this.setState(
      prevState => {
        return {
          currentIndex:
            prevState.currentIndex + 1 > this.props.images.length
              ? visible_images
              : prevState.currentIndex + 1
        };
      },
      () => this.changeImages()
    );
  };

  lefthandler = () => {
    this.setState(
      prevState => {
        return {
          currentIndex:
            prevState.currentIndex - 1 < visible_images
              ? 3
              : prevState.currentIndex - 1
        };
      },
      () => this.changeImages()
    );
  };

  render() {
    return (
      <CarouselStyledDiv>
        <div className="container">{this.renderImages()}</div>
        <div>
          <button className="leftArrow" onClick={this.lefthandler}>
            Left
          </button>
          <button className="rightArrow" onClick={this.rightHandler}>
            Right
          </button>
        </div>
      </CarouselStyledDiv>
    );
  }
}

const CarouselStyledDiv = styled.div`

body {
  margin: 8px 0;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

.imageWrapper {
  width: 300px;
  padding: 5px;
}

.sliderImg {
  width: inherit;
  object-fit: cover;
  padding: 10px;
}

.leftImg {
  margin-left: -20%;
}

.leftArrow {
  float: left;
}

.rightArrow {
  float: right;
}

.hidden {
  display: none;
}

`
export default CarouselCopy;
