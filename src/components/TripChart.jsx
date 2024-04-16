import { TRIP_DATA } from "@/lib/constants";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const TripChart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [chartSize, setChartSize] = useState(window.innerWidth * 0.4);

  const handleLegendItemClick = (label) => {
    if (selectedItems.includes(label)) {
      setSelectedItems(selectedItems.filter((item) => item !== label));
    } else {
      setSelectedItems([...selectedItems, label]);
    }
  };

  const filteredData = TRIP_DATA.filter(
    (expense) => !selectedItems.includes(expense.title)
  );

  const total = filteredData.reduce(
    (total, expense) => total + expense.total,
    0
  );

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth * 0.4);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 w-full">
      <div className="w-ful">
        <div className="flex flex-col items-start">
          {TRIP_DATA.map((expense) => {
            const percentage = ((expense.total / total) * 100).toFixed(2);
            return (
              <div
                key={expense.title}
                className={`flex items-center cursor-pointer ${
                  selectedItems.includes(expense.title) ? "line-through" : ""
                }`}
                onClick={() => handleLegendItemClick(expense.title)}
              >
                <div
                  className="w-4 h-4 mr-2 bg-transparent border border-white"
                  style={{ backgroundColor: expense.color }}
                ></div>
                <span className="text-white">
                  {expense.title} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <Doughnut
          width={chartSize}
          height={chartSize}
          data={{
            labels: filteredData.map((expense) => expense.title),
            datasets: [
              {
                label: "Expenses",
                data: filteredData.map((expense) => expense.total),
                backgroundColor: filteredData.map((expense) => expense.color),
                borderColor: "#18181b",
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
