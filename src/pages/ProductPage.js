import styled from "styled-components"
import editionButton from "../images/lapis.png"

export default function ProductPage(){
    return(
        <PageProdutc>
            <BookTittle>
                <p>Extraordinario</p>
                <img src = {editionButton}/>
            </BookTittle>
            <ContainerProdutsInformation>
                <img src="https://livrariacultura.vteximg.com.br/arquivos/ids/151564455/30746679.jpg?v=638181068744470000"/>
                <BuyContainer>
                    <p>R$ 50,00</p>
                    <Description>
                        O Auggie nasceu com uma síndrome cuja sequela é uma severa deformidade facial, que lhe impôs diversas cirurgias e complicações médicas. Por isso ele nunca frequentou uma escola de verdade... Até agora. Todo mundo sabe que é difícil ser um aluno novo, mais ainda quando se tem um rosto tão diferente. Prestes a começar o quinto ano em um colégio particular em Nova York,
                    </Description>
                    <form>
                        <div>
                            <div>Selecione a quantidade</div>
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <button>Adicionar ao Carrinho</button>
                        <button>Comprar agora</button>
                    </form>
                </BuyContainer>
            </ContainerProdutsInformation>
        </PageProdutc>
    )
}

const PageProdutc = styled.div`
    width: 100%;
    height: 100vh;
`
const BookTittle = styled.div`
    font-size: 80px;
    margin-left:300px;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    img{
        width: 35px;
        height: 35px;
    }
`
const ContainerProdutsInformation = styled.div`
    display:flex;
    justify-content: center;
    img{
        width: 300px;
    }
    form{
        display:flex;
        flex-direction: column;
        justify-content:space-between;
        align-items:center;
        height: 150px;
        div{
            display: flex;
            justify-content:space-between;
            width: 190px;
        }
    }
`
const BuyContainer = styled.div`
    display:flex;
    flex-direction: column;
    width: 500px;
    justify-content:space-between;
    align-items:center;
    padding: 15px;
    button{
        width: 300px;
        height: 50px;
    }
    p{
        font-size: 70px
    }
`

const Description = styled.div`
    font: 20px;
`