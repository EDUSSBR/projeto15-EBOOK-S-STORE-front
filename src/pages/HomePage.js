import styled from "styled-components"
import { BookItem } from "../components/BookItem"
import { services } from "../services"
import { useProduct } from "../hooks/useProducts"
import { useEffect } from "react"
import { Circles } from "react-loader-spinner"

export function HomePage() {
    const { products, setProducts } = useProduct();
    useEffect(() => {
        (async function getProducts() {
            try {
                const productsResponse = await services.getProducts();
                setProducts(productsResponse);
            } catch (e) {
                console.log("chegou aqui")
                console.log("services is not working properly");

            }
        })
            ()
    }, [])
    return (<HomePageContainer>
        {products.length> 0 ? products?.map(product => {
            return <BookItem key={product._id} id={product._id} price={product.price} name={product.name} imageUrl={product.imageUrl} />
        }): <Circles
        height="80"
        width="80"
        ariaLabel="circles-loading"
        wrapperClass="spinnerHome"
        visible={true}
      />}
    </HomePageContainer >)

}
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