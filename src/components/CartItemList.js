import styled from "styled-components";
import { CartItem } from "./CartItem";

function CartItemList({ shouldRender, total, isOpenCart, cartItems, removeFromCart, addToCart }) {
  return (
    <CartListContainer>
      {shouldRender ? (!isOpenCart &&
        cartItems?.map(item => (
          <CartItem key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            imageUrl={item.imageUrl}
            id={item.id}
            isOpenCart={isOpenCart}
            removeFromCart={() => removeFromCart(item.id, item.price)}
            addToCart={() => addToCart(item.id, item.price, item.name, item.imageUrl, item.stockQuantity)}
          />))) :
        (!isOpenCart && <li style={{ marginTop: '50px' }}>Você ainda não possui itens na lista de compras</li>)}
      {shouldRender && !isOpenCart &&
        <div>
          <p>TOTAL:{" R$ " + Number(total).toFixed(2)} </p>
        </div>}
    </CartListContainer>
  );
};

export default CartItemList;


const CartListContainer = styled.ul`
left:0px;
top:0px;
width: ${({ isOpenCart }) => isOpenCart ? '0%' : '100%'};
display: ${({ isOpenCart }) => isOpenCart ? 'none' : 'static'};
position: ${({ isOpenCart }) => isOpenCart ? 'absolute' : 'static'};
padding-right:15px;
background-color:transparent;
padding-left: 13%;
transition: all 0.5s ease-in-out;
height: fit-content;
margin-bottom: 15px;

    
>div>p{
    margin-top:10px;
    text-align:right;
    border-radius:5px;
    height: 30px;
    :last-child{
        color:#fdfcdc;
    }
}
>div {
    width: 40%;
    margin: 0 0 0 auto;
    background-color:transparent;
}
`