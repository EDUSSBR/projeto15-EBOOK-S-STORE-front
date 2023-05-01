import styled from "styled-components"
import { BookItem } from "../components/BookItem"
import { services } from "../services"
import { useProduct } from "../hooks/useProducts"
import { useEffect } from "react"
import { Circles } from "react-loader-spinner"
import { Header } from "../components/Header"
import { useCart } from "../hooks/useCart";
import { Cart } from "../components/Cart";

export function HomePage() {

    const { products, setProducts } = useProduct();
   const { disableRemoveFromCartButton, addToCart, disableAddToCartButton} = useCart()
  
    useEffect(() => {
        (async function getProducts() {
            try {
                const productsResponse = await services.getProducts();
                setProducts(productsResponse);
            } catch (e) {
                console.log("services is not working properly");

            }
        })
            ()
    }, [])
    
    return (<>
            <Header/>
    <HomePageContainer>
        <Cart />
        <BookItemListContainer>
            {products.length > 0 ? products?.map(product => {
                return <BookItem disableAddToCartButton={disableAddToCartButton} disableRemoveFromCartButton={disableRemoveFromCartButton} key={product._id} id={product._id} price={product.price} stockQuantity={product.stockQuantity} name={product.name} imageUrl={product.imageUrl} addToCart={() => addToCart(product._id, product.price, product.name, product.imageUrl, product.stockQuantity)} />
            }) : <Circles
                height="80"
                width="80"
                ariaLabel="circles-loading"
                wrapperClass="spinnerHome"
                visible={true}
            />}
        </BookItemListContainer>
    </HomePageContainer ></>)
}


const BookItemListContainer = styled.div`
width:100%;
height:100%;
padding:10px 5px;
margin: 25px auto;
gap: 30px;
font-family: 'Roboto Slab', sans-serif;
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content:center;
transition: all 0.7s ease-in-out;

.spinnerHome{
        display:flex;
        align-items:center;
        justify-content:center;
         width:100%;
        svg{
            margin-top: calc(30% - 40px);
            fill:#46B0BA;
        }
}
`

const HomePageContainer = styled.div`
display:flex;
flex-direction:row-reverse;
width:100%;
height:100%;
`