import { CompanType } from "@/models/company.model";
import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { createSlice } from "@reduxjs/toolkit";
import { Schema } from "mongoose";

interface Company {
    expenses: ExpenseType[],
    incomes: IncomeType[],
    users: Schema.Types.ObjectId[],
    name: string,
}

const initialState : Company = {
    expenses: [],
    incomes: [],
    users: [],
    name: '',
}

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        getTransactions: (state, action) => {
            state.expenses = action.payload.expenses;
            state.incomes = action.payload.incomes;
            state.users = action.payload.users;
            state.name = action.payload.name;
        }
    }
})


export const getTransactions = (company: CompanType) => (dispatch: Function) => {
    dispatch(companySlice.actions.getTransactions(company))
}


export default companySlice.reducer;