import { calculateTotal } from "@/utils/calculateTotal";
import { IncomeType } from "./../../models/income.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TotalRegisters } from "@/types/TotalRegister.type";

const url =
  "http://localhost:3000/api/income?companyId=64257ccb28f7bffc594de664";
interface Incomes {
  incomes: IncomeType[];
  totalIncomes: Array<TotalRegisters>;
}
export const initialState: Incomes = {
  incomes: [],
  totalIncomes: [],
};

const incomesSlice = createSlice({
  name: "income",
  initialState,

  reducers: {
    getAllIncomes: (state, action) => {
      state.incomes = action.payload;
      state.totalIncomes = calculateTotal(action.payload);
    },
    addIncome: (state, action) => {
      const oldState = state.incomes;
      oldState.push(action.payload);
      state.totalIncomes = calculateTotal(oldState);
      state.incomes = oldState;
    },
    updateIncome: (state, action) => {
      let find = state.incomes.map((elem) => {
        if (elem._id === action.payload._id) {
          return action.payload;
        }
        return elem;
      });
      state.totalIncomes = calculateTotal(find);
      state.incomes = find;
    },
    deleteIncome: (state, action) => {
      const filter = state.incomes.filter((ele) => ele._id !== action.payload);
      state.totalIncomes = calculateTotal(filter);
      state.incomes = filter;
    },
  },
});

export const getIncomes = () => async (dispatch: Function) => {
  const payload = await fetch(url, { mode: "no-cors" })
    .then((resp) => resp.json())
    .then((res) => res)
    .catch((err) => console.log(err));

  dispatch(incomesSlice.actions.getAllIncomes(payload.payload ?? []));
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

export const updateIncome =
  (income: IncomeType, id: String) => async (dispatch: Function) => {
    console.log(income);
    const { payload } = await fetch(`/api/income/${id}`, {
      method: "PUT",
      body: JSON.stringify(income),
    })
      .then((resp) => resp.json())
      .catch((err) => console.log(err));

    dispatch(incomesSlice.actions.updateIncome(payload));
  };

export const deleteIncome = (id: String) => async (dispatch: Function) => {
  //TODO: Descomentar para produccion
  await fetch(`/api/income/${id}`, {
    method: "DELETE",
  });

  dispatch(incomesSlice.actions.deleteIncome(id));
};

// Action creators are generated for each case reducer function
export const { getAllIncomes } = incomesSlice.actions;

export default incomesSlice.reducer;
