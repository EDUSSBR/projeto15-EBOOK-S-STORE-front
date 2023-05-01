import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    html, body, #root, #root>div {
        width: 100%;
        height:100%;
    }
    * {
        box-sizing: border-box;
        font-family: 'Roboto Slab', sans-serif;
        font-size: 10rem;
        color: #2982A8;
    }
    div {
        font-family: 'Roboto Slab', sans-serif;
        width:100%;
        background-color:#FDFBDD;
    }
    button {
        cursor:pointer;
    }
    a {
        text-decoration:none;
    }    
`
export default GlobalStyle