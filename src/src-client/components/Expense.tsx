import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "@/redux/slice/ExpenseSlice";
import { useEffect } from "react";
import { ExpenseType } from "@/models/expense.model";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  animation: {
    animateScale: true,
  },
  plugins: {
    datalabels: {
      formatter: (value: any, ctx: any) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data: any) => {
          sum += data;
        });
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "#fff",
    },
  },
};

export function Expense() {
  const dispatch: Function = useDispatch();
  const expenses = useSelector((state: any) => state.ExpensesReducer.expenses);

  const data = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: formatData(expenses),
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div className="bg-Blue" style={{ width: "500px" }}>
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
//TODO: poner en un solo archivo
const formatData = (expenses: ExpenseType[]): Array<number> => {
  let totalBusiness = 0;
  let totalPersonal = 0;

  expenses.forEach((element) => {
    if (element.type[0] === "negocio") {
      totalBusiness += element.value;
    } else if (element.type[0] === "personales") {
      totalPersonal += element.value;
    }
  });

  return [totalBusiness, totalPersonal];
};
