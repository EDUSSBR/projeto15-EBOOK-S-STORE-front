import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react"
import axios from "axios";

export function Header() {
  let lctoken =JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(false)
  console.log(lctoken)
  useEffect(()=>{
    lctoken = JSON.parse(localStorage.getItem("token"))
        if(lctoken){
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/getuser`, {}, {headers:{
                Authorization: "Bearer " + lctoken
            }}).then(res=>{
                if(!res.data){
                    navigate("/login")
                }
                if(res.data.isAdmin){
                    setAdmin(true)
                }
            }).catch(err=>{
                navigate("/login")
                localStorage.removeItem("token")
            })

            }}, [lctoken])




  return <HeaderContainer>
    <p onClick={()=> navigate("/")}>Ebook'Store</p>
    {!lctoken?(
    <><button onClick={()=> navigate("/login")}>Login</button>
    <button onClick={()=> navigate("/cadastro")}>Cadastro</button></>)
    :
    <>
    {admin&&<Addproduct onClick={()=> navigate("/addproduct")}>Adicionar Produto</Addproduct>}
    <button onClick={() => navigate("/pedidos")}>Pedidos</button>
    </>
    }
  </HeaderContainer>
}


const Addproduct = styled.button`
  font-size:15px;
  border:0px;
  border-radius:5px;
  background-color:#fdfcdc;
  width:160px !important;
  height:35px;
  position: absolute;
  right: 20px;
`

const HeaderContainer = styled.header`
position:sticky;
width:100%;
height:70px;
background-color:#2982A8;
display: flex;
align-items:center;
justify-content:center;
-webkit-box-shadow: inset 0px 1px 6px 1px #FDFBDD, 0px 1px 14px 1px #FDFBDD;
-moz-box-shadow: inset 0px 1px 6px 1px #FDFBDD,0px 1px 14px 1px #FDFBDD;
box-shadow: inset 0px 1px 6px 1px #FDFBDD, 0px 1px 14px 1px #FDFBDD;
z-index:20;
position: relative; //foi aqui
p {
  font-family: "Rubik Burned", sans-serif;
  font-size: 40px;
  color: #FDFBDD;
  padding: 0 17px;
  border-radius:4px;
  cursor: pointer;
} 
button:nth-child(2){
  position: absolute;
  right: 20px;


}

button{
  font-size:15px;
  border:0px;
  border-radius:5px;
  background-color:#fdfcdc;
  width:100px;
  height:35px;
}
button:nth-child(3){
  position: absolute;
  right: 200px;
  font-size:15px;
}
@media (max-width: 768px){
        justify-content: space-between;
    }
`

