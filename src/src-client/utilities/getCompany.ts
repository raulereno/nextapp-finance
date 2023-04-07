import { getTransactions } from "@/redux/slice/CompanySlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const getCompany = async (id: string) => {
    const dispatch : Function = useDispatch()
    const url = `http://localhost:3000/api/company/get?id=${id}`;
    
    const response = await axios.get(url);
    dispatch(getTransactions(response.data.payload))
    return response
}