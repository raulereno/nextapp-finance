import { IncomeType } from "@/models/income.model";
import { getExpenses } from "@/redux/slice/ExpenseSlice";
import { getIncomes } from "@/redux/slice/IncomeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Excess } from "./Excess";
import { Expense } from "./Expense";
import { Income } from "./Income";
import { TableComponent } from "../Tables/TableComponent";

interface ContentTable {
  type: string;
  slice: string;
}

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
      onClick: () => {
        console.log("event");
      },
    },
  },
};

export const Graphics = () => {
  const dispatch: Function = useDispatch();
  const incomes = useSelector((state: any) => state.IncomesReducer.incomes);
  const expenses = useSelector((state: any) => state.ExpensesReducer.expenses);
  const totalIncomes = formatData(incomes);
  const totalExpenses = formatData(expenses);
  const totalExcess = calculateExcess(totalIncomes, totalExpenses);

  const [tableContent, setTableContent] = useState({
    type: "",
    slice: "",
  });

  const dataIncomes = {
    labels: ["Negocio", "Personal"],
    datasets: [
      {
        label: "",
        data: totalIncomes,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const dataExpenses = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: totalExpenses,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const dataTotal = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: totalExcess,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    dispatch(getIncomes());
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div className="container text-center">
      <div className="row">
        <Income
          options={options}
          data={dataIncomes}
          setTableContent={setTableContent}
        />
        <Expense
          options={options}
          data={dataExpenses}
          setTableContent={setTableContent}
        />
        <Excess
          options={options}
          data={dataTotal}
          setTableContent={setTableContent}
        />
      </div>
      <div className="row">
        <TableComponent
          content={tableContent.type === "ingresos" ? incomes : expenses}
          filters={tableContent}
        />
      </div>
    </div>
  );
};

const formatData = (data: IncomeType[]): Array<number> => {
  let totalBusiness = 0;
  let totalPersonal = 0;

  data.forEach((element) => {
    if (element?.type[0] === "negocio") {
      totalBusiness += element.value;
    } else if (element?.type[0] === "personales") {
      totalPersonal += element.value;
    }
  });

  return [totalBusiness, totalPersonal];
};

const calculateExcess = (
  incomes: Array<number>,
  expenses: Array<number>
): Array<number> => {
  return [incomes[0] - expenses[0], incomes[1] - expenses[1]];
};
