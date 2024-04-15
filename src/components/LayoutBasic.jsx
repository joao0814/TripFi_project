"use client";

import { DUMMY_DATA } from "@/lib/constants";
import { currencyFormatter } from "@/lib/utils";
import TripNavbar from "./TripNavbar";
import TripExpenseCategory from "./TripExpenseCategory";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LayoutBasic() {
  return (
    <>
      <TripNavbar />
      <div className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map((expense) => {
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
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </div>
    </>
  );
}
