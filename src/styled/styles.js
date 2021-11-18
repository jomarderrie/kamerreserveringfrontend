import {css, keyframes} from 'styled-components';
import styled from 'styled-components'

export const setColor = {
    primaryColor: '#af9a7d',
    mainWhite: '#fff',
    mainBlack: '#222',
    mainGrey: 'ececec',
    lightGrey: '#f7f7f7'
};

export const setFont = {
    main: "font-family: 'Courgette', cursive;",
    slanted: "	font-family: 'Lato', sans-serif;"
};



export const FlexBox = styled.div`
/* width: 100%; */
${(props) => setFlex({x: props.x, y: props.y, z: props.z, width:props.width})}
`

export const setPadding = ({top='0',right='0',bottom='0',left='0'} = {}) =>{
    return `padding:${setRem(top)} ${setRem(right)} ${setRem(bottom)} ${setRem(left)} `
} 

export const setUpDownPadding = ({upDown='0',leftRight='0'} = {}) =>{
    return `padding:${setRem(upDown)} ${setRem(leftRight)};`
} 


export const setFlex = ({display="flex",x = 'center', y = 'center', z = 'row', width=""} = {}) => {
    return `
    display:${display}; 
    align-items:${y}; 
    justify-content:${x};
    flex-direction:${z};
    width:${width};
    `;
};

export const setBackground = (
    {
        img = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        color = 'rgba(0, 0, 0, 0)'
    } = {}
) => {
    return `background: linear-gradient(${color}, ${color}),
	url(${img}) no-repeat center/cover fixed;`;
};

export const setRem = (number = 16) => {
    return `${number / 16}rem`;
};

export const setLetterSpacing = (number = 2) => {
    return `letter-spacing:${number}px`;
};

export const setBorder = ({width = '2px', style = 'solid', color = 'black'} = {}) => {
    return `border:${width} ${style} ${color}`;
};

const sizes = {
    ultraLarge: 1600,
    large: 1200,
    desktop: 992,
    tablet: 768,
    phone: 576
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`@media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }`;

    return acc;
}, {});

export const setFadeIn = (start, point, end) => {
    const animation = keyframes`
      0% {
        opacity: 0;
        transform: translateY(${start});
      }
      50% {
        opacity: 0.5;
        transform: translateY(${point});
      }
      100% {
        opacity: 1;
        transform: translateY(${end});
      }
    `;
    return css`
      animation: ${animation} 3s ease-in-out 1;
    `;
};

export const setTransition = ({property = 'all', time = '0.3s', timing = 'ease-in-out'} = {}) => {
    return `transition:${property} ${time} ${timing}`;
};
export const setShadow = {
    light: 'box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.75)',
    dark: 'box-shadow: 6px 6px 5px 0px rgba(0,0,0,0.75)',
    darkest: 'box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75)'
};


export const LinkFlexBoxContainer = (props) => {
    console.log(props);
    return (<div className={props.className}>
            <FlexBox x={props.x}>
            {props.children}
            </FlexBox>
        </div>
    )
}

export const StyledFlexBoxContainer = styled(LinkFlexBoxContainer)`
    padding-top:10px;
    padding-right: 20px;
    border-bottom-color: rgba(140, 130, 115, 0.12);
    border-bottom: 2px solid;
`