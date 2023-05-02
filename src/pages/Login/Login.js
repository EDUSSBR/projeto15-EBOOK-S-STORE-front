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
    const {setConfig, user, setUser} = useContext(UserContext)
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [errorMessage, setErrorMessage] = useState({ email: "", password: "" })
    const [fieldError, setFieldError] = useState(() => ({ email: false, password: false }))


    useEffect(()=>{
        if(token && user){
            navigate("/")
            }
        else if(token){
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/getuser`, {}, {headers:{
                Authorization: "Bearer " + token
            }}).then(res=>{
                const {name, email} = res.data
                setUser({...user, name, email})
                navigate("/")
            }).catch(err=>{
                navigate("/login")
                setUser({name: "", email: ""})
                localStorage.removeItem("token")
            })
            
        }
    }, [token, user.name, user.email])
    return(
        <>
        <Header/>
        <Background>
            <Form onSubmit={login}>
                <h1>Login:</h1>
                {fieldError.email && <Paragraph error={fieldError.email}>{errorMessage.email}</Paragraph>}
                <Input error={fieldError.email} disabled={disable} ref={email} type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
                {fieldError.password && <Paragraph error={fieldError.password}>{errorMessage.password}</Paragraph>}
                <Input error={fieldError.password} disabled={disable} ref={password} type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Senha" />
                <button disabled={disable} type="submit">{disable?<ThreeDots color="white"/>:"Logar"}</button>
                <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
            </Form>
        </Background>
        </>
    )
    function login(e){
        e.preventDefault()
        const fields = ["email", "password"]
        let newFieldError = { email: false, password: false};
        setDisable(true)
        for (let item of fields) {
            if (!user[item]) {
                newFieldError = { ...newFieldError, [item]: true };
            } else {
                newFieldError = { ...newFieldError, [item]: false };
            }
        }
        let foundError;
        for (let item of fields) {
            foundError = newFieldError[item] === true
            if (foundError) {
                if (item === 'email') { email.current.focus() 
                    setErrorMessage({...errorMessage, email: "Email não pode ser vazio"})}
                else if (item === 'password') { password.current.focus() 
                    setErrorMessage({...errorMessage, password: "Senha não pode ser vazia"})}
                    break;
            }
        }
        if (foundError) {
            setDisable(false)
            setFieldError(newFieldError)
            return
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
            if(err.response.data.includes("Email")){
                newFieldError = { ...newFieldError, email: true };
                setFieldError(newFieldError)
                setErrorMessage({...errorMessage, email: "Email já cadastrado!"})
                
            }
            if(err.response.data[0].includes("password")){
                setErrorMessage({...errorMessage, password: "A senha deve ter pelo menos 3 caracteres"})
                newFieldError = { ...newFieldError, password: true };
                setFieldError(newFieldError)
                password.current.focus()
            }
            
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

const Paragraph = styled.p`
color:${({error})=> error ? 'red': '#46B0BA' } !important;
`

const Input = styled.input`
border:${({error})=> error ? '2px solid red': '2px solid #46B0BA' } !important;
:active {
    border:${({error})=> error ? '2px solid red': '2px solid #46B0BA' } !important;
}
:focus {
    border:${({error})=> error ? '2px solid red': '2px solid #46B0BA' };
}
`