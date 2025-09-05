"use client";

import { useState, useContext, useRef } from "react"; // Hooks do React para estados, contexto e referências
import { financeContext } from "@/lib/store/finance-context"; // Contexto financeiro para acessar despesas e funções relacionadas
import { v4 as uuidv4 } from "uuid"; // Pacote para gerar IDs únicos
import Modal from "@/components/Modal"; // Componente de modal para adicionar despesas
import { toast } from "react-toastify"; // Pacote para exibir mensagens de notificação
import { currencyFormatter } from "@/lib/utils"; // Importa o componente de formatação de moeda

// Componente AddExpensesModal para adicionar despesas
function AddExpensesModal({ show, onClose }) {
  // Estados locais para o valor da despesa, categoria selecionada e exibição do modal de adicionar despesa
  const [expenseAmount, setExpenseAmount] = useState(""); // Estado para o valor da despesa
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para a categoria selecionada
  const [showAddExpense, setShowAddExpense] = useState(false); // Estado para exibir o modal de adicionar despesa

  // Contexto financeiro para acessar despesas, adicionar item de despesa e adicionar categoria
  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  // Referências para os campos de título e cor da categoria
  const titleRef = useRef(); // Referência para o campo de título da categoria
  const colorRef = useRef(); // Referência para o campo de cor da categoria

  // Função para adicionar um item de despesa
  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(), // Gerar um ID único para o item de despesa
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense); // Adicionar o item de despesa ao contexto
      setExpenseAmount(""); // Limpar o valor da despesa após adicionar
      setSelectedCategory(null); // Limpar a categoria selecionada após adicionar
      onClose(); // Fechar o modal de adicionar despesa
      toast.success("Gastos adicionado com sucesso!"); // Exibir uma mensagem de sucesso
    } catch (error) {
      console.log(error.message); // Registrar qualquer erro no console
      toast.error(error.message); // Exibir uma mensagem de erro
    }
  };

  // Função para adicionar uma nova categoria
  const addCategoryHandler = async () => {
    const title = titleRef.current.value; // Obter o título da nova categoria do campo de referência
    const color = colorRef.current.value; // Obter a cor da nova categoria do campo de referência

    try {
      await addCategory({ title, color, total: 0 }); // Adicionar a nova categoria ao contexto
      setShowAddExpense(false); // Ocultar o formulário de adicionar nova categoria após adicionar
      toast.success("Categoria criada com sucesso!"); // Exibir uma mensagem de sucesso
    } catch (error) {
      console.log(error.message); // Registrar qualquer erro no console
      toast.error(error.message); // Exibir uma mensagem de erro
    }
  };

  return (
    // Modal de adicionar despesa
    <Modal show={show} onClose={onClose}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">💸</span>
        </div>
        <h1 className="text-3xl font-bold gradient-text">Adicionar Despesa</h1>
        <p className="text-gray-600 mt-2">Registre um novo gasto em sua conta</p>
      </div>

      {/* Campo para inserção do valor da despesa */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-700 mb-3">
          💰 Valor da Despesa
        </label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Digite o valor do gasto"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
          className="w-full text-lg"
        />
      </div>

      {/* Lista de categorias de despesas */}
      {expenseAmount > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              📂 Selecione a categoria
            </h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="btn btn-secondary text-sm"
            >
              <span className="icon">➕</span>
              <span>Nova categoria</span>
            </button>
          </div>

          {/* Formulário para adicionar nova categoria */}
          {showAddExpense && (
            <div className="card p-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">Criar Nova Categoria</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da categoria
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ex: Alimentação" 
                    ref={titleRef}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cor da categoria
                  </label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      className="w-12 h-12 rounded-lg border-2 border-gray-200" 
                      ref={colorRef}
                    />
                    <span className="text-sm text-gray-500">Escolha uma cor</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={addCategoryHandler}
                  className="btn btn-primary flex-1"
                >
                  <span className="icon">✅</span>
                  <span>Criar Categoria</span>
                </button>
                <button
                  onClick={() => {
                    setShowAddExpense(false);
                  }}
                  className="btn btn-danger flex-1"
                >
                  <span className="icon">❌</span>
                  <span>Cancelar</span>
                </button>
              </div>
            </div>
          )}

          {/* Lista de categorias existentes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expenses.map((expense) => {
              return (
                <button
                  key={expense.id}
                  onClick={() => {
                    setSelectedCategory(expense.id);
                  }}
                  className="w-full group"
                >
                  <div
                    className={`card p-4 transition-all duration-300 ${
                      expense.id === selectedCategory 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                        style={{ backgroundColor: expense.color }}
                      >
                        {expense.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-800 capitalize group-hover:text-blue-600 transition-colors">
                          {expense.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {currencyFormatter(expense.total)} gastos
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Botão para adicionar a despesa */}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            className="btn btn-primary w-full text-lg py-4" 
            onClick={addExpenseItemHandler}
          >
            <span className="icon">💸</span>
            <span>Adicionar Despesa de {currencyFormatter(expenseAmount)}</span>
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
