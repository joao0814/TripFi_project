"use client";
import { useRef } from "react";

const TripModal = ({ isOpen, onClose }) => {
  const amountRef = useRef();
  const descriptionRef = useRef();

  // handrler funciton
  const addIncomeHandler = (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    console.log(newIncome);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute top-15 left-0 w-full h-full z-10 ">
          <div className="container mx-auto max-w-xl h-[60vh] rounded-3xl bg-slate-800 py-6 px-4">
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
              <button className="btn btn-primary mt-6 font-bold rounded-full bg-slate-600">
                Add Entry
              </button>
            </div>
              <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-2xl">Income History</h3>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripModal;
