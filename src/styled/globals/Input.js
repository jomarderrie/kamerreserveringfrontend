import React from "react";
import styled from "styled-components";

const Input = (props) => {
  console.log(props);
  return (
    <div className={`input-icon-wrap ${props.className}`}>
      <span className={"input-icon"}>
        {/* <span className={"fa fa-user"}></span> */}
        <span className={`fa ${props.icon}`}></span>
      </span>
      <input type="text" className="input-with-icon" id="form-name" placeHolder={props.placeHolderName} />
    </div>
  );
};

const InputWithImage = styled(Input)`
    border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
  
  .input-icon {
    background: #ddd;
  }

  .input-with-icon {
    border:none;
    flex: 1;
  }

  .input-icon,
  .input-with-icon {
    padding: 10px;
  }
`;

export default InputWithImage;
