import { Company } from "@/models/company.model";
import { User } from "@/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Admin (req: NextApiRequest, res: NextApiResponse) {
    const { type, id } = req.query;
    try {
        switch (req.method){
            case "GET":
                if(id){
                    if(type === 'negocio'){
                        const company = await Company.findOne({_id: id})
                        .populate('incomes')
                        .populate('expenses')
                        .populate('users');
            
                        res.status(200).json({msg: 'success', payload: company});
                    } else {
                        const user = await User.findOne({_id: id})
                        .populate('incomes')
                        .populate('expenses')
                        .populate('company');
            
                        res.status(200).json({msg: 'success', payload: user});
                    }
                } else {
                    if(type === 'negocio'){
                        const companies = await Company.find({});
                        res.status(200).json({msg: 'success', payload: companies})
                    } else {
                        const users = await User.find({});
                        res.status(200).json({msg: 'success', payload: users})
                    }
                }
            break;
            default:
                res.status(400).json({msg: "Invalid method"})
        }
    } catch (error) {
        console.log(error)
    }
}