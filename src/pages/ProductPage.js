import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Circles } from "react-loader-spinner"
import { FaEdit } from 'react-icons/fa'

export default function ProductPage() {
    const [book, setBook] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQuantity, setSelectedQuantity] = useState("1");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
            .then((product) => {
                setBook(product.data)
            })
            .catch((e) => alert(e))
            .finally(() => setIsLoading(false));
    }, [])

    function deleteProduct() {
        console.log("ok")
    }
    function addToCart(e) {
        e.preventDefault();
        const buttonName = e.target.name;
        console.log(`Botão "${buttonName}" clicado`)
        console.log("Quantidade selecionada:", selectedQuantity);
        const addCart = { id, name: book.name, price: book.price, quantity: selectedQuantity };
        if (buttonName === "add-to-cart") {
            //adiciona a variavel cart
            console.log(addCart)
        } else {
            navigate("/checkout")
        }

    }
    if (isLoading) {
        return (<PageProdutc>
            <Circles
                height="80"
                width="80"
                ariaLabel="circles-loading"
                wrapperClass="spinnerHome"
                visible={true}
            />
        </PageProdutc >)
    }
    return (
        <PageProdutc>
            <BookTittle>
                <p>{book?.name}</p>
                <StyledIcon />
            </BookTittle>
            <ContainerProdutsInformation>
                <img src={book?.imageUrl} />
                <BuyContainer>
                    <p>R$ {book?.price.replace(".", ",")}</p>
                    <form onSubmit={addToCart}>
                        <div>
                            <label htmlFor="quantity">Selecione a quantidade:</label>
                            <select
                                id="quantity"
                                name="quantity"
                                value={selectedQuantity}
                                onChange={(e) => setSelectedQuantity(e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>

                        <button name="add-to-cart" onClick={(e) => addToCart(e)}>Adicionar ao Carrinho</button>
                        <button name="buy-now" onClick={(e) => addToCart(e)}>Comprar agora</button>
                    </form>
                </BuyContainer>
            </ContainerProdutsInformation>
            <Description>
                {book?.description}
            </Description>
        </PageProdutc>
    )
}


const PageProdutc = styled.div`
    width: 100%;
    height: calc(100vh - 120px);
    background-color: #FDFCDC;
`
const BookTittle = styled.div`
    font-size: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    color: #0081A7;
    padding: 50px;
    @media (max-width: 768px){
        padding: none;
        justify-content: center;
        font-size: 50px;
        flex-direction: column;
    }
`

const StyledIcon = styled(FaEdit)`
        width: 35px;
        height: 35px;
        margin-left: 15px;
        margin-top:15px;
        color:#F07167;
`
const ContainerProdutsInformation = styled.div`
    display:flex;
    justify-content: center;
    img{
        width: 300px;
        @media (max-width: 768px){
            width: 80%;
        }
    }
    form{
        display:flex;
        flex-direction: column;
        justify-content:space-between;
        align-items:center;
        height: 150px;
        div{
            display: flex;
            justify-content:space-between;
            width: 190px;
        }
    }
    @media (max-width: 768px){
        flex-direction: column;
        align-items: center;
    }
`
const BuyContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 500px;
    justify-content:space-around;
    align-items:center;
    padding: 15px;
    button{
        width: 300px;
        height: 50px;
        background-color:#F07167;
        border-radius: 20px;
        border:none;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        transition: box-shadow 0.3s ease-in-out;
        font-size: 20px;
        &:hover {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.45);
        }
        @media (max-width: 768px){
            width: 70%;
        }
    }
    form{
        @media (max-width: 768px){
            width: 100%;
        }
    }
    @media (max-width: 768px){
        width: 100%;
    }
    p{
        font-size: 70px;
        color: #0081A7;
    }
    select{
        font-size: 15px;
    }
    option{
        font-size: 15px;
    }
`

const Description = styled.div`
    font-size: 20px;
    padding:50px;
`
