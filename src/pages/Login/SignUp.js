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
    const [user, setUser] = useState({ name: "", email: "", password: "", confirm: "" })
    const [fieldError, setFieldError] = useState(() => ({ name: false, email: false, password: false, confirm: false }))
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()
    const { config, setConfig } = useContext(UserContext)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setConfig({
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/token`, {}, config).then(res => {
                navigate("/login")
            }
            ).catch(err => {
                navigate("/login")
                localStorage.removeItem("token")
            }, [])

        }
    })
    useEffect(()=>{
        console.log(fieldError)
    }
    )
    return (
        <>
            <Header />
            <Background>
                <Form onSubmit={cadastro}>
                    <h1>Cadastre-se:</h1>
                    {fieldError.name && <Paragraph error={fieldError.name}>{"erro no nome"}</Paragraph>}
                    <Input error={fieldError.name} disabled={disable} ref={text} type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder="Nome" />
                    {fieldError.email && <Paragraph error={fieldError.email}>{"email"}</Paragraph>}
                    <Input error={fieldError.email} disabled={disable} ref={email} type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
                    {fieldError.password && <Paragraph error={fieldError.password}>{"password"}</Paragraph>}
                    <Input error={fieldError.password} disabled={disable} ref={password} type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="Senha" />
                    {fieldError.confirm && <Paragraph error={fieldError.confirm}>{"confirm"}</Paragraph>}
                    <Input error={fieldError.confirm} disabled={disable} ref={confirm} type="password" value={user.confirm} onChange={(e) => setUser({ ...user, confirm: e.target.value })} placeholder="Confirme sua senha" />
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
                if (item === 'name') { text.current.focus() }
                else if (item === 'email') { email.current.focus() }
                else if (item === 'password') { password.current.focus() }
                else if (item === 'confirm') { confirm.current.focus() }
                break;
            }
        }
        if (foundError) {
            setDisable(false)
            setFieldError(newFieldError)
            alert("Preencha todos os campos!")
            return
        }
        if (user.password !== user.confirm) {
            setDisable(false)
            confirm.current.focus();
            setUser(prev=> ({...prev, confirm:""}))
            newFieldError = { ...newFieldError, confirm: true };
            alert("Senhas diferentes!")
            setFieldError(newFieldError)
            return 
        }
        const register = user
        delete register.confirm
        axios.post(`${process.env.REACT_APP_BACK_API_URL}/signup`, register)
            .then(res => {
                navigate("/login")
            })
            .catch(err => {
                alert(err.response.data)
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