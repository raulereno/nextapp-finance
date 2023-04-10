import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { FormType } from "@/src-client/components/Modals/FormAddRegister";

export const isValidExpense = (
  totalIncomes: any[],
  totalExpenses: any[],
  form: FormType
) => {
  //
  console.log(totalIncomes, totalExpenses)
  const index = form.type === "negocio" ? 0 : 1;

  const total = totalExpenses[index].value + form.value;

  if (totalExpenses[index] > totalIncomes[index]) {
    return "Tus egresos van a superar a tus ingresos";
  }
  return false;
};
