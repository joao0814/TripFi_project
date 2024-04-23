"use client";

// Importa bibliotecas necessárias do React
import { useState, useContext, useEffect } from "react";

// Importa o contexto de finanças e de autenticação
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

// Importa o componente de formatação de moeda
import { currencyFormatter } from "@/lib/utils";

// Importa o componente de item de categoria de despesa
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";

// Importa os modais de adição de receita e despesa, e o componente de login
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import SignIn from "@/components/SignIn";

// Importa componentes do Chart.js e do react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Steps from "@/components/Steps";

// Registra os elementos do Chart.js necessários
ChartJS.register(ArcElement, Tooltip, Legend);

// Componente principal da página inicial
export default function Home() {
  // Define estados para controlar a exibição dos modais e o saldo
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0);

  // Obtém dados de despesas e receitas do contexto de finanças e o usuário do contexto de autenticação
  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  // Atualiza o saldo com base nas despesas e receitas sempre que eles mudam
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  // Renderiza o componente de login se o usuário não estiver autenticado
  if (!user) {
    return <SignIn />;
  }

  // Renderiza o conteúdo da página
  return (
    <>
      {/* Modais de adição de receita e despesa */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setShowAddIncomeModal}
      />
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />

      {/* Conteúdo principal da página */}
      <main className="container max-w-2xl px-6 mx-auto">
        <div className="pt-8">
          <div>
            <div className="text-center">
              <h1 className="text-4xl font-bold">Registre suas despesas de maneira fácil e rápida!</h1>
            </div>
            <Steps />
          </div>
          <section className="pt-8">
            {/* Exibe o saldo */}
            <h1 className="text-3xl pb-2">Minha renda</h1>
            <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
          </section>

          {/* Botões para adicionar despesas e receitas */}
          <section className="flex items-center gap-2 py-3">
            <button
              onClick={() => {
                setShowAddExpenseModal(true);
              }}
              className="btn btn-primary"
            >
              + Despesas
            </button>
            <button
              onClick={() => {
                setShowAddIncomeModal(true);
              }}
              className="btn btn-primary-outline"
            >
              + Renda
            </button>
          </section>

          {/* Lista de despesas por categoria */}
          <section className="py-6">
            <h3 className="text-2xl">Minhas despesas por categoria</h3>
            <div className="flex flex-col gap-4 mt-6">
              {expenses.map((expense) => {
                return <ExpenseCategoryItem key={expense.id} expense={expense} />;
              })}
            </div>
          </section>

          {/* Gráfico de despesas */}
          <section className="py-6">
            <a id="stats" />
            <h3 className="text-2xl">Status</h3>
            <div className="w-1/2 mx-auto">
              <Doughnut
                data={{
                  labels: expenses.map((expense) => expense.title),
                  datasets: [
                    {
                      label: "Expenses",
                      data: expenses.map((expense) => expense.total),
                      backgroundColor: expenses.map((expense) => expense.color),
                      borderColor: ["#18181b"],
                      borderWidth: 5,
                    },
                  ],
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
