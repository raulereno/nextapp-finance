import { getExpenses } from "@/redux/slice/ExpenseSlice";
import { getIncomes } from "@/redux/slice/IncomeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Excess } from "./Excess";
import { Expense } from "./Expense";
import { Income } from "./Income";
import { TableComponent } from "../Tables/TableComponent";
import { calculateExcess } from "@/utils/calculateTotal";
import { TotalRegisters } from "@/types/TotalRegister.type";

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
  type: string
}

export const Graphics = ({type} : graphsProp) => {
  const dispatch: Function = useDispatch();
  
  let incomes;
  let expenses;
  if(type === 'company'){
    incomes = useSelector((state: any) => state.CompanyReducer.incomes);
    expenses = useSelector((state: any) => state.CompanyReducer.expenses);

  } else {

  }

  let totalExcess;
  if(expenses && incomes){
    totalExcess = calculateExcess(
    incomes.map((ele: TotalRegisters) => ele.total),
    expenses.map((ele: TotalRegisters) => ele.total)
    );
  }

  const [tableContent, setTableContent] = useState({
    type: "",
    slice: "",
  });

  const dataIncomes = {
    labels: ["Negocio", "Personal"],
    datasets: [
      {
        label: "",
        data: incomes?.map((ele: TotalRegisters) => ele.total),
        backgroundColor: ["rgb(243,212,6)", "rgb(61,132,60)"],
        hoverOffset: 4,
      },
    ],
  };

  const dataExpenses = {
    labels: ["Negocio", "Personales"],
    datasets: [
      {
        label: "",
        data: expenses?.map((ele: TotalRegisters) => ele.total),
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
        data: totalExcess,
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
      {!incomes || incomes.length === 0 && !expenses || expenses.length === 0 && <span className="loader" />}
      {incomes && expenses &&
        
        <>
        <div className="row d-flex justify-content-between">
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
