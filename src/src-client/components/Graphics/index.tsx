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

export const Graphics = () => {
  const dispatch: Function = useDispatch();
  const incomes = useSelector((state: any) => state.IncomesReducer.incomes);
  const expenses = useSelector((state: any) => state.ExpensesReducer.expenses);
  const totalIncomes = useSelector(
    (state: any) => state.IncomesReducer.totalIncomes
  );
  const totalExpenses = useSelector(
    (state: any) => state.ExpensesReducer.totalExpenses
  );

  let totalExcess;
  if(totalExpenses && totalIncomes){
    totalExcess = calculateExcess(
    totalIncomes.map((ele: TotalRegisters) => ele.total),
    totalExpenses.map((ele: TotalRegisters) => ele.total)
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
        data: totalIncomes?.map((ele: TotalRegisters) => ele.total),
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
        data: totalExpenses?.map((ele: TotalRegisters) => ele.total),
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
    dispatch(getIncomes());
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div className="container text-center mt-5">
      {!totalIncomes || totalIncomes.length === 0 && !totalExpenses || totalExpenses.length === 0 && <span className="loader" />}
      {totalIncomes && totalExpenses &&
        
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
