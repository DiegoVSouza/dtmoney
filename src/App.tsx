import { useState } from "react";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import { NewTrasactionModal } from "./components/NewTrasactionModal";
import { TrasactionProvider } from "./hooks/useTransactions";

import { GlobalStyle } from "./styles/global";



Modal.setAppElement('#root');


export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true)
    }

    
    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false)
    }

  return (
    <TrasactionProvider>
      <GlobalStyle/>
      <Header onOpenNewTrasactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      <NewTrasactionModal isNewTransactionModalOpen={isNewTransactionModalOpen} OnCloseNewTrasactionModal={handleCloseNewTransactionModal}/>
    </TrasactionProvider>
  );
}

