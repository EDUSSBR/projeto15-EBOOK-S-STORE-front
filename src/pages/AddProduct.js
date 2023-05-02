import axios from "axios";
import { EditionBook } from "./ProductPage";
import { useState } from "react"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header";
import { UserContext } from "../ContextAPI/ContextUser";

export default function AddProduct(){
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [category, setCategory] = useState("");
    const {setConfig} = useContext(UserContext)
    useEffect(()=>{
        const lctoken = localStorage.getItem("token")
            
            
            if(!lctoken){
                navigate("/login")
            }
            if(lctoken){
                
                axios.post(`${process.env.REACT_APP_BACK_API_URL}/token`, {}, {headers:{
                    Authorization: "Bearer " + lctoken
                }}).then(res=>{
                    if(!res.data){
                        navigate("/login")
                    }
                    setConfig({headers:{
                        Authorization: "Bearer " + lctoken
                    }})
                    console.log(res.data)
                    if(!res.data.isAdmin){
                        navigate("/")
                    }
                }).catch(err=>{
                    navigate("/login")
                    localStorage.removeItem("token")
                })
    
                }}, [])

const navigate = useNavigate()
    function bookEdit(e) {
        e.preventDefault();
        const buttonName = e.target.name;
        console.log(buttonName)
        if (buttonName === "cancelar") {
            navigate("/")
        } if(buttonName==="salvar") {
            const body = { name, description, price, stockQuantity, category, imageUrl };
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/product`, body)
                .then((res) => {
                    alert("Produto Criado")
                    navigate("/")
            
                })
                .catch((e) => alert(e.response.data))
        }

    }

    return(
        <>
        <Header/>
        <EditionBook>
                
                <p>Edição de Informações do Livro</p>
                <form onSubmit={bookEdit}>
                    <label htmlFor="titulo">Titulo:</label>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                    <label htmlFor="Imagem">Imagem:</label>
                    <input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} required />
                    <label htmlFor="Preço">Preço:</label>
                    <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} required />
                    <label htmlFor="Descrição">Descrição:</label>
                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} required />
                    <label htmlFor="Quantidade em Estoque">Quantidade em Estoque:</label>
                    <input type="text" value={stockQuantity} onChange={(event) => setStockQuantity(event.target.value)} required />
                    <label htmlFor="Categoria">Categoria:</label>
                    <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} required />
                    <button name="salvar" onClick={(e) => bookEdit(e)}>Salvar</button>
                    <button name="cancelar" onClick={(e) => bookEdit(e)}>Cancelar</button>
                </form>
            </EditionBook>
            </>
    )
}