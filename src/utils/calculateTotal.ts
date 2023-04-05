import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { TotalRegisters } from "@/types/TotalRegister.type";

export const calculateTotal = (
  data: IncomeType[] | ExpenseType[]
): Array<TotalRegisters> => {
  let totalBusiness = {
    type: "negocio",
    total: 0,
  };
  let totalPersonal = {
    type: "personal",
    total: 0,
  };

  data &&
    data?.forEach((element) => {
      if (element?.type[0] === "negocio") {
        totalBusiness.total += element.value;
      } else if (element?.type[0] === "personales") {
        totalPersonal.total += element.value;
      }
    });

  return [totalBusiness, totalPersonal];
};

export const calculateExcess = (
  incomes: Array<number>,
  expenses: Array<number>
): Array<number> => {
  return [incomes[0] - expenses[0], incomes[1] - expenses[1]];
};
