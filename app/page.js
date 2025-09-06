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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 modal-container">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 modal-container">
          <div className="animate-fade-in">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                Controle Financeiro
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Gerencie suas finanças de forma inteligente e visual
              </p>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">💰</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Saldo Atual</h2>
                <p className="text-3xl font-bold gradient-text">
                  {currencyFormatter(balance)}
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">💸</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Total de Despesas</h2>
                <p className="text-3xl font-bold text-red-600">
                  {currencyFormatter(totalExpenses)}
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="text-3xl mb-3">📊</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Categorias Ativas</h2>
                <p className="text-3xl font-bold text-blue-600">
                  {expenses.length}
                </p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="btn btn-primary flex-1 sm:flex-none sm:w-auto justify-center"
              >
                <span>Adicionar Despesa</span>
              </button>
              <button
                onClick={() => setShowAddIncomeModal(true)}
                className="btn btn-renda flex-1 sm:flex-none sm:w-auto justify-center"
              >
                <span>Adicionar Renda</span>
              </button>
            </div>

            {/* Categorias */}
            <div className="mb-8">
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="mr-3">📊</span>
                  Despesas por Categoria
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {expenses.length > 0 ? (
                    expenses.map((expense, index) => (
                      <ExpenseCategoryItem key={index} expense={expense} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-6xl mb-4">📈</div>
                      <p className="text-gray-500 text-lg">
                        Nenhuma despesa registrada ainda
                      </p>
                      <p className="text-gray-400">
                        Adicione sua primeira despesa para começar
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Gráfico Section */}
            {expenses.length > 0 && (
              <div className="card p-6 mb-8 animate-slide-up" id="stats">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  📈 Análise Visual das Despesas
                </h3>
                <div className="max-w-lg mx-auto">
                  <Doughnut
                    data={{
                      labels: expenses.map((expense) => expense.title),
                      datasets: [
                        {
                          label: "Despesas",
                          data: expenses.map((expense) => expense.total),
                          backgroundColor: expenses.map((expense) => expense.color),
                          borderColor: "#ffffff",
                          borderWidth: 2,
                          hoverBorderWidth: 3,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          display: true,
                          position: "bottom",
                          labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: "circle",
                            font: {
                              size: 12,
                              weight: "500",
                            },
                            color: "#374151",
                          },
                        },
                        tooltip: {
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          titleColor: "#fff",
                          bodyColor: "#fff",
                          borderColor: "#667eea",
                          borderWidth: 1,
                          cornerRadius: 6,
                        },
                      },
                      animations: {
                        animateRotate: true,
                        animateScale: true,
                      },
                    }}
                    style={{ width: "100%", height: "300px" }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
