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
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registra os elementos do Chart.js necessários
ChartJS.register(ArcElement, Tooltip, Legend);

// Componente principal da página inicial
export default function Home() {
  // Define estados para controlar a exibição dos modais e o saldo
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Obtém dados de despesas e receitas do contexto de finanças e o usuário do contexto de autenticação
  const { expenses, income } = useContext(financeContext);
  const { user } = useContext(authContext);

  // Calcula o valor total das despesas
  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.total, 0);
    setTotalExpenses(total);
  }, [expenses]);

  // Atualiza o saldo com base nas despesas e receitas sempre que eles mudam
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => total + i.amount, 0) - totalExpenses;
    setBalance(newBalance);
  }, [income, totalExpenses]);

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
      <main className="container max-w-6xl px-6 mx-auto">
        <div className="pt-8">
          <div className="lg:flex lg:justify-between lg:items-start">
            {/* Coluna 1 */}
            <div className="lg:w-1/2">
              <div className="text-center">
                <h1 className="text-4xl font-bold">
                  Registre suas despesas de maneira fácil e rápida!
                </h1>
              </div>

              {/* Passos para o usuário */}
              <section className="pt-8">
                <h1 className="text-3xl pb-2">Meu saldo:</h1>
                <h2 className="text-4xl font-bold">
                  {currencyFormatter(balance)}
                </h2>
              </section>

              {/* Botões para adicionar despesas e receitas */}
              <section className="flex items-center gap-2 py-3">
                <button
                  onClick={() => setShowAddExpenseModal(true)}
                  className="btn btn-primary"
                >
                  + Despesas
                </button>
                <button
                  onClick={() => setShowAddIncomeModal(true)}
                  className="btn btn-primary-outline"
                >
                  + Renda
                </button>
              </section>
            </div>

            {/* Coluna 2 */}
            <div className="lg:w-1/2">
              {/* Exibição de despesas por categoria */}
              <div className="px-5">
                <h2 className="text-4xl font-semibold pb-4">
                  Minhas despesas por categoria:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {expenses.map((expense, index) => (
                    <ExpenseCategoryItem key={index} expense={expense} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de despesas */}
          <div className="text-center pt-8">
            <h3 className="text-3xl font-semibold">Despesas por categoria</h3>
            <div className="mx-auto" style={{ maxWidth: "600px" }}>
              <Doughnut
                data={{
                  labels: expenses.map((expense) => expense.title),
                  datasets: [
                    {
                      label: "Despesas",
                      data: expenses.map((expense) => expense.total),
                      backgroundColor: expenses.map((expense) => expense.color),
                      borderColor: "#18181b",
                      borderWidth: 5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        padding: 20,
                        usePointStyle: false,
                        font: {
                          size: 16,
                        },
                      },
                    },
                  },
                }}
                style={{ width: "100%", height: "400px" }}
              />
            </div>
          </div>

          {/* Total de despesas */}
          <div className="text-center pt-4">
            <p className="text-xl ">
              Total de despesas:
              <p className="text-2xl font-semibold">
                {currencyFormatter(totalExpenses)}
              </p>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
