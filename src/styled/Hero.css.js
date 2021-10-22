import styled from 'styled-components';
import { setFlex, setBackground } from './styles';
const Hero = styled.div`
	min-height: 60vh;
	${(props) => setBackground({ img: props.img, color: 'rgba(0,0,0,0)' })};
	
`;

export default Hero;