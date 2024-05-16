"use client";

import { useState, useContext, useRef } from "react"; // Hooks do React para estados, contexto e referências
import { financeContext } from "@/lib/store/finance-context"; // Contexto financeiro para acessar despesas e funções relacionadas
import { v4 as uuidv4 } from "uuid"; // Pacote para gerar IDs únicos
import Modal from "@/components/Modal"; // Componente de modal para adicionar despesas
import { toast } from "react-toastify"; // Pacote para exibir mensagens de notificação

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
      <div className="text-center pb-5">
        <h1 className="text-3xl">Despesas</h1>
      </div>

      {/* Lista de categorias de despesas */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Selecione a categoria</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-slate-700"
            >
              + Nova categoria
            </button>
          </div>

          {/* Formulário para adicionar nova categoria */}
          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Coloque o nome" ref={titleRef} />{" "}
              {/* Campo para inserir o título da nova categoria */}
              <label>Escolha a cor</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />{" "}
              {/* Campo para escolher a cor da nova categoria */}
              <button
                onClick={addCategoryHandler} // Ao clicar, chama a função para adicionar nova categoria
                className="btn btn-primary-outline"
              >
                Criar
              </button>
              <button
                onClick={() => {
                  setShowAddExpense(false);
                }}
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Lista de categorias existentes */}
          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-200 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    {/* Círculo colorido para representar a categoria */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4 className="capitalize">{expense.title}</h4>{" "}
                    {/* Título da categoria */}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Campo para inserção do valor da despesa */}
      <div className="flex flex-col gap-4">
        <label>Insira um valor</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Valor do gasto"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/* Botão para adicionar a despesa */}
      {expenseAmount > 0 && selectedCategory && (
        <div className="flex justify-center mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Adicione o gasto
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
