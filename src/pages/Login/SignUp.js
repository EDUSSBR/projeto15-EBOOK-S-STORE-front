import axios from "axios"
import {useContext, useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Background } from "./style"
import { UserContext } from "../../ContextAPI/ContextUser"
import { Header } from "../../components/Header"

export default function SignUp(){
    const [user, setUser] = useState({name:"", email:"", password:"", confirm:""})
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()
    const {config, setConfig} = useContext(UserContext)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            setConfig({headers:{
                Authorization: "Bearer " + token
            }})
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/token`, {},config).then(res=>{
                navigate("/")
            }
            ).catch(err=>{
                alert(err.response.data)
            }, [])
            
        }
    })
    return(
        <>
        <Header/>
        <Background>
            <Form onSubmit={cadastro}>
                <h1>Cadastre-se:</h1>
                <input disabled={disable} type="text" value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} placeholder="Nome"/>
                <input disabled={disable} type="email" value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} placeholder="Email"/>
                <input disabled={disable} type="password" value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} placeholder="Senha"/>
                <input disabled={disable} type="password" value={user.confirm} onChange={(e) => setUser({...user, confirm:e.target.value})} placeholder="Confirme sua senha"/>
                <button disabled={disable} type="submit">{disable?<ThreeDots color="white"/>:"Cadastrar"}</button>
                <Link to="/">Já tem uma conta? Entre!</Link>
            </Form>
        </Background>
        </>
    )
    function cadastro(e){
        e.preventDefault()
        setDisable(true)
        if(!user.name||!user.email||!user.password||!user.confirm){
            setDisable(false)
            return alert("Preencha todos os campos!")
            
        }
        if(user.password!==user.confirm){
            setDisable(false)
            return alert("Senhas diferentes!")
        }
        const register = user
        delete register.confirm
        axios.post(`${process.env.REACT_APP_BACK_API_URL}/signup`, register)
        .then(res=>{
            navigate("/login")
        })
        .catch(err=>{
            alert(err.response.data)
            setDisable(false)
        })
    }
}

const Form = styled.form`
    width:300px;
    height:400px;
`