import styled from "styled-components";
import { FlexBox } from "../styles";

export const FlexBoxContainerInput = styled(FlexBox)`
  width: 640px;
  padding-left: 10px;
  .checkbox {
    padding-left: 20px;
  }
  label {
    color: #aba499;
    margin: 5px 0;
  }
  .error {
    font-size: 14px;
    color: red;
  }

  .submit-auth-btn {
    width: 100%;
    padding: 7px;
    margin-top: 30px;
    font-size: 24px;
  }

  input {
    padding: 10px 5px;
    font-size: 20px;
  }
  p {
    font-size: 10px;
    padding: 10px 0px;
  }
  .checkbox-input {
    padding: 10px 0px;
    margin: 8px 0px;
  }
  input.rc-time-picker-input {
    color: black;
  }
`;

export const FlexContainerFileInput = styled(FlexBoxContainerInput)`
  input {
    padding: 14px 0px;
  }
`;
// export const
