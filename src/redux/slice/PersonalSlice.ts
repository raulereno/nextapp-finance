import { User } from "@/models/user.model";
import { calculateTotal } from "@/utils/calculateTotal";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/api/personal?email=";

const initialState = {
  user: {},
  totalIncomes: 0,
  totalExpenses: 0,
};

const personalSlice = createSlice({
  name: "personal",
  initialState,

  reducers: {
    getUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.totalExpenses = calculateTotal(action.payload?.expenses);
      state.totalIncomes = calculateTotal(action.payload?.incomes);
    },
  },
});

export const getUserFinance = (email: string) => async (dispatch: Function) => {
  //
  const res = await axios.get(url + email);

  dispatch(personalSlice.actions.getUser(res.data.payload));
};

export default personalSlice.reducer;
