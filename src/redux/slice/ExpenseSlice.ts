import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "./../../models/income.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const url =
  "http://localhost:3000/api/expense?companyId=64238a57bfa0ac002ef68b45";
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

  console.log("Expense req: " + payload);

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
  // await fetch(`/api/income/${id}`, {
  //   method: "DELETE",
  // });

  dispatch(expensesSlice.actions.deleteExpenses(id));
};

// Action creators are generated for each case reducer function
export const { getAllExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
