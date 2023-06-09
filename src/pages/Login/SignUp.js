import axios from "axios"
import { useContext, useEffect, useState, useRef } from "react"
import { ThreeDots } from "react-loader-spinner"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Background } from "./style"
import { UserContext } from "../../ContextAPI/ContextUser"
import { Header } from "../../components/Header"

export default function SignUp() {
    const text = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirm = useRef(null);
    const [errorMessage, setErrorMessage] = useState({ name: "Campo obrigatório", email: "Campo obrigatório", password: "Campo obrigatório", confirm: "Campo obrigatório" })
    const [userRegister, setUserRegister] = useState({ name: "", email: "", password: "", confirm: "" })
    const [fieldError, setFieldError] = useState(() => ({ name: false, email: false, password: false, confirm: false }))
    const [disable, setDisable] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"))
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
    },[])

    return (
        <>
            <Header />
            <Background>
                <Form onSubmit={cadastro}>
                    <h1>Cadastre-se:</h1>
                    {fieldError.name && <Paragraph error={fieldError.name}>{errorMessage.name}</Paragraph>}
                    <Input error={fieldError.name} disabled={disable} ref={text} type="text" value={userRegister.name} onChange={(e) => setUserRegister({ ...userRegister, name: e.target.value })} placeholder="Nome" />
                    {fieldError.email && <Paragraph error={fieldError.email}>{errorMessage.email}</Paragraph>}
                    <Input error={fieldError.email} disabled={disable} ref={email} type="email" value={userRegister.email} onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })} placeholder="Email" />
                    {fieldError.password && <Paragraph error={fieldError.password}>{errorMessage.password}</Paragraph>}
                    <Input error={fieldError.password} disabled={disable} ref={password} type="password" value={userRegister.password} onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })} placeholder="Senha" />
                    {fieldError.confirm && <Paragraph error={fieldError.confirm}>{errorMessage.confirm}</Paragraph>}
                    <Input error={fieldError.confirm} disabled={disable} ref={confirm} type="password" value={userRegister.confirm} onChange={(e) => setUserRegister({ ...userRegister, confirm: e.target.value })} placeholder="Confirme a sua senha" />
                    <button disabled={disable} type="submit">{disable ? <ThreeDots color="white" /> : "Cadastrar"}</button>
                    <Link to="/login">Já tem uma conta? Entre!</Link>
                </Form>
            </Background>
        </>
    )
    function cadastro(e) {
        e.preventDefault()
        const fields = ["name", "email", "password", "confirm"]
        let newFieldError = { name: false, email: false, password: false, confirm: false };
        setDisable(true)
        for (let item of fields) {
            if (!userRegister[item]) {
                newFieldError = { ...newFieldError, [item]: true };
            } else {
                newFieldError = { ...newFieldError, [item]: false };
            }
        }
        let foundError;
        for (let item of fields) {
            foundError = newFieldError[item] === true
            if (foundError) {
                if (item === 'name') { 
                    text.current.focus() 
                    
                }
                if (item === 'email') { email.current.focus() 
                    }
                if (item === 'password') { password.current.focus() 
                    }
                if (item === 'confirm') { 
                    confirm.current.focus() 
                }
                    break;
            }
        }
        if (foundError) {
            setDisable(false)
            setFieldError(newFieldError)
            return
        }
        if (userRegister.password !== userRegister.confirm) {
            setDisable(false)
            confirm.current.focus();
            setUserRegister(prev=> ({...prev, confirm:""}))
            newFieldError = { ...newFieldError, confirm: true };
            setErrorMessage({...errorMessage, confirm: "Senhas não podem ser diferentes!"})
            setFieldError(newFieldError)
            return 
        }
        const register = {...userRegister}
        delete register.confirm
        axios.post(`${process.env.REACT_APP_BACK_API_URL}/signup`, register)
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                if(err.response.data[0].includes("email")){
                    setErrorMessage({...errorMessage, email: "O email deve ser válido"})
                    newFieldError = { ...newFieldError, email: true };
                    setFieldError(newFieldError)
                }
                if(err.response.data.includes("Email")){
                    setErrorMessage({...errorMessage, email: err.response.data})
                    newFieldError = { ...newFieldError, email: true };
                    setFieldError(newFieldError)
                }
                if(err.response.data[0].includes("least")){
                    setErrorMessage({...errorMessage, password: "A senha deve ter mais de 3 caracteres!"})
                    newFieldError = { ...newFieldError, password: true };
                    setFieldError(newFieldError)
                }
                
                setDisable(false)
                
            })
    }
}
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
const Form = styled.form`
    
    width:300px;
    height:400px;
`