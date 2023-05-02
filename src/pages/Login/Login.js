import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Background } from "./style"
import { UserContext } from "../../ContextAPI/ContextUser"
import { ThreeDots } from "react-loader-spinner"
import styled from "styled-components"
import { Header } from "../../components/Header"

export default function Login(){
    const email = useRef(null);
    const password = useRef(null);
    const [user, setUser] = useState({email:"", password:""})
    const {config, setConfig} = useContext(UserContext)
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            setConfig({headers:{
                Authorization: "Bearer " + token
            }})
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/token`, {},config).then(res=>{

                if(res.data){
                    navigate("/")
                }
                return
            }
            ).catch(err=>{
                navigate("/login")
                localStorage.removeItem("token")
            }, [])
            
        }
    })
    return(
        <>
        <Header/>
        <Background>
            <Form onSubmit={login}>
                <h1>Login:</h1>
                <input disabled={disable} ref={email} type="email" value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} placeholder="Email"/>
                <input disabled={disable} ref={password} type="password" value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} placeholder="Senha"/>
                <button disabled={disable} type="submit">{disable?<ThreeDots color="white"/>:"Logar"}</button>
                <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
            </Form>
        </Background>
        </>
    )
    function login(e){
        e.preventDefault()
        setDisable(true)
        console.log(user)
        if(!user.email) {
            email.current.focus()
            setDisable(false)
            return
        };
        if(!user.password) password.current.focus();
        if (!user.email||!user.password){
            setDisable(false)
            return alert("Preencha todos os campos!")
        }
        axios.post(`${process.env.REACT_APP_BACK_API_URL}/login`, user).then(res=>{
            setDisable(false)
            setConfig({headers:{
                Authorization: "Bearer " + res.data
            }})
            localStorage.setItem("token", res.data)
            navigate("/")
        }
        ).catch(err=>{
            setDisable(false)
            alert(err.response.data)
            console.log(email.current)
            email.current.focus()
        })
    }
}


const Form = styled.form`
    width:300px;
    height:300px;

input{
    border:1px solid red;
}
`