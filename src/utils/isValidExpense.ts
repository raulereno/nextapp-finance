import { FormType } from "@/src-client/components/Modals/FormAddRegister";
import { TotalRegisters } from "@/types/TotalRegister.type";

export const isValidExpense = (
  totalIncomes: TotalRegisters[],
  totalExpenses: TotalRegisters[],
  form: FormType
) => {
  //
  const index = form.type === "negocio" ? 0 : 1;

  const total = totalExpenses[index].total + form.value;

  console.log(total);
  console.log(totalIncomes[index].total);
  if (total > totalIncomes[index].total) {
    return "Tus egresos van a superar a tus ingresos";
  }
  return false;
};
