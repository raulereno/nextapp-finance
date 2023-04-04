import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import conn from "../../../../src-backend/db";
import { connection } from "mongoose";
export default async function verifyCompany(req: NextApiRequest, res: NextApiResponse){
    
    try {
        
        await conn()
        const email = req.query.email;
        if(typeof email === "string"){
            const emailTransformed = email.split('%40').join('@');
            
            const verification = await User.find({email: emailTransformed});
            if(verification[0].company){
                res.status(200).json({msg: `${verification[0].company}`})
            } else {
                res.status(200).json({msg: 'Not found'})
            }
        }
        connection.close()
    } catch (error) {
        res.status(400).json(error)
    }
}