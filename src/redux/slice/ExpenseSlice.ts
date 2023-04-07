import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "./../../models/income.model";
import { createSlice } from "@reduxjs/toolkit";
import { calculateTotal } from "@/utils/calculateTotal";
import { TotalRegisters } from "@/types/TotalRegister.type";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";

const url =
  "http://localhost:3000/api/expense?Id=";
interface Expenses {
  expenses: ExpenseType[];
  totalExpenses: Array<TotalRegisters>;
}
export const initialState: Expenses = {
  expenses: [],
  totalExpenses: [],
};

const expensesSlice = createSlice({
  name: "expense",
  initialState,

  reducers: {
    getAllExpenses: (state, action) => {
      state.expenses = action.payload;
      state.totalExpenses = calculateTotal(action.payload);
    },
    addExpenses: (state, action) => {
      state.expenses.push(action.payload);
      state.totalExpenses = calculateTotal(state.expenses);
    },
    updateExpense: (state, action) => {
      let find = state.expenses.map((elem) => {
        console.log(elem._id);
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });

      state.totalExpenses = calculateTotal(find);
      state.expenses = find;
    },
    deleteExpenses: (state, action) => {
      const filter = state.expenses.filter((ele) => ele._id !== action.payload);
      state.totalExpenses = calculateTotal(filter);
      state.expenses = filter;
    },
  },
});

export const getExpenses = () => async (dispatch: Function) => {
  const { payload } = await fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));

  dispatch(expensesSlice.actions.getAllExpenses(payload));
};

export const addExpense =
  (expense: ExpenseType, id: string) => async (dispatch: Function) => {
    let urlId;
    if(expense.type === 'negocio'){
      const company = await verifyUserCompany(id)
      urlId = company
    } else {
      urlId = id
    }
    const { payload } = await fetch(`${url}${urlId}`, {
      method: "POST",
      body: JSON.stringify(expense),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    dispatch(expensesSlice.actions.addExpenses(payload));
  };

export const updateExpense =
  (expense: IncomeType, id: String) => async (dispatch: Function) => {
    const { payload } = await fetch(`/api/expense/${id}`, {
      method: "PUT",
      body: JSON.stringify(expense),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    dispatch(expensesSlice.actions.updateExpense(payload));
  };

export const deleteExpenses = (id: String) => async (dispatch: Function) => {
  //TODO: Descomentar para produccion

  await fetch(`/api/income/${id}`, {
    method: "DELETE",
  });

  dispatch(expensesSlice.actions.deleteExpenses(id));
};

// Action creators are generated for each case reducer function
export const { getAllExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
