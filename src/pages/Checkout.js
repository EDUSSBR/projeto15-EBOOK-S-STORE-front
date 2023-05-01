import axios from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../ContextAPI/ContextUser"

export default function Checkout(){
    const navigate = useNavigate()
        const {setConfig} = useContext(UserContext)
        useEffect(()=>{
        const lctoken = localStorage.getItem("token")
        if(!lctoken){
            navigate("/")
        }
        if(lctoken){
            
            axios.post(`${process.env.REACT_APP_BACK_API_URL}/token`, {}, {headers:{
                Authorization: "Bearer " + lctoken
            }}).then(res=>{
                if(!res.data){
                    navigate("/")
                }   
                setConfig({headers:{
                    Authorization: "Bearer " + lctoken
                }})
            }).catch(err=>{
                alert(err.response.data)
            })

            }}, [])
    return (
        <></>
    )
}