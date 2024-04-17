"use client";
import React, { useState, useRef, useEffect } from "react";
import { TRIP_DATA } from "@/lib/constants";
import { currencyFormatter } from "@/lib/utils";
import TripNavbar from "./TripNavbar";
import TripExpenseCategory from "./TripExpenseCategory";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TripChart from "./TripChart";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LayoutBasic() {
  const [income, setIncome] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      console.log("Document written with ID: ", docSnap.id);
      onClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const onClose = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const getIncomeData = async () => {
      try {
        const collectionRef = collection(db, "income");
        const docsSnap = await getDocs(collectionRef);
        const data = docsSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()), // Corrigi o nome do campo 'createAt' para 'createdAt' e removi um parêntese extra
          };
        });
        setIncome(data); // Adicionei a chamada para a função setIncome para atualizar o estado com os dados obtidos
      } catch (error) {
        console.error("Error getting income documents: ", error);
      }
    };

    getIncomeData();
  }, []);

  return (
    <>
      <TripNavbar />
      <div className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => setModalIsOpen(true)}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>

        {/* Modal */}
        {modalIsOpen && (
          <div className="absolute top-15 left-0 w-full h-full z-10 ">
            <div className="container mx-auto max-w-xl h-[70vh] rounded-3xl bg-slate-800 py-6 px-4">
              <button
                className="btn btn-primary mb-4 font-bold rounded-full bg-slate-600"
                onClick={onClose}
              >
                X
              </button>
              <h1 className="text-2xl text-center">Título</h1>
              <div className="mt-8">
                <form onSubmit={addIncomeHandler} className="grid grid-cols-1 ">
                  <div className="flex flex-col mb-3">
                    <label htmlFor="amount" className="pb-1">
                      Income Amount
                    </label>
                    <input
                      className="px-4 py-2 bg-slate-600 rounded-xl"
                      type="number"
                      name="amount"
                      ref={amountRef}
                      min={0.01}
                      step={0.01}
                      placeholder="Enter income amount"
                      required
                    ></input>
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="amount" className="pb-1">
                      Description
                    </label>
                    <input
                      className="px-4 py-2 bg-slate-600 rounded-xl"
                      type="text"
                      name="description"
                      ref={descriptionRef}
                      placeholder="Enter income description"
                      required
                    ></input>
                  </div>
                </form>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-6 font-bold rounded-full bg-slate-600"
                  onClick={addIncomeHandler}
                >
                  Add Entry
                </button>
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-2xl">Income History</h3>
              </div>
            </div>
          </div>
        )}

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {TRIP_DATA.map((expense) => {
              return (
                <TripExpenseCategory
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>

        <section className="py-6">
          <h3 className="text-3xl">Stats</h3>
          <div className="flex justify-between py-6">
            <div className="w-full h-full">
              <TripChart />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
