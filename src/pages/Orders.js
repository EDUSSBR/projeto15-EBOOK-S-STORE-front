import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";

export default function Orders() {
    const [orders, setOrders] = useState([])
    const lctoken = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_API_URL}/order`, {
            headers: {
                Authorization: "Bearer " + lctoken
            }
        })
            .then((ans) => {
                setOrders(ans.data)
            })
            .catch(e => console.log(e))
    }, [])
    return (
        <>
            <Header />
            <OrderContainer>
                <h1>Pedidos</h1>
                {!lctoken && <p>Faça login para ver seus pedidos</p>}
                {orders ? (
                    orders.map((ord) => (
                        <Order>
                            <InfOrders>
                                <p>Nº do pedido: #{ord._id}</p>
                                <p>Forma de pagamento: {ord.paymentForm}</p>
                            </InfOrders>
                            {(ord.cart).map((itens) => (
                                <Items>
                                    <img src={itens.imageUrl} />
                                    <p>quantidade: {itens.quantity}</p>
                                    <p>valor: R$ {Number(itens.price) * itens.quantity}</p>
                                </Items>
                            ))}
                            <Borda/>
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
    p{
        font-size: 20px;
        margin: 5px;
    }
`

const Order = styled.div`
    width: 70%;
    background-color: #fff ;
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
    border-bottom: 1px solid #000;
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
const Borda = styled.div`
    border-bottom: 1px solid #000
`