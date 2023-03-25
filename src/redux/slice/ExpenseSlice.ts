import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "./../../models/income.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const url = "/api/expense";
interface Expenses {
  expenses: ExpenseType[];
}
export const initialState: Expenses = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: "expense",
  initialState,

  reducers: {
    getAllExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    addExpenses: (state, action) => {
      state.expenses.push(action.payload);
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
  (expense: ExpenseType) => async (dispatch: Function) => {
    const { payload } = await fetch(url, {
      method: "POST",
      body: JSON.stringify(expense),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    dispatch(expensesSlice.actions.addExpenses(payload));
  };
// Action creators are generated for each case reducer function
export const { getAllExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;