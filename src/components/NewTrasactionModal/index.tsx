import Modal from 'react-modal'
import { FormEvent, useState, useContext } from 'react';


import closeImg from '../../assets/imgs/close.svg'
import incomeImg from '../../assets/imgs/income.svg'
import outcomeImg from '../../assets/imgs/outcome.svg'

import { Container, RadioBox, TrasactionTypeContainer } from './styles';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTrasactionModalProps {
    isNewTransactionModalOpen: boolean,
    OnCloseNewTrasactionModal: () => void,
}

export function NewTrasactionModal({ isNewTransactionModalOpen, OnCloseNewTrasactionModal }: NewTrasactionModalProps) {
    const { createTransaction } = useTransactions()

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const [type, setType] = useState('deposit')

    async function handleCreateNewTrasaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            type,
            category,
        });

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')

        OnCloseNewTrasactionModal()
    }



    return (
        <Modal isOpen={isNewTransactionModalOpen} onRequestClose={OnCloseNewTrasactionModal}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'
        >

            <button type='button' onClick={OnCloseNewTrasactionModal} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTrasaction}>
                <h2>Cadastrar Transação</h2>

                <input placeholder='Titulo' value={title} onChange={event => setTitle(event.target.value)} />
                <input type='number' placeholder='Valor' value={amount === 0 ? '' : amount} onChange={event => setAmount(Number(event.target.value))} />
                <TrasactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor='red'
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TrasactionTypeContainer>

                <input placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)} />
                <button type="submit">Cadastrar</button>

            </Container>

        </Modal>
    )
}
