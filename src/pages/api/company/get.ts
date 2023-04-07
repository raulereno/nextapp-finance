import { Company } from "@/models/company.model";
import conn from "@/src-backend/db";
import { connection } from "mongoose";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async function companyID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  let company;
  await conn()
  switch (method) {
    case "GET":
      try {
        //64238a57bfa0ac002ef68b45
        console.log(query);
        
        company = await Company.findOne({ _id: query.id });
        console.log(company);
        connection.close()
        res.status(200).json({ status: "success", payload: company });
      } catch (error) {
        connection.close()
        res.status(400).json({ status: "error", payload: 'error' });
      }
      break;

    default:
      break;
  }
}
