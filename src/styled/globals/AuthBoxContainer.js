import styled from "styled-components";
import {FlexBox} from "../styles";


export const FlexBoxContainerInput = styled(FlexBox)`
  width: 640px;
  padding: 10px;
  .checkbox {
    padding-left: 20px;
  }
  label {
    color: #aba499;
  }
  .error {
    font-size: 14px;
    color: red;
  }
  .submit-auth-btn{
    width: 100%;
    padding: 4px;
    font-size: 24px;
  }
  input {
    padding: 10px 8px;
    font-size: 20px;
  }
  p {
    font-size: 10px;
    padding: 10px 0px;
  }
`