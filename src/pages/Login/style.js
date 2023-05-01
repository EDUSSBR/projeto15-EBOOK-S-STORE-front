import styled from "styled-components";

export const Background = styled.div`
width:100%;
height:calc(100vh - 70px);
display:flex;
justify-content:center;
align-items:center;

h1{
    font-size:25px;
    font-weight:700;
    font-family:'Roboto Slab', sans-serif;
}
form{
    display:flex;
    flex-direction:column;
    justify-content:space-around;
}
input, button{
    width:300px;
    height:50px;
    font-size:20px;
    outline:0px;
    border: 1px solid #46B0BA   ;
    border-radius:5px;
    

}
input{
    padding-left:10px;
}
button{
    background-color:#0081a7;
    color:#fdfcdc;
    font-weight:600;
    display:flex;
    align-items:center;
    justify-content:center;
}

form div{
    background-color:#0081a7;
    width:300px;
    height:50px;
    border-radius:3px;
    display:flex;
    align-items:center;
    justify-content:center;
}
`