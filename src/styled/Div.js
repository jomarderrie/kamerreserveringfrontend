import styled from 'styled-components';
import { setRem } from "./styles"
const Div = styled.div`
	padding: ${setRem(64)} | 0;
	background: ${(props) => props.color};
`;

export default Div;
