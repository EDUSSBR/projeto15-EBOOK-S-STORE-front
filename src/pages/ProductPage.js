import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Header } from "../components/Header"
import { Circles } from "react-loader-spinner"
import { FaEdit, FaTimes } from 'react-icons/fa'
import { Cart } from "../components/Cart"
import { useCart } from "../hooks/useCart"

export default function ProductPage() {
    const [book, setBook] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQuantity, setSelectedQuantity] = useState("1");
    const [closeEdition, setCloseEdition] = useState(true);
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [category, setCategory] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_API_URL}/product/${id}`)
            .then((response) => {
                const product = response.data;
                setBook(product);
                initializeData(product);
            })
            .catch((e) => alert(e))
            .finally(() => setIsLoading(false));

    }, [id, name, imageUrl, price, description])


    function initializeData(product) {
        setName(product.name);
        setImageUrl(product.imageUrl);
        setPrice(product.price);
        setDescription(product.description);
        setStockQuantity(product.stockQuantity);
        setCategory(product.category);
    }

    function addCart(e) {
        e.preventDefault();
        const cart = { id, price, name, image: imageUrl, stockQuantity };
        console.log(cart)
        addToCart(cart);
    }

    function openEdition() {
        setCloseEdition(false);
    }

    function bookEdit(e) {
        e.preventDefault();
        const buttonName = e.target.name;
        if (buttonName === "deletar") {
            const confirmed = window.confirm("Tem certeza que deseja excluir este produto?");
            if (confirmed) {
                axios.delete(`${process.env.REACT_APP_BACK_API_URL}/product/${id}`)
                    .then(() => {
                        alert("produto deletado com sucesso")
                        navigate("/")
                    })
                    .catch((e) => alert(e))
            }
        } else {
            const body = { name, description, price, stockQuantity, category, imageUrl };
            axios.put(`${process.env.REACT_APP_BACK_API_URL}/product/${id}`, body)
                .then(() => {
                    initializeData(book);
                    alert("Produto atualizado com sucesso")
                    setCloseEdition(true);
                })
                .catch((e) => alert(e))
        }

    }
    function handleClose() {
        setCloseEdition(true);
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
        <>
            <Header />
            <Container>
                <PageProdutc>
                    <BookTittle>
                        <p>{book?.name}</p>
                        <StyledIcon onClick={openEdition} />
                    </BookTittle>
                    <ContainerProdutsInformation>
                        <img src={book?.imageUrl} />
                        <BuyContainer>
                            <p>R$ {book?.price.replace(".", ",")}</p>
                            <form onSubmit={addCart}>
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

                                <button name="add-to-cart" >Adicionar ao Carrinho</button>
                                {/* <button name="buy-now" >Comprar agora</button> */}
                            </form>
                        </BuyContainer>
                    </ContainerProdutsInformation>
                    <Description>
                        {book?.description}
                    </Description>
                    <EditionBook close={closeEdition}>
                        <CloseIcon onClick={handleClose} />
                        <p>Edição de Informações do Livro</p>
                        <form onSubmit={bookEdit}>
                            <label for="titulo">Titulo:</label>
                            <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                            <label for="Imagem">Imagem:</label>
                            <input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} required />
                            <label for="Preço">Preço:</label>
                            <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} required />
                            <label for="Descrição">Descrição:</label>
                            <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} required />
                            <label for="Quantidade em Estoque">Quantidade em Estoque:</label>
                            <input type="text" value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} required />
                            <label for="Categoria">Categoria:</label>
                            <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} required />
                            <button name="salvar" onClick={(e) => bookEdit(e)}>Salvar</button>
                            <button name="deletar" onClick={(e) => bookEdit(e)}>Deletar</button>
                        </form>
                    </EditionBook>
                </PageProdutc>
                <Cart />
            </Container>
        </>
    )
}
const EditionBook = styled.div`
  width: 500px;
  padding: 15px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #FDFCDC;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  display: ${({ close }) => close ? "none" : "flex"};
  z-index: 999;
  flex-direction:column ;
  align-items: center;
  justify-content:center;
  p{
    font-size:30px;
    margin-bottom: 10px ;
    margin-top: 15px;
  }
    form{
        display: flex;
        flex-direction:column ;
        align-items: start;
        justify-content: center;
        label{
            font-size: 20px;
            margin-bottom:5px;
        }
        input{
            font-size: 20px;
            border-radius: 5px ;
            border:1px solid #00afb9;
            margin-bottom:5px;
            height: 40px;
        }
        button{
        width: 100px;
        height: 50px;
        background-color:#F07167;
        border-radius: 20px;
        border:none;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        transition: box-shadow 0.3s ease-in-out;
        font-size: 20px;
        margin: auto;
        margin-top:10px;
        &:hover {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.45);
        }
        }
    }
    
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color:#F07167;
`

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
`
const PageProdutc = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
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
        cursor: pointer;
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
