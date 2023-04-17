import { CompanType } from "@/models/company.model";
import { UserType } from "@/models/user.model";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface state {
    users: UserType[],
    companies: CompanType[],
    selectedCompany: CompanType | undefined,
    selectedUser: UserType | undefined,
}


const initialState = {
    users: [],
    companies: [],
    selectedUser: undefined,
    selectedCompany: undefined,
}

const url = `${process.env.NEXT_PUBLIC_BASE_URL}api/admin`

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        listCompanies: (state, action) => {
            state.companies = action.payload
        },
        listUsers: (state, action) => {
            state.users = action.payload
        },
    }

})

export const getList = (type: string) => async (dispatch: Function) => {
    const urlGet = url + `?type=${type}`
    const list = await axios.get(urlGet)
    type === 'negocio'? 
    dispatch(adminSlice.actions.listCompanies(list.data.payload))
    : dispatch(adminSlice.actions.listUsers(list.data.payload));
}



export default adminSlice.reducer;