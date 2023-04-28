import styled from "styled-components";

export function Header() {
  return <HeaderContainer>
    <p>Ebook'Store</p>
  </HeaderContainer>
}

const HeaderContainer = styled.header`
width:100%;
height:70px;
background-color:#2982A8;
display: flex;
align-items:center;
justify-content:center;
-webkit-box-shadow: inset 0px 1px 6px 1px #FDFBDD, 0px 1px 14px 1px #FDFBDD;
-moz-box-shadow: inset 0px 1px 6px 1px #FDFBDD,0px 1px 14px 1px #FDFBDD;
box-shadow: inset 0px 1px 6px 1px #FDFBDD, 0px 1px 14px 1px #FDFBDD;

p {
  font-family: "Rubik Burned", sans-serif;
  font-size: 40px;
  color: #FDFBDD;
  padding: 0 17px;
  border-radius:4px;
}
`