import styled from "styled-components";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { bookCircle } from "../styles/keyframes";
import { useNavigate } from "react-router-dom";

export function BookItem({id, price, name, imageUrl }) {

    const navigate = useNavigate();

    function navigateToPageProduct(){
        console.log(`${process.env.REACT_APP_BACK_API_URL}product/${id}`);
        navigate(`/products/${id}`)
    }
    return <BookItemContainer>
        <img onClick={navigateToPageProduct} src={imageUrl} alt="capa" />
        <p>{name}</p>
        <p>R${price}</p>
        <Icons>
            <BsFillCartPlusFill />
            <span> <FaRegEdit /></span>
        </Icons>
    </BookItemContainer>
}

const Icons = styled.div`
    transition: all .3s;
    position: relative;
    display:block;
    border-radius:50%;
    width:40px;
    height:40px;
    left:0;
    bottom:-20px;
    border-bottom:1px solid #dad6d6;
    cursor:pointer;
    svg {
        width:20px;
        height:20px;
        position:absolute;
        left:10px;
        bottom:5px;
        opacity:1;
        transition: all 0.1s;
        background-color:#FDFBDD;
    }
    :hover{
        svg{
            :hover{
            transform:scale(1.25);
            fill:#46B0BA;
        }
    }
    } 
    span{
        position:absolute;
        left:-80px;
        bottom:17px;
        &:hover{
            transition:none;
        }
    }
`
const BookItemContainer = styled.div`
    color: #FDFBDD;
    background-color: #FDFBDD;
    border: none;
    max-width: 200px;
    height: 300px;
    border-radius: 4px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    flex-wrap:nowrap;
    img {
        z-index: 0;
        cursor:pointer;
        display:block;
        height:60%;
        width: 60%;
        -webkit-box-shadow: inset 0px -100px 60px -10px #FBD9B7;
        -moz-box-shadow: inset 0px -100px 60px -10px #FBD9B7;
        box-shadow: inset 0px -100px 60px -10px #FBD9B7;
    }
    &:hover {
        animation-name: ${bookCircle};
        animation-duration:0.3s;
        animation-fill-mode:forwards;
    }
    p{      
        width: 100%;
        text-align:center;
        &:nth-child(2){
            display:flex;
            align-items:center;
            justify-content:center;
            height:40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap:wrap;
            
        }
        &:nth-child(3){
            font-size: 25px;
            
        }
        &:nth-child(4){
            width: 24px;
            height: 24px;
            transform: scale(1.2);   
            span {
                transform:none;
                width: 24px;
            height: 24px;
            }
            
        }
        text-align:center;
        z-index: 4;
        font-family: 'Roboto', sans-serif; 
        font-weight: 700;
    }
`