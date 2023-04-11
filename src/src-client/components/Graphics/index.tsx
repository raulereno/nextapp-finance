import { getExpenses } from "@/redux/slice/ExpenseSlice";
import { getIncomes } from "@/redux/slice/IncomeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Excess } from "./Excess";
import { Expense } from "./Expense";
import { Income } from "./Income";
import { TableComponent } from "../Tables/TableComponent";
import { calculateExcess, calculateTotal } from "@/utils/calculateTotal";
import { TotalRegisters } from "@/types/TotalRegister.type";
import { IncomeType } from "@/models/income.model";
import { ExpenseType } from "@/models/expense.model";
import { totalGenerate } from "@/src-client/utilities/totalGenerate";

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

interface graphsProp {
  type: string,
  incomes: number[],
  expenses: number[],
}

export const Graphics = ({type, incomes, expenses} : graphsProp) => {
    
    const totalIncomes = totalGenerate(incomes)
    const totalExpenses = totalGenerate(expenses)
    let totalExcess = [];
    totalExcess[0]= totalIncomes[0] - totalExpenses[0]
    totalExcess[1]= totalIncomes[1] - totalExpenses[1]
  
  const [tableContent, setTableContent] = useState({
    type: "",
    slice: "",
  });

  const dataIncomes = {
    labels: ["Negocio"],
    datasets: [
      {
        label: "",
        data: [totalIncomes[0]],
        backgroundColor: ["rgb(243,212,6)"],
        hoverOffset: 4,
      },
    ],
  };

  const dataExpenses = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: [totalExpenses[0]],
        backgroundColor: ["rgb(243,212,6)", "rgb(61,132,60)"],
        hoverOffset: 4,
      },
    ],
  };

  const dataTotal = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: [totalExcess[0]],
        backgroundColor: ["rgb(243,212,6)", "rgb(61,132,60)"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    // dispatch(getIncomes());
    // dispatch(getExpenses());
  }, [incomes, expenses]);

  return (
    <div className="container text-center mt-5">
      {!incomes || incomes.length === 0  && <span className="loader" />}
      {incomes && expenses &&
        
        <>
        <div className="row d-flex justify-content-between">
        <Income
          options={options}
          data={dataIncomes}
          setTableContent={setTableContent}
          totalDataIncomes = {totalIncomes}
          totalDataExpenses = {totalExpenses}
        />
        <Expense
          options={options}
          data={dataExpenses}
          setTableContent={setTableContent}
          totalDataIncomes = {totalIncomes}
          totalDataExpenses = {totalExpenses}
        />
        <Excess
          options={options}
          data={dataTotal}
          setTableContent={setTableContent}
        />
      </div>
      <div className="row mt-5">
        <TableComponent
          content={tableContent.type === "ingresos" ? incomes : expenses}
          filters={tableContent}
        />
      </div>
      </>
      }
    </div>
  );
};
