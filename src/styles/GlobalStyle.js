import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    html, body, #root {
        width: 100%;
        height:100%;
    }
    * {
        box-sizing: border-box;
        font-family: 'Roboto Slab', sans-serif;
        font-weight: 100px;
        font-size: 10rem;
        color: #004f8b;
    }
    div {
        font-family: 'Roboto Slab', sans-serif;
        width:100%;
        background-color:#f4a630;
    }
    button {
        cursor:pointer;
    }
    a {
        text-decoration:none;
    }    
`

export default GlobalStyle