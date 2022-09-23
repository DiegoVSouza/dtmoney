
import logoImg from '../../assets/imgs/Logo.svg'
import { Container, Content } from './styles'


interface HeaderProps{
    onOpenNewTrasactionModal: ()=>void;
}

export function Header({onOpenNewTrasactionModal}: HeaderProps){

    return(
        <Container>
            <Content>
                <img src= {logoImg} alt="dt money"/>
                <button type="button" onClick={onOpenNewTrasactionModal}>
                    Nova Transação 
                </button>

                
            </Content>
        </Container>
    )
}