import { BsFillCartFill } from "react-icons/bs";
import { CartButton } from "./CartButton";
import { CartHeader } from "./CartHeader";
import CartItemList from "./CartItemList";
import styled from "styled-components";
import { cartIconScale, cartIconScaleReverse, pullShadow } from "../styles/keyframes";
import { useCart } from "../hooks/useCart";

export function Cart() {
    const { cart, resetCart, disableRemoveFromCartButton, removeFromCart, addToCart, disableAddToCartButton, setIsOpenCart, isOpenCart } = useCart()
    const shouldRender = cart.items.length > 0 && !isOpenCart

    return (<CartContainer isOpenCart={isOpenCart}>
        <CartIcon isOpenCart={isOpenCart}>
            <BsFillCartFill onClick={() => setIsOpenCart(prev => !prev)} />
            <div onClick={() => setIsOpenCart(prev => !prev)} >{cart?.totalItems || 0}</div>
        </CartIcon>
        <CartHeader 
        resetCart={resetCart} 
        isOpenCart={isOpenCart} />
        <CartItemList
            shouldRender={shouldRender}
            disableRemoveFromCartButton={disableRemoveFromCartButton}
            disableAddToCartButton={disableAddToCartButton}
            total={cart.total} 
            cartItems={cart.items}
            isOpenCart={isOpenCart} 
            addToCart={addToCart}
            removeFromCart={removeFromCart} />
        {<CartButton isOpenCart={!isOpenCart} shouldRender={shouldRender} />}
    </CartContainer>)
}
const CartIcon = styled.div`
position: absolute;    
left:0;
top:0;
background-color: transparent;
height:100%;
div{
    display:flex;
    position:sticky;
    background-color: #fdfcdc;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    cursor:pointer;
    margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.5vw)' : 'calc(1.5vw * 2)'};
    width: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.5vw)' : 'calc(1.5vw * 2.5)'};
    height: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.5vw)' : 'calc(1.5vw * 2.5)'};
    
    display:none;
    @media (max-width:959px) {
        display:flex;
        background-color: ${({ isOpenCart }) => !isOpenCart ? '#fdfcdc' : '#0081a7'};
        color: ${({ isOpenCart }) => isOpenCart ? '#fdfcdc' : '#0081a7'};
        top: ${({ isOpenCart }) => !isOpenCart ? '50vh' : 'calc(50vh - (1.5vw * 2.5)/2 + 9px )'};
        margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.7vw)' : 'calc(1.5vw * 2)'};
        width: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.7vw)' : 'calc(1.5vw * 2.5)'};
        height: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.7vw)' : 'calc(1.5vw * 2.5)'};
    }
    @media (max-width:789px) {
        margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.8vw)' : 'calc(1.5vw * 2)'};
        width: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.3vw)' : 'calc(1.5vw * 2.5)'};
        height: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.3vw)' : 'calc(1.5vw * 2.5)'};
    }
    @media (max-width:675px) {
        /* top: ${({ isOpenCart }) => !isOpenCart ? '50vh' : 'calc(50vh - (1.5vw * 2.5)/2 + 9px )'}; */
        margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(2vw)' : 'calc(1.5vw * 2)'};
        width: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.5vw)' : 'calc(1.5vw * 2.5)'};
        height: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.5vw)' : 'calc(1.5vw * 2.5)'};
    }
    @media (max-width:675px) {
        /* top: ${({ isOpenCart }) => !isOpenCart ? '50vh' : 'calc(50vh - (1.5vw * 2.5)/2 + 9px )'}; */
        margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.4vw)' : 'calc(1.5vw * 2)'};
        width: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.8vw)' : 'calc(1.5vw * 2.5)'};
        height: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.8vw)' : 'calc(1.5vw * 2.5)'};
    }
    @media (max-width:525px) {
        /* top: ${({ isOpenCart }) => !isOpenCart ? '50vh' : 'calc(50vh - (1.5vw * 2.5)/2 + 9px )'}; */
        margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(2.6vw)' : 'calc(1.5vw * 2)'};
        width: ${({ isOpenCart }) => !isOpenCart ? 'calc(3.2vw)' : 'calc(1.5vw * 2.5)'};
        height: ${({ isOpenCart }) => !isOpenCart ? 'calc(3.2vw)' : 'calc(1.5vw * 2.5)'};
    }
    @media (min-width:960px) {
        
        background-color: ${({ isOpenCart }) => !isOpenCart ? '#fdfcdc' : '#0081a7'};
        color: ${({ isOpenCart }) => isOpenCart ? '#fdfcdc' : '#0081a7'};
        display:flex;
        top: ${({ isOpenCart }) => !isOpenCart ? '50vh' : 'calc(50vh - (1.5vw * 2.5)/2 + 5px )'};
        margin-left: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.5vw)' : 'calc(1.5vw * 2)'};
        width: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.5vw)' : 'calc(1.5vw * 2.5)'};
        height: ${({ isOpenCart }) => !isOpenCart ? 'calc(1.5vw)' : 'calc(1.5vw * 2.5)'};
    }
}
svg{
    top: calc(50vh - 70px);
    cursor:pointer;
    position:sticky;
    fill:#fdfcdc;
    transition: all 0.5s ease-in-out;
    width: ${({ isOpenCart }) => isOpenCart ? '10vw' : '80vw'};
    animation: ${({ isOpenCart }) => isOpenCart ? cartIconScaleReverse : cartIconScale};
    animation-duration: ${({ isOpenCart }) => isOpenCart ? '1s' : '0.7s'};
    animation-fill-mode: forwards;
    animation-timing-function: 'ease-in-out'
}

`
const CartContainer = styled.div`
display:flex;
flex-direction:column;
position:relative;
transition: all 0.5s ease-in-out;
background-color:#fed9b7;
background-color:#fdfcdc;
background-color:#f07167;
background-color:#46B0BA;
background-color:${({ isOpenCart }) => isOpenCart ? '#0081a7' : '#46B0BA'};;
flex-grow:1;
width:100%;
padding-top: 70px;
width: ${({ isOpenCart }) => isOpenCart ? '10%' : '80%'};
animation: ${({ isOpenCart }) => isOpenCart ? 'none' : pullShadow};   
animation-duration: ${({ isOpenCart }) => isOpenCart ? 'none' : '1s'};
animation-delay:${({ isOpenCart }) => isOpenCart ? 'none' : '0.3s'};
animation-fill-mode:forwards;

    >div:nth-child(4){
        display:flex;
        flex-direction:row;
        align-items:center;
        text-align:left;
        margin: 10px 30px 0 auto;
        width:80%;
        border-radius:5px;
        height: 30px;
        background-color: #0081a7;
        background-color:transparent;
        >div{
            background-color:transparent;
            color:#fdfcdc;
            width:100%;
            display:flex;
            flex-direction:row;
            >div{
                color:#fdfcdc;
                width:fit-content;
                background-color: transparent;
                margin-left:10px;
                :last-child{
                    margin-left:35px;
                }
            }
        }
    }
`