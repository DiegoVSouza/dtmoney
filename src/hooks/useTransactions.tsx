
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction{
    id:number,
    title: string;
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TrasactionProviderProps{
    children: ReactNode;
}

interface TransactionsContext{
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>,
}

const TrasactionContext = createContext<TransactionsContext>(
    {} as TransactionsContext);

export function TrasactionProvider ({ children }:TrasactionProviderProps){
    const [transactions, setTrasactions] = useState<Transaction[]>([])
 
    useEffect(()=>{
        api.get('transactions')
        .then(response => setTrasactions(response.data.transactions))
    },[]);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('transactions', {
            ...transactionInput,
            createdAt: new Date,
        });
        const {transaction} = response.data;
        setTrasactions([
            ...transactions,
            transaction,
        ]);
    }

    return(
        <TrasactionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TrasactionContext.Provider>
    );
};

export function useTransactions(){
    const context = useContext(TrasactionContext)

    return context  
}
