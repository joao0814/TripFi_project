"use client";

import { useRef, useContext } from "react";
import { currencyFormatter } from "@/lib/utils";

import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

// Icons
import { FaRegTrashAlt } from "react-icons/fa";

import Modal from "@/components/Modal";

import { toast } from "react-toastify";

function AddIncomeModal({ show, onClose }) {
  // Referência para o input do valor da renda
  const amountRef = useRef();
  // Referência para o input da descrição da renda
  const descriptionRef = useRef();

  // Contexto de finanças para acessar a função de adicionar e remover entradas de renda
  const { income, addIncomeItem, removeIncomeItem } =
    useContext(financeContext);
  // Contexto de autenticação para obter o usuário logado
  const { user } = useContext(authContext);

  // Função para adicionar uma nova entrada de renda
  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };

    try {
      await addIncomeItem(newIncome); // Chama a função para adicionar a entrada de renda
      descriptionRef.current.value = ""; // Limpa o campo de descrição após adicionar a renda
      amountRef.current.value = ""; // Limpa o campo de valor após adicionar a renda
      toast.success("Valor adicionado com sucesso!"); // Exibe um toast de sucesso
    } catch (error) {
      console.log(error.message);
      toast.error(error.message); // Exibe um toast de erro caso ocorra algum problema
    }
  };

  // Função para excluir uma entrada de renda
  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId); // Chama a função para remover a entrada de renda
      toast.success("Valor deletado com sucesso!."); // Exibe um toast de sucesso após a exclusão
    } catch (error) {
      console.log(error.message);
      toast.error(error.message); // Exibe um toast de erro caso ocorra algum problema
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="text-center pb-5">
        <h1 className="text-3xl">Entradas</h1>
      </div>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="amount">Valor</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Coloque o valor"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Descrição</label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Coloque a descrição do valor"
            required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="btn btn-primary">
            Adicionar entrada
          </button>
        </div>
      </form>

      {/* Histórico de entradas */}
      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Histórico de entradas</h3>
        <div className="overflow-y-auto">
          {income.map((i) => {
            return (
              <div className="flex justify-between item-center " key={i.id}>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">
                  {i.createdAt instanceof Date ? i.createdAt.toISOString() : ""}
                </small>

                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  {/* Botão para excluir a entrada de renda */}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id); // Chama a função para excluir a entrada de renda
                    }}
                  >
                    <FaRegTrashAlt /> {/* Ícone de lixeira para excluir */}
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default AddIncomeModal;
