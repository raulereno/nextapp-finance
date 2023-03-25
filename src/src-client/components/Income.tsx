import { decrement, increment } from "@/redux/slice/CounterSlice";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAllIncomes } from "../../../src-backend/services/income.services";
import { getIncomes } from "@/redux/slice/IncomeSlice";
import { IncomeType } from "@/models/income.model";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
const plugins = [
  {
    datalabels: {
      formatter: (value: any, ctx: any) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data: number) => {
          sum += data;
        });
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "#fff",
    },
  },
];

export function Income() {
  const dispatch: Function = useDispatch();
  const incomes = useSelector((state: any) => state.IncomesReducer.incomes);

  const data = {
    labels: ["Negocio", "Personal"],
    datasets: [
      {
        label: "",
        data: formatData(incomes),
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    dispatch(getIncomes());
  }, [dispatch]);

  return (
    <div className="bg-Blue" style={{ width: "500px" }}>
      <h2>Ingresos</h2>

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

const formatData = (incomes: IncomeType[]): Array<number> => {
  let totalBusiness = 0;
  let totalPersonal = 0;

  incomes.forEach((element) => {
    if (element.type[0] === "negocio") {
      totalBusiness += element.value;
    } else if (element.type[0] === "personales") {
      totalPersonal += element.value;
    }
  });

  return [totalBusiness, totalPersonal];
};
