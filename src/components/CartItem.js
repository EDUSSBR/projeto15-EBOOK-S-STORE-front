import styled from 'styled-components';
import { BsPlusSquareFill, BsFileMinusFill } from 'react-icons/bs'
export function CartItem({ name, price, quantity, imageUrl, id,stockQuantity,addToCart, removeFromCart }) {
    return <CartItemContainer>
        <img src={imageUrl} alt="" />
        <p>{name}</p>
        <div>
        <BsFileMinusFill onClick={()=>removeFromCart(id, price)}/>
            <p>{quantity}</p>
        <BsPlusSquareFill onClick={()=>addToCart(id, price, name, imageUrl, stockQuantity)}/>
        </div>
            <p>{price}</p>
    </CartItemContainer>
}
const CartItemContainer = styled.li`
display:flex;
flex-direction:row;
justify-content:flex-start;
align-items:center; 
margin-top:2%;
width:100%;
height: 50px;
transition: all 1s ease-in-out;
background-color:#fdfcdc;
border-radius:5px;
border: 1px solid #fdfcdc;
p{
    color:#0081a7;
    margin-right:15px;
}
img {
    padding: 4px;
    height:100%;
    width: 80px;
    border-radius:3px;
    margin-right:5%;
}
> p:nth-child(2){
    width:60%;
    text-align: left;
    display: ${({})}
}
div{
    background-color:transparent;
    display:flex;
    align-items:center;
    justify-content:center;
    svg{
        cursor:pointer;
        width:60px;
        width: 40px;
        height:40px;
        height: fit-content;
        fill:#46B0BA;
        background-color:transparent;
        border:none;
        transition: all 0.2s ease-in-out;
        text-align:left;
        z-index:25;
        :nth-child(3){
            width:35px;
        }
        :hover{
            fill:#0081a7;
        }
        :last-child{
            margin-right: max(20%);
    
        }
    }
}



`


