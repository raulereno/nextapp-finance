import { useDispatch, useSelector } from "react-redux";
import { Income } from "./Income";
import { getIncomes } from "@/redux/slice/IncomeSlice";
import { useEffect, useState } from "react";
import { IncomeType } from "@/models/income.model";
import { getExpenses } from "@/redux/slice/ExpenseSlice";
import { Expense } from "./Expense";
import { Excess } from "./Excess";
import { ExpenseType } from "@/models/expense.model";

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

export const Graphics = () => {
  const dispatch: Function = useDispatch();
  const incomes = useSelector((state: any) => state.IncomesReducer.incomes);
  const expenses = useSelector((state: any) => state.ExpensesReducer.expenses);
  const totalIncomes = formatData(incomes);
  const totalExpenses = formatData(expenses);
  const totalExcess = calculateExcess(totalIncomes, totalExpenses);

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
    <div className="d-flex justify-content-center gap-3 mt-5">
      <Income options={options} data={dataIncomes} />
      <Expense options={options} data={dataExpenses} />
      <Excess options={options} data={dataTotal} />
    </div>
  );
};

const formatData = (data: IncomeType[]): Array<number> => {
  let totalBusiness = 0;
  let totalPersonal = 0;

  data.forEach((element) => {
    console.log(element);
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
