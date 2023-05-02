import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";

export default function Orders(){
    const [orders, setOrders] = useState([])
   
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACK_API_URL}/order`) 
            .then((ans)=>{
                console.log("chega aqui") 
                setOrders(ans.data)
            })     
            .catch(e => alert(e))
    },[])
    return(
        <>
        <Header/>
        <OrderContainer>
            <h1>Pedidos</h1>

            {orders ? (
                orders.map((ord)=>(
                    <Order>
                    <InfOrders>
                        <p>Nº do pedido: {ord._id}</p>
                        <p>Forma de pagamento: {ord.paymentForm}</p>
                    </InfOrders>
                    {(ord.cart).map((itens) =>(
                        <Items>
                        <img src={itens.imageUrl}/>
                        <p>quantidade: {itens.quantity}</p>
                        <p>valor total: R$ {Number(itens.price) * itens.quantity}</p>
                    </Items>
                    ))}
                    <p>Total do pedido: R$ {ord.total}</p>
                </Order>
                ))
            ) : (
                <p>carregando...</p>
            )
        }
        </OrderContainer>
        </>
    )
}

const OrderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 50px;
    h1{
        font-size:40px;
        font-weight:700;
        margin-bottom:30px ;
    }
`

const Order = styled.div`
    width: 70%;
    /* height: 300px; */
    background-color: #fff ;
    /* margin-top:30px; */
    border-radius: 20px;
    display: flex;
    flex-direction:column ;
    padding: 30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    margin-bottom:30px;
`
const InfOrders = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #fff ;
    margin-bottom:10px;
`

const Items = styled.div`
    display: flex;
    margin-bottom:10px ;
    background-color: #fff ;
    align-items: center;
    justify-content: space-between;
    img{
        width: 100px;
    }
`