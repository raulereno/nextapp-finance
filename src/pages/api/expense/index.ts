import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";
import User from "@/models/user.model";

dbConnect();

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  let company;
  let expenses;
  switch (method) {
    case "GET":
      if(body.type === 'negocio'){
        company = await Company.findById({ _id: query.Id })
        .populate("expenses")
        .lean();

      res.status(200).json({ message: "get", payload: company.expenses })
    } else {

    }
      break;
    case "POST":
      console.log(JSON.parse(body));
      let result;
      if(JSON.parse(body).type === 'negocio'){
      company = await Company.findById({ _id: query.Id });
      result = await Expense.create(JSON.parse(body));
      await company.expenses.push(result);
      await company.save();
    } else {
      // const account = await User.findOne({ email: query.Id })
      // result = await Expense.create(JSON.parse(body))
      // await account.expenses.push(result);
      // await account.save();
      console.log('estoy en else')
    }
    res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
