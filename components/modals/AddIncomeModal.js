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
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">💵</span>
        </div>
        <h1 className="text-3xl font-bold gradient-text">Adicionar Receita</h1>
        <p className="text-gray-600 mt-2">Registre uma nova entrada em sua conta</p>
      </div>

      <form onSubmit={addIncomeHandler} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label htmlFor="amount" className="block text-lg font-semibold text-gray-700 mb-3">
              💰 Valor da Receita
            </label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Digite o valor"
              required
              className="w-full text-lg"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-3">
              📝 Descrição
            </label>
            <input
              name="description"
              ref={descriptionRef}
              type="text"
              placeholder="Ex: Salário, Freelance..."
              required
              className="w-full text-lg"
            />
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn btn-renda w-full text-lg py-4">
            <span className="icon">💵</span>
            <span>Adicionar Receita</span>
          </button>
        </div>
      </form>

      {/* Histórico de entradas */}
      {income.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3">📊</span>
            Histórico de Receitas
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto modal-scroll">
            {income.map((i) => {
              return (
                <div className="card p-4 hover:shadow-lg transition-all duration-300" key={i.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{i.description}</p>
                      <p className="text-sm text-gray-500">
                        {i.createdAt instanceof Date 
                          ? i.createdAt.toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : ""
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-emerald-600">
                        {currencyFormatter(i.amount)}
                      </span>
                      <button
                        onClick={() => {
                          deleteIncomeEntryHandler(i.id);
                        }}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
                      >
                        <FaRegTrashAlt className="text-red-600 text-sm group-hover:text-red-700 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {income.length === 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="text-4xl mb-4">📈</div>
          <p className="text-gray-500 text-lg">Nenhuma receita registrada ainda</p>
          <p className="text-gray-400">Adicione sua primeira receita para começar</p>
        </div>
      )}
    </Modal>
  );
}

export default AddIncomeModal;
