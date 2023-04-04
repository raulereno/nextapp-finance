import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "./../../models/income.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calculateTotal } from "@/utils/calculateTotal";
import { TotalRegisters } from "@/types/TotalRegister.type";

const url =
  "http://localhost:3000/api/expense?companyId=64257ccb28f7bffc594de664";
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
    },
    updateExpense: (state, action) => {
      let find = state.expenses.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.expenses = find;
    },
    deleteExpenses: (state, action) => {
      const filter = state.expenses.filter((ele) => ele._id !== action.payload);
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
  (expense: ExpenseType) => async (dispatch: Function) => {
    const { payload } = await fetch(url, {
      method: "POST",
      body: JSON.stringify(expense),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    dispatch(expensesSlice.actions.addExpenses(payload));
  };

export const updateExpense =
  (expense: IncomeType, id: String) => async (dispatch: Function) => {
    const payload = await fetch(`/api/expense/${id}`, {
      method: "PUT",
      body: JSON.stringify(expense),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    dispatch(expensesSlice.actions.updateExpense(payload));
  };

export const deleteExpenses = (id: String) => async (dispatch: Function) => {
  //TODO: Descomentar para produccion

  console.log(id);
  await fetch(`/api/income/${id}`, {
    method: "DELETE",
  });

  dispatch(expensesSlice.actions.deleteExpenses(id));
};

// Action creators are generated for each case reducer function
export const { getAllExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
