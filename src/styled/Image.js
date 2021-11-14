import React from 'react'
import styled from "styled-components";
import imageNotFound from "../images/image_not_found.png"
export const Image = ({logo=imageNotFound,height='auto', width="100%",alt="image"}) => {
    return (<img src={logo} height={height} width={width}
        alt={alt}
        onError={(event) => {
            event.target.src = imageNotFound;
          }}
    />)

}



