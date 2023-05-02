import axios from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../ContextAPI/ContextUser"
import { Header } from "../components/Header"
import { useCart } from "../hooks/useCart"
import styled from "styled-components"
import { useState } from "react"

export default function Checkout(){

    const [payment, setPayment] = useState({paymentForm: "Pix"})
    const [blur, setBlur] = useState(false)

    const navigate = useNavigate()
    const {setConfig} = useContext(UserContext)
    const { cart, resetCart} = useCart() 
    const [user, setUser] = useState()
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
                setUser(res.data)
            }).catch(err=>{
                navigate("/login")
                localStorage.removeItem("token")
            })

            }}, [])

    return (
        <>
            <Header/>
            <Background >
                <Blur blur={blur}>
                <h1>Checkout</h1>
                <Items>
                <div>
                    <p>Produto</p>
                    <p>Preço</p>
                    <p>Quantidade</p>
                </div>
                    {cart.items.map(e=>
                        <div>
                        <p>{e.name}</p>
                        <p>{e.price}</p>
                        <p>{e.quantity}</p>
                    </div>)}
                    
                </Items>
                <Total>
                        <p>Total:</p>
                        <p>{Number(cart.total)}</p>
                    </Total>
                    <Payment>
                        <p>Forma de pagamento:</p>
                <select onChange={(e) => setPayment({paymentForm:e.target.value})}>
                    <option value="Pix" >Pix</option>
                    <option value="Cartão de crédito">Cartão de crédito</option>
                    <option value="Cartão de débito" >Cartão de débito</option>
                    <option value="Boleto" >Boleto</option>
                </select>
                    </Payment>
                <button onClick={sendRequest}>Finalizar pedido</button>
                </Blur>
                {blur?<SuccessfulOrder>
                        <h1>Pedido feito com sucesso!</h1>
                        <button onClick={()=>navigate("/")}>Voltar para a home</button>
                </SuccessfulOrder>:<></>}
                
            </Background>
            

        </>
    )
    function sendRequest(){
        setBlur(true)
        const a = true
        resetCart(a)
        const order = {name:user.name, email:user.email, paymentForm:payment.paymentForm, cart:cart.items, total: Number(cart.total)}
        axios.post(`${process.env.REACT_APP_BACK_API_URL}/order`, order).then(res=>{
            alert(res.data)
        }).catch(err=>{
            alert(err.response.data)
        })
        
    }
}


const Blur = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width:100%;
height:calc(100vh - 70px);
position:relative;
filter:${a=> a.blur?"blur(2px)":""};
>h1{
font-size:40px;
font-weight:700;
}
>button{
}
`
const SuccessfulOrder = styled.div`
border:1px solid black;
background-color:#fdfcdc;
max-width:500px;
width:80vw;
display:flex;
border:1px solid, black;
border-radius:5px;
margin-top:40px;
flex-direction:column;
justify-content:center;
align-items:center;
z-index: 1;
position:absolute;
padding:20px;
filter:blur(0px) !important;
h1{
    font-size:40px;
    font-weight:700;
}

`

const Background = styled.div`

display:flex;
flex-direction:column;
align-items:center;
margin-top:50px;    
width:100%;
height:calc(100vh - 70px);
position:relative;



button{
  font-size:15px;
  border:0px;
  border-radius:5px;
  background-color:#46B0BA;
  width:150px;
  height:35px;
  margin-top:40px;
  color:white;
  
}
`
const Payment = styled.div`
background-color:#fdfcdc;
width:48vw;
min-width:320px;
margin-top:50px;
height:60px;
display:flex;
align-items:center;
padding:20px 50px;
justify-content:space-between;
p{
    color:#0081a7;
    font-weight:700;
    font-size: 20px;
}
select{
    width:200px;
    height:30px;
    border-radius:3px;
    border:0px;
    background-color:white;
    font-size: 20px;
    font-weight:400;
}
option{
    font-size: 20px;
    
}

`
const Items = styled.div`

background-color:white;
width:48vw;
min-width:320px;
margin-top:50px;
p{  
    width:20vw;
    font-weight:700;
    font-size:18px;
    display:flex;
    justify-content:center;

}

div{
    display:flex;
    align-items:center;
    padding:15px 50px;
    background-color:white;
   
}

`

const Total = styled.div`
background-color:#0081a7;
width:48vw;
min-width:320px;
margin-top:50px;
display:flex;
align-items:center;
padding:20px 50px;
justify-content:space-between;
border-radius:20px;
p{
    color:white;
    font-weight:700;
    font-size:18px;
    
}

`

