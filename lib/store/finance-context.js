"use client";

// Importa bibliotecas necessárias do React
import { createContext, useState, useEffect, useContext } from "react";

// Importa o contexto de autenticação
import { authContext } from "@/lib/store/auth-context";

// Firebase
// Importa o objeto 'db' do Firebase e as funções do Firestore necessárias
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

// Cria um contexto de finanças com valores padrão
export const financeContext = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => { },
  removeIncomeItem: async () => { },
  addExpenseItem: async () => { },
  addCategory: async () => { },
  deleteExpenseItem: async () => { },
  deleteExpenseCategory: async () => { },
});

// Componente que define o provedor de contexto de finanças
export default function FinanceContextProvider({ children }) {
  // Define o estado para receitas e despesas
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Obtém o contexto de autenticação do usuário
  const { user } = useContext(authContext);

  // Função para adicionar uma categoria de despesa
  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expenses");

      // Adiciona a categoria ao Firestore
      const docSnap = await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [], // Inicializa com uma lista vazia de itens
      });

      // Atualiza o estado das despesas
      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docSnap.id,
            uid: user.uid,
            items: [],
            ...category,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  // Função para adicionar um item de despesa
  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      // Atualiza o documento no Firestore
      await updateDoc(docRef, { ...newExpense });

      // Atualiza o estado das despesas
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];
        const foundIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[foundIndex] = { id: expenseCategoryId, ...newExpense };
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  // Função para deletar um item de despesa
  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, {
        ...updatedExpense,
      });

      // Atualiza o estado das despesas
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  // Função para deletar uma categoria de despesa
  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);

      // Atualiza o estado das despesas
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  };

  // Função para adicionar uma receita
  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");

    try {
      // Adiciona a receita ao Firestore
      const docSnap = await addDoc(collectionRef, newIncome);

      // Atualiza o estado das receitas
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  // Função para remover uma receita
  const removeIncomeItem = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try {
      // Deleta a receita do Firestore
      await deleteDoc(docRef);

      // Atualiza o estado das receitas
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  // Valores do contexto de finanças
  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };

  useEffect(() => {
    // Carrega os dados de receitas e despesas do Firestore ao montar o componente
    if (!user) return;

    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const q = query(collectionRef, where("uid", "==", user.uid));
      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Atualiza o estado das receitas
      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const q = query(collectionRef, where("uid", "==", user.uid));
      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      // Atualiza o estado das despesas
      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, [user]);

  return (
    // Retorna o provedor de contexto de finanças, fornecendo os valores para os componentes filhos
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
