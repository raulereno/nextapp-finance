/* eslint-disable react-hooks/rules-of-hooks */
import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import colors from "@/utils/colors";
import { useEffect, useState } from "react";
import { TableComponent } from "../Tables/TableComponent";
import {
  calculateExcess,
  calculateTotal,
  calculateTotalPerCategory,
} from "@/utils/calculateTotal";
import { TotalRegisters } from "@/types/TotalRegister.type";
import { Income } from "./Income";
import { Expense } from "./Expense";
import { totalGenerate } from "@/src-client/utilities/totalGenerate";
import { Excess } from "./Excess";
import { options } from "@/src-client/utilities/graphicsOptions";
import capitalize from "@/utils/capitalize";
import { useDispatch, useSelector } from "react-redux";
interface ContentTable {
  type: string;
  slice: string;
}

interface graphsProp {
  type: string;
  incomes: [];
  expenses: [];
}

export const Graphics = ({ type, incomes, expenses }: graphsProp) => {
  const { IncomesResult, ExpensesResult } = totalGenerate(incomes, expenses);

  const totalExcess =
    IncomesResult.totals.reduce((acc, ele) => acc + ele, 0) -
    ExpensesResult.totals.reduce((acc, ele) => acc + ele, 0);
  const ExcessColor = totalExcess < 0 ? "#FF0000" : "#00FF00";
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
        data: ExpensesResult.totals,
        backgroundColor: ExpensesResult.colors,
        hoverOffset: 4,
      },
    ],
  };

  const dataExcess = {
    labels: [capitalize(type)],
    datasets: [
      {
        label: "",
        data: [totalExcess],
        backgroundColor: [ExcessColor],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="container text-center mt-5">
      {!incomes || (!expenses && <span className="loader" />)}
      {incomes && expenses && (
        <>
          <div className="row d-flex justify-content-between">
            <Income
              type={type}
              options={options}
              data={dataIncomes}
              setTableContent={setTableContent}
              totalDataIncomes={IncomesResult.totals}
              totalDataExpenses={ExpensesResult.totals}
            />
            <Expense
              type={type}
              options={options}
              data={dataExpenses}
              setTableContent={setTableContent}
              totalDataIncomes={IncomesResult.totals}
              totalDataExpenses={ExpensesResult.totals}
            />
            <Excess
              options={options}
              data={dataExcess}
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
      )}
    </div>
  );
};
