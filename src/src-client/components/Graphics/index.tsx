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
    
    const {IncomesResult, ExpensesResult} = totalGenerate(incomes, expenses)
    console.log(IncomesResult)
    const totalExcess = IncomesResult.totals.reduce((acc, ele) => acc + ele, 0) - ExpensesResult.totals.reduce((acc, ele) => acc + ele, 0)
    const ExcessColor = totalExcess < 0 ? '#FF0000' : "#00FF00" 
  const [tableContent, setTableContent] = useState({
    type: "",
    slice: "",
  });

  const dataIncomes = {
    labels: IncomesResult.categories,
    datasets: [
      {
        label: "",
        data: IncomesResult.totals,
        backgroundColor: IncomesResult.colors,
        hoverOffset: 4,
      },
    ],
  };

  const dataExpenses = {
    labels: ExpensesResult.categories,
    datasets: [
      {
        label: "",
        data: ExpensesResult.totals ,
        backgroundColor: ExpensesResult.colors,
        hoverOffset: 4,
      },
    ],
  };

  const dataTotal = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: [totalExcess],
        backgroundColor: [ExcessColor],
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
      {!incomes || !expenses  && <span className="loader" />}
      {incomes && expenses &&
        
        <>
        <div className="row d-flex justify-content-between">
        <Income
          options={options}
          data={dataIncomes}
          setTableContent={setTableContent}
          totalDataIncomes = {IncomesResult.totals}
          totalDataExpenses = {ExpensesResult.totals}
        />
        <Expense
          options={options}
          data={dataExpenses}
          setTableContent={setTableContent}
          totalDataIncomes = {IncomesResult.totals}
          totalDataExpenses = {ExpensesResult.totals}
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
