import styled from "styled-components";
import { Header } from "../components/Header";

export default function Orders(){
    return(
        <>
        <Header/>
        <OrderContainer>
            <h1>Pedidos</h1>

            <Order>
                <InfOrders>
                    <p>Nº do pedido</p>
                    <p>Data</p>
                </InfOrders>
                <InfOrders>
                    <p>Forma de pagamento</p>
                </InfOrders>
                <Items>
                    <img src="https://m.media-amazon.com/images/I/6132ndvQdiL.jpg"/>
                    <p>quantidade: 10</p>
                    <p>valor total: R$ 360,00</p>
                </Items>
                <p>Total: R$ 360,00</p>
            </Order>
        </OrderContainer>
        </>
    )
}

const OrderContainer = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 50px;
    h1{
        font-size:40px;
        font-weight:700;
    }
`

const Order = styled.div`
    width: 50%;
    height: 300px;
    background-color: #fff ;
    margin-top:30px;
    border-radius: 20px;
    display: flex;
    flex-direction:column ;
    padding: 30px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
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