import { CompanType } from "@/models/company.model";
import { ExpenseType } from "@/models/expense.model";
import { IncomeType } from "@/models/income.model";
import { getCompany } from "@/src-client/utilities/getCompany";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Schema } from "mongoose";

interface Company {
    expenses: ExpenseType[],
    incomes: IncomeType[],
    users: Schema.Types.ObjectId[],
    name: string,
}
interface formCompany {
    name: string, 
    user: string,
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
        },
        addCompanyIncome: (state, action) => {
            state.incomes.includes(action.payload)? state.incomes : state.incomes.push(action.payload);
        },
        addCompanyExpense: (state, action) => {
            state.expenses.includes(action.payload)? state.expenses : state.expenses.push(action.payload);
        }
    }

})


export const createCompany = (company: formCompany) => async (dispatch: Function) => {
    const url = `http://localhost:3000/api/company`
    console.log(company)
    const newCompany = await axios.post(url, company)
    const companyData = await getCompany(newCompany.data._id, dispatch)
    dispatch(companySlice.actions.getTransactions(companyData))
}

export const getTransactions = (company: CompanType) => (dispatch: Function) => {
    dispatch(companySlice.actions.getTransactions(company))
}
export const addCompanyIncome = (income: IncomeType, id: string) => async (dispatch: Function) => {
    const company = await verifyUserCompany(id)
    const url = `http://localhost:3000/api/income?Id=${company}`
    const newIncome = await axios.post(url, income)
    dispatch(companySlice.actions.addCompanyIncome(newIncome.data.payload))
}

export const addCompanyExpense = (expense: ExpenseType, id: string) => async (dispatch: Function) => {
    const company = await verifyUserCompany(id)
    const url = `http://localhost:3000/api/expense?Id=${company}`
    
    const newExpense = await axios.post(url, expense)
    dispatch(companySlice.actions.addCompanyExpense(newExpense.data.payload))
}



export default companySlice.reducer;