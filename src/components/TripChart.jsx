import { TRIP_DATA } from "@/lib/constants";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

const TripChart = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleLegendItemClick = (label) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((item) => item !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
  };

  return (
    <div className="grid grid-cols-2 w-full">
      <div className="w-ful">
        <div className="flex flex-col items-start">
          {TRIP_DATA.map((expense) => (
            <div
              key={expense.title}
              className="flex items-center cursor-pointer"
              onClick={() => handleLegendItemClick(expense.title)}
            >
              <div
                className={`w-4 h-4 mr-2 ${
                  selectedItems.includes(expense.title)
                    ? "bg-white"
                    : "bg-transparent border border-white"
                }`}
                style={{ backgroundColor: expense.color }}
              ></div>
              <span className="text-white">{expense.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Doughnut
          width={400}
          height={400}
          data={{
            labels: TRIP_DATA.map((expense) => expense.title),
            datasets: [
              {
                label: "Expenses",
                data: TRIP_DATA.map((expense) => expense.total),
                backgroundColor: TRIP_DATA.map((expense) => expense.color),
                borderColor: TRIP_DATA.map((expense) =>
                  selectedItems.includes(expense.title) ? "white" : "#18181b"
                ),
                borderWidth: 5,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                bottom: 20,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TripChart;
