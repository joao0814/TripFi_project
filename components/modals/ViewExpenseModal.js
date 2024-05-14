"use client";

import { useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";

import Modal from "@/components/Modal";
import { currencyFormatter } from "@/lib/utils";

import { FaRegTrashAlt } from "react-icons/fa";

import { toast } from "react-toastify";

function ViewExpenseModal({ show, onClose, expense }) {
  // Contexto de finanças para acessar as funções de exclusão de despesas e categorias
  const { deleteExpenseItem, deleteExpenseCategory } =
    useContext(financeContext);

  // Função para excluir a categoria de despesa
  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id); // Chama a função para excluir a categoria de despesa
      toast.success("Categoria de viagem apagada com sucesso!"); // Exibe um toast de sucesso após a exclusão
    } catch (error) {
      console.log(error.message);
      toast.error(error.message); // Exibe um toast de erro caso ocorra algum problema
    }
  };

  // Função para excluir um item de despesa
  const deleteExpenseItemHandler = async (item) => {
    try {
      // Remove o item da lista de despesas
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      // Atualiza o saldo da despesa
      const updatedExpense = {
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(updatedExpense, expense.id); // Chama a função para excluir o item de despesa
      toast.success("Despesa removida com sucesso!"); // Exibe um toast de sucesso após a exclusão
    } catch (error) {
      console.log(error.message);
      toast.error(error.message); // Exibe um toast de erro caso ocorra algum problema
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex items-center  justify-between">
        {/* Título da categoria de despesa */}

        <div class=" modal-header flex text-center items-center pb-4 border-b">
          <h2 class="text-xl font-semibold">{expense.title}</h2>
        </div>
        {/* <h2 className="text-4xl"></h2> */}
        {/* Botão para excluir a categoria de despesa */}
        <button
          onClick={deleteExpenseHandler}
          className="btn btn-danger border-hidden"
        >
          Deletar
        </button>
      </div>

      <div>
        <h3 className="my-4 text-2xl">Histórico de gastos</h3>
        {/* Lista de itens de despesa */}
        {expense.items.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <small>
                {/* Exibe a data do item de despesa */}
                {item.createdAt.toMillis
                  ? new Date(item.createdAt.toMillis()).toISOString()
                  : item.createdAt.toISOString()}
              </small>
              <p className="flex items-center gap-2">
                {/* Formata e exibe o valor do item de despesa */}
                {currencyFormatter(item.amount)}
                {/* Botão para excluir o item de despesa */}
                <button
                  onClick={() => {
                    deleteExpenseItemHandler(item);
                  }}
                >
                  <FaRegTrashAlt /> {/* Ícone de lixeira para excluir */}
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
