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
      await deleteExpenseCategory(expense.id); // Chama a funçãoo para excluir a categoria de despesa
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
      {/* Header do Modal */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: expense.color }}>
          <span className="text-2xl font-bold text-white">
            {expense.title.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{expense.title}</h2>
        <p className="text-lg text-gray-600">
          Total: <span className="font-bold text-2xl" style={{ color: expense.color }}>
            {currencyFormatter(expense.total)}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {expense.items?.length || 0} {expense.items?.length === 1 ? 'item' : 'itens'} registrados
        </p>
      </div>

      {/* Seção de Ações */}
      <div className="mb-8 p-4 bg-red-50 rounded-xl border border-red-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-3">
            ⚠️ Ações Destrutivas
          </h3>
          <p className="text-sm text-red-600 mb-4">
            Esta ação irá deletar toda a categoria e todos os itens associados.
          </p>
          <button
            onClick={deleteExpenseHandler}
            className="btn btn-danger relative z-20"
          >
            <span className="icon">🗑️</span>
            <span>Deletar Categoria Completa</span>
          </button>
        </div>
      </div>

      {/* Histórico de Gastos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            📊 Histórico de Gastos
          </h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {expense.items?.length || 0} itens
          </span>
        </div>

        {/* Lista de itens de despesa */}
        {expense.items && expense.items.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {expense.items.map((item, index) => {
              return (
                <div key={item.id} className="card p-4 hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">
                          {item.createdAt.toMillis
                            ? new Date(item.createdAt.toMillis()).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : new Date(item.createdAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-800">
                        {currencyFormatter(item.amount)}
                      </span>
                      <button
                        onClick={() => {
                          deleteExpenseItemHandler(item);
                        }}
                        className="relative z-20 p-2 hover:bg-red-100 rounded-full transition-colors duration-200 group/btn opacity-0 group-hover:opacity-100"
                        title="Deletar este item"
                      >
                        <FaRegTrashAlt className="text-red-600 group-hover/btn:text-red-700 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-gray-500 text-lg">Nenhum gasto registrado ainda</p>
            <p className="text-gray-400">Adicione despesas para ver o histórico aqui</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ViewExpenseModal;
