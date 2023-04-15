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
        },
        updateCompanyExpense: (state, action) => {
            const update = state.expenses.map(exp => {
                if(exp._id === action.payload._id){ 
                    return action.payload
                } else {
                    return exp

                }
            })
            state.expenses = update
        },
        updateCompanyIncome: (state, action) => {
            const update = state.incomes.map(inc => {
                if(inc._id === action.payload._id){ 
                    return action.payload
                } else {
                    return inc

                }
            })
            console.log(update, 'income')
            state.incomes = update
        },
        deleteCompanyExpense: (state, action) => {
            const update = state.expenses.filter(exp => {
                if(exp._id !== action.payload) return exp
            })
            state.expenses = update
        },
        deleteCompanyIncome: (state, action) => {
            const update = state.incomes.filter(inc => {
                if(inc._id !== action.payload) return inc
            })
            state.incomes = update
        },
    }

})


export const createCompany = (company: formCompany) => async (dispatch: Function) => {
    const url = `http://localhost:3000/api/company`
    const newCompany = await axios.post(url, company)
    const companyData = await getCompany(newCompany.data._id, dispatch)
    dispatch(companySlice.actions.getTransactions(companyData?.data.payload))
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

export const updateCompanyExpense = (expense: any, id: any) => async (dispatch: Function) => {
    const url = `http://localhost:3000/api/company/expense?id=${id}`
    const newExpense = await axios.put(url, expense)
    dispatch(companySlice.actions.updateCompanyExpense(newExpense.data.payload))
}
export const updateCompanyIncome = (income: any, id: String) => async (dispatch: Function) => {
    const url = `http://localhost:3000/api/company/expense?id=${id}`
    const newIncome = await axios.put(url, income)
    dispatch(companySlice.actions.updateCompanyExpense(newIncome.data.payload))
}
export const deleteCompanyExpense = (id: any, idUser: any) => async (dispatch: Function) => {
    const company = await verifyUserCompany(idUser)
    const url = `http://localhost:3000/api/company/expense?id=${id}&company=${company}`
   try{ 
    const deletedExpense = await axios.delete(url)
    dispatch(companySlice.actions.deleteCompanyExpense(deletedExpense.data.id))}
    catch(e){ console.log(e) }
}
export const deleteCompanyIncome = (id: any, idUser: any) => async (dispatch: Function) => {
    const company = await verifyUserCompany(idUser)
    const url = `http://localhost:3000/api/company/income?id=${id}&company=${company}`
   try{ 
    const deletedExpense = await axios.delete(url)
    dispatch(companySlice.actions.deleteCompanyIncome(deletedExpense.data.id))}
    catch(e){ console.log(e) }
}

export default companySlice.reducer;