import styled from "styled-components"
import { BookItem } from "../components/BookItem"
import { services } from "../services"
import { useProduct } from "../hooks/useProducts"
import { useEffect } from "react"

export function HomePage() {
    const { products, setProducts } = useProduct();
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
    return (<HomePageContainer>
        <CartContainer>
        </CartContainer>
        {products?.map(product => {
            return <BookItem key={product._id} price={product.price} name={product.name} imageUrl={product.imageUrl} />
        })}
    </HomePageContainer>)

}
const CartContainer = styled.div`
position: absolute;
right: 0px;
top:0px;
height:100%;
width:20px;
z-index:0;
transition: all 0.3s linear;
&:hover {
    z-index:10;
    width:400px;
}
`
const HomePageContainer = styled.div`
width:100%;
height:100%;
padding:10px;
margin: 25px auto;
gap: 30px;
font-family: 'Roboto Slab', sans-serif;
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content:center;
-webkit-box-shadow: inset 0px -100px 60px -10px #FBD9B7;
-moz-box-shadow: inset 0px -100px 60px -10px #FBD9B7;
box-shadow: inset 0px -100px 60px -10px #FBD9B7;
`