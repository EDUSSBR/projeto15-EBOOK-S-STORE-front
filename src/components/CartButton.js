import styled from "styled-components";

export function CartButton({shouldRender, isOpenCart}) {
    return (shouldRender && isOpenCart && <CartButtonContainer>Finalizar Compra</CartButtonContainer>)
}

const CartButtonContainer = styled.button`
    z-index:30;
    width: 40%;
    height: 50px;
    font-size:15px;
    margin: 0 auto;
    border-radius: 5px;
    border:none;
    transition: all 0.2s ease-in-out;
    background-color: #fdfcdc;
    color: #0081a7;
    :hover {
        background-color:#0081a7;
        color: #fdfcdc;
    }
`