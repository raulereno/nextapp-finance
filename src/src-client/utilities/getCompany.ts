import { getTransactions } from "@/redux/slice/CompanySlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const getCompany = async (id: string, dispatch : Function) => {
    if(id !== undefined && id !== null) {
    const url = `http://localhost:3000/api/company/get?id=${id}`;
    const response = await axios.get(url);
    dispatch(getTransactions(response.data.payload))
    return response
    }
}