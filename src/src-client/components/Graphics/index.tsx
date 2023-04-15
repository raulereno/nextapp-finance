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
  const dispatch: Function = useDispatch();

  const { IncomesResult, ExpensesResult } = totalGenerate(incomes, expenses);
  const totalExcess =
    IncomesResult.totals.reduce((acc, ele) => acc + ele, 0) -
    ExpensesResult.totals.reduce((acc, ele) => acc + ele, 0);
  const ExcessColor = totalExcess < 0 ? "#FF0000" : "#00FF00";

  // let incomes;
  // let expenses;
  // if (type === "company") {
  //   incomes = useSelector((state: any) => state.CompanyReducer.incomes);
  //   expenses = useSelector((state: any) => state.CompanyReducer.expenses);
  // } else {
  // }
  // let totalIncomes;
  // let totalExpenses;
  // let totalExcess;
  // if (expenses && incomes) {
  //   totalExcess = calculateExcess(
  //     incomes.map((ele: TotalRegisters) => ele.total),
  //     expenses.map((ele: TotalRegisters) => ele.total)
  //   );

  //   totalIncomes = incomes.reduce(
  //     (acc: number, ele: any) => acc + ele.value,
  //     0
  //   );
  //   console.log(totalIncomes);
  // }

  const [tableContent, setTableContent] = useState({
    type: "",
    slice: "",
  });

  const dataIncomes = {
    labels: IncomesResult.categories,
    // labels: calculateTotalPerCategory(incomes).map((element) =>
    //   capitalize(element.category)
    // ),
    datasets: [
      {
        label: "",
        data: IncomesResult.totals,
        // data: totalIncomes.map((element) => element.total),
        // backgroundColor: colors.map((elm) => elm.codigo),
        backgroundColor: IncomesResult.colors,
        hoverOffset: 4,
      },
    ],
  };

  const dataExpenses = {
    labels: ExpensesResult.categories,
    // labels: calculateTotalPerCategory(expenses).map((element) =>
    //   capitalize(element.category)
    // ),
    datasets: [
      {
        label: "",
        data: ExpensesResult.totals,
        backgroundColor: ExpensesResult.colors,

        // data: totalExpenses.map((element) => element.total),
        // backgroundColor: colors.map((elm) => elm.codigo),
        hoverOffset: 4,
      },
    ],
  };

  const dataExcess = {
    // labels: totalExcess.map((elem) => capitalize(elem.category)),
    labels: ["Negocio", "Personales"],

    datasets: [
      {
        label: "",
        data: [totalExcess],
        backgroundColor: [ExcessColor],
        // data: totalExcess.map((elem) => elem.total),
        // backgroundColor: colors.map((elm) => elm.codigo),
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    // dispatch(getIncomes("64257ccb28f7bffc594de664"));
    // dispatch(getExpenses());
  }, [incomes, expenses]);

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
