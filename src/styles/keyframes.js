import { keyframes } from "styled-components";

export const bookCircle = keyframes`
   100%{
        -webkit-box-shadow: 9px 10px 13px -3px rgba(0,0,0,1);
        -moz-box-shadow: 9px 10px 13px -3px rgba(0,0,0,1);
        box-shadow: 9px 10px 13px -3px rgba(0,0,0,1);
        transform: scale(1.1);
    } 
`

export const pullShadow = keyframes`
   100%{
    -webkit-box-shadow: inset 0px -5px 6px 1px #FDFBDD, 0px -3px 14px 1px #FDFBDD,-10px 0px 14px 1px black;
    -moz-box-shadow: inset 0px -5px 6px 1px #FDFBDD,0px -3px 14px 1px #FDFBDD,-10px 0px 14px 1px black;
    box-shadow: inset 0px -5px 6px 1px #FDFBDD, 0px -3px 14px 1px #FDFBDD,-10px 0px 14px 1px black;
    } 
`
export const pullShadowReverse = keyframes`
   100%{
    } 
`
export const cartIconScale = keyframes`
   0%{
    width:100%;
    background-color:transparent;
} 
100%{
    width:10%;
    fill:#0081a7;

    background-color:transparent;
} 
`
export const cartNumberScale = keyframes`
   0%{
    background-color:#0081a7;
    color: #fdfcdc;
} 
100%{
    color: #0081a7;
    background-color:#fdfcdc;
} 
`
export const cartIconScaleReverse = keyframes`
   0%{
       background-color:transparent;
       width:10%;
       fill:white;
    } 
    100%{
        background-color:transparent;
        width:100%;
    } 
`

