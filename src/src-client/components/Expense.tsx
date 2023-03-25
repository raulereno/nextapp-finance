import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  animation: {
    animateScale: true,
  },
};
const data = {
  labels: [],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

export function Expense() {
  return (
    <div className="bg-Blue" style={{ width: "150px" }}>
      <h2>Gastos:</h2>
      <Pie
        options={options}
        height="250"
        width="250"
        id="income_canva"
        data={data}
      />
    </div>
  );
}
