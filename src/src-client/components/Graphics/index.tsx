/* eslint-disable react-hooks/rules-of-hooks */
import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import colors from "@/utils/colors";
import { useState } from "react";
import { TableComponent } from "../Tables/TableComponent";
import { Income } from "./Income";
import { Expense } from "./Expense";
import {
  calculateExcess,
  calculateTotalPerCategory,
} from "@/utils/calculateTotal";
import { Excess } from "./Excess";
import { options } from "@/src-client/utilities/graphicsOptions";
import capitalize from "@/utils/capitalize";

interface ContentTable {
  type: string;
  slice: string;
}

interface graphsProp {
  type?: string;
  incomes: [IncomeType];
  expenses: [ExpenseType];
}

export const Graphics = ({ type, expenses, incomes }: graphsProp) => {
  let totalIncomes = calculateTotalPerCategory(incomes);
  let totalExpenses = calculateTotalPerCategory(expenses);
  let totalExcess = calculateExcess(totalIncomes, totalExpenses);
  // const dispatch: Function = useDispatch();

  // let incomes;
  // let expenses;

  // if (type === "company") {
  //   incomes = useSelector((state: any) => state.CompanyReducer.incomes);
  //   expenses = useSelector((state: any) => state.CompanyReducer.expenses);
  // } else {
  //   //
  //   incomes = [];
  //   expenses = [];
  // }

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
    labels: calculateTotalPerCategory(incomes).map((element) =>
      capitalize(element.category)
    ),
    datasets: [
      {
        label: "",
        data: totalIncomes.map((element) => element.total),
        backgroundColor: colors.map((elm) => elm.codigo),
        hoverOffset: 4,
      },
    ],
  };

  const dataExpenses = {
    labels: calculateTotalPerCategory(expenses).map((element) =>
      capitalize(element.category)
    ),
    datasets: [
      {
        label: "",
        data: totalExpenses.map((element) => element.total),
        backgroundColor: colors.map((elm) => elm.codigo),
        hoverOffset: 4,
      },
    ],
  };

  const dataExcess = {
    labels: totalExcess.map((elem) => capitalize(elem.category)),
    datasets: [
      {
        label: "",
        data: totalExcess.map((elem) => elem.total),
        backgroundColor: colors.map((elm) => elm.codigo),
        hoverOffset: 4,
      },
    ],
  };

  // useEffect(() => {
  //   // dispatch(getIncomes("64257ccb28f7bffc594de664"));
  //   // dispatch(getExpenses());
  // }, [dispatch, incomes, expenses]);

  return (
    <div className="container text-center mt-5">
      {!incomes && <span className="loader" />}
      {incomes && expenses && (
        <>
          <div className="row d-flex justify-content-between">
            <Income
              type={type}
              options={options}
              data={dataIncomes}
              setTableContent={setTableContent}
            />
            <Expense
              type={type}
              options={options}
              data={dataExpenses}
              setTableContent={setTableContent}
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
