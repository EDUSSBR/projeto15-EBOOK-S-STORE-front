import { BsFillTrashFill } from "react-icons/bs";
import styled from "styled-components";

export function CartHeader({ resetCart, isOpenCart }) {
    return (!isOpenCart && (<CartHeaderContainer>
        <div>
            <h2>Meu Carrinho</h2>
            <BsFillTrashFill onClick={resetCart} />
        </div>
        <div>
            <div>Nome do livro</div>
            <div>
                <div>Quantidade</div>
                <div>Preço</div>
            </div>
        </div>
        </CartHeaderContainer>))
}

const CartHeaderContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
height: 50px;
z-index:23;
background-color:transparent;
margin:0 0 60px 0;
>div:first-child{
    display:flex;
    align-items: center;
    justify-content: center;
    max-width:60%;
    margin:0 auto;
    background-color:transparent;
    >svg{
        background-color:transparent;
        width:30px;
        height:30px;
        margin-left:5px;
        cursor:pointer;
        :hover{
            fill: #fdfcdc;
        }
    }
    >h2{
        background-color:transparent;
    width:100%;
    @media (min-width: 1140px) {
        font-size: 30px;
    }
    @media (max-width: 1139px) {
        font-size: 20px;
    }
    color: #fdfcdc;
    font-weight: 700;
    display: ${({ isOpenCart }) => isOpenCart ? 'none' : 'static'};
    position: ${({ isOpenCart }) => isOpenCart ? 'absolute' : 'static'};
}
}
>div {
    display:flex;
    align-items:center;
    justify-content:center;
    text-align:center;
    @media (min-width: 1140px) {
        margin-top:30px;
        margin-left:25px;
    }
    @media (max-width: 1139px) {
        margin-top:45px;
        margin-right:10px;

        }
    height:100%;
    background-color: transparent;

    >div {
        font-size:20px;
        @media (min-width: 1140px) {
        font-size: 20px;
        }
        @media (max-width: 1139px) {
            font-size: 13px;
        }
        margin-top:4px;
        background-color: transparent;
        color: #fdfcdc;
        >div{
            color: #fdfcdc;
            background-color: transparent;
        }
        display:flex;
        align-items:center;
        justify-content:center;
    }
}
`