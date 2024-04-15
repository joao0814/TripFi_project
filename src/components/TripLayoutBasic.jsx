"use client";

import { TRIP_DATA } from "@/lib/constants";
import { currencyFormatter } from "@/lib/utils";
import TripNavbar from "./TripNavbar";
import TripExpenseCategory from "./TripExpenseCategory";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TripChart from "./TripChart";

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
          <h3 className="text-2xl">Stats</h3>
          <div className="flex justify-between">
            <div className="w-3/5">
              <TripChart />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
