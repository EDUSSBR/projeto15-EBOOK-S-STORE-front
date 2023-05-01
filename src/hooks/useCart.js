import { useContext, createContext, useState } from 'react';

const CartContext = createContext();
export function CartProvider({ children }) {
    const [disableAddToCartButton, setDisableAddToCartButton] = useState(false)
    const [disableRemoveFromCartButton, setDisableRemoveFromCartButton] = useState(false)
    const [isOpenCart, setIsOpenCart] = useState(true)
    // VERIFICAR ESTOQUE 
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem('cartItems')) || { items: [], totalItems: 0 ,total: 0 }
    })
    function resetCart(a){
        if(a.pageX){
            const shouldReset = window.confirm("Você realmente deseja limpar todos items do carrinho?")
            if(shouldReset){
                localStorage.setItem("cartItems", JSON.stringify({ items: [], totalItems: 0 , total: 0 }))
            setCart(()=>({ items: [], totalItems: 0 , total: 0 }))
            }
        }else{
            localStorage.setItem("cartItems", JSON.stringify({ items: [], totalItems: 0 , total: 0 }))
            setCart(()=>({ items: [], totalItems: 0 , total: 0 }))
        }
        
        
    }
    async function addToCart(id, price, name, imageUrl, stockQuantity) {
        setDisableAddToCartButton(prev => true)
        if (Number(stockQuantity) < 1) return alert("Esse item está fora de estoque.")
        let newCart = {...cart, items: [...cart.items]} || { items: [], totalItems: 0 , total: 0 };
        const itemAlreadyInCart = newCart?.items?.length > 0 && newCart.items.find(item => item.id === id && item.quantity > 0)
        if (itemAlreadyInCart) {
            (newCart = cart.items.reduce((acc, item) => {
                if (item.id === id) {
                    const updateItemQuantity = item.quantity += 1
                    return acc = { items: [...acc.items, { ...item, quantity: updateItemQuantity }], totalItems: acc.totalItems + updateItemQuantity, total: Number((acc.total + item.quantity * item.price).toFixed(2)) }
                }
                acc.items.push(item)
                acc.totalItems += item.quantity
                acc.total+=item.quantity*item.price
                return acc
            }, { items: [], totalItems: 0 , total: 0 }))
        }else {
            if (newCart.totalItems<0){
                newCart.totalItems=1
            }
            ++newCart.totalItems
            newCart.items.push({ id, price, name, imageUrl, quantity: 1 })
            newCart.total += price
        }
        localStorage.setItem('cartItems', JSON.stringify(newCart));
        setCart(() => newCart)
        setDisableAddToCartButton(prev => false)
    }
    function removeFromCart(id,price) {
        let newCart = {...cart} || { items: [], totalItems: 0 , total: 0 }
        const totalItems = newCart.totalItems-1
        setDisableRemoveFromCartButton(true)
        if (cart?.items?.length < 1) {
            setDisableRemoveFromCartButton(false)
            return
        };
        if (newCart?.items?.length > 0 && newCart.items.find(item => item.id === id && item.quantity === 1)) {
            newCart.items= newCart.items.filter(item=> item.id!==id)
            newCart.total-=price
        } else {
            newCart = newCart.items.reduce((acc, item) => {
                if (item.id === id && item.quantity===0){
                    return acc
                } 
                if (item.id === id && item.quantity > 0) {
                    const updateItemQuantity = item.quantity - 1
                    return acc = { items: [...acc.items, { ...item, quantity: updateItemQuantity }], total: Number((acc.total + updateItemQuantity * item.price).toFixed(2)) }
                }
                return acc = { items: [...acc.items, item], total: Number((acc.total + item.price * item.quantity).toFixed(2)) }
    
            }, { items: [], totalItems: 0 , total: 0 })
        }
        newCart= {...newCart, totalItems: totalItems}
        localStorage.setItem('cartItems', JSON.stringify(newCart));
        setCart(()=>newCart)
        setDisableRemoveFromCartButton(false)
    }
    return <CartContext.Provider value={{ resetCart, setIsOpenCart,isOpenCart,addToCart, removeFromCart, cart, disableAddToCartButton, disableRemoveFromCartButton }}>
        {children}
    </CartContext.Provider>
}


export function useCart() {
    const ctx = useContext(CartContext);
    return ctx
}

