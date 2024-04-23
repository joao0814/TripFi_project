// Importa bibliotecas do React
import { useState, useContext, useRef } from "react";

// Importa o contexto de finanças e a função uuidv4 para gerar um único ID para cada despesa e nunca dar conflito 
import { financeContext } from "@/lib/store/finance-context";
import { v4 as uuidv4 } from "uuid";

// Importa o componente Modal e a função de toast
import Modal from "@/components/Modal";
import { toast } from "react-toastify";

// Componente de modal para adicionar despesas
function AddExpensesModal({ show, onClose }) {
  // Define estados para controlar o valor da despesa, categoria selecionada e exibição do modal de adição de categoria
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Obtém dados de despesas e funções de adição de despesa e categoria do contexto de finanças
  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  // Refs para os campos de título e cor da nova categoria de despesa
  const titleRef = useRef();
  const colorRef = useRef();

  // Função para adicionar uma nova despesa
  const addExpenseItemHandler = async () => {
    // Encontra a categoria de despesa selecionada
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    // Cria um novo objeto de despesa com o valor adicionado
    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      // Adiciona a nova despesa ao Firestore
      await addExpenseItem(selectedCategory, newExpense);

      // Limpa o valor da despesa e a categoria selecionada, fecha o modal e exibe uma mensagem de sucesso
      setExpenseAmount("");
      setSelectedCategory(null);
      onClose();
      toast.success("Gastos adicionado com sucesso!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Função para adicionar uma nova categoria de despesa
  const addCategoryHandler = async () => {
    // Obtém o título e a cor da nova categoria de despesa
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      // Adiciona a nova categoria ao Firestore
      await addCategory({ title, color, total: 0 });

      // Fecha o modal de adição de categoria e exibe uma mensagem de sucesso
      setShowAddExpense(false);
      toast.success("Categoria criada com sucesso!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Renderiza o conteúdo do modal de adição de despesa
  return (
    <Modal show={show} onClose={onClose}>
      <div className="text-center pb-5">
        <h1 className="text-3xl">Despesas</h1>
      </div>

      {/* Campo de entrada para o valor da despesa */}
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

      {/* Lista de categorias de despesas */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Selecione a categoria</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-lime-400"
            >
              + Nova categoria
            </button>
          </div>

          {/* Modal de adição de nova categoria */}
          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Coloque o nome" ref={titleRef} />

              <label>Escolha a cor</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />
              <button
                onClick={addCategoryHandler}
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

          {/* Botões para selecionar categorias de despesas */}
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
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    {/* Círculo colorido */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Botão para adicionar a despesa */}
      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Adicione o gasto
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
