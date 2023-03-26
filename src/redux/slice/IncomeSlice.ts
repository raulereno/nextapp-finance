import { IncomeType } from "./../../models/income.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const url = "/api/income";
interface Incomes {
  incomes: IncomeType[];
}
export const initialState: Incomes = {
  incomes: [],
};

const incomesSlice = createSlice({
  name: "income",
  initialState,

  reducers: {
    getAllIncomes: (state, action) => {
      state.incomes = action.payload;
    },
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
    },
    deleteIncome: (state, action) => {
      const filter = state.incomes.filter((ele) => ele._id !== action.payload);
      state.incomes = filter;
    },
  },
});

export const getIncomes = () => async (dispatch: Function) => {
  const { payload } = await fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));

  dispatch(incomesSlice.actions.getAllIncomes(payload));
};

export const addIncome = (income: IncomeType) => async (dispatch: Function) => {
  const { payload } = await fetch(url, {
    method: "POST",
    body: JSON.stringify(income),
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err));

  dispatch(incomesSlice.actions.addIncome(payload));
};

export const deleteIncome = (id: String) => async (dispatch: Function) => {
  //TODO: Descomentar para produccion
  // await fetch(`/api/income/${id}`, {
  //   method: "DELETE",
  // });

  dispatch(incomesSlice.actions.deleteIncome(id));
};

// Action creators are generated for each case reducer function
export const { getAllIncomes } = incomesSlice.actions;

export default incomesSlice.reducer;
