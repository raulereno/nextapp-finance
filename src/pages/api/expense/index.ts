import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import { dbConnect } from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  await dbConnect();
  let company;
  let expenses;
  switch (method) {
    case "GET":
      try {
        // company = await Company.findById({ _id: query.companyId })
        //   .populate("expenses")
        //   .lean();
        // console.log(company.expenses);
        expenses = Expense.find();
      } catch (error) {
        res.status(400).json("erro");
      }

      res.status(200).json({ message: "get", payload: expenses });
      break;
    case "POST":
      company = await Company.findById({ _id: query.companyId });

      const result = await Expense.create(body);
      company.expenses.push(result);
      company.save();
      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
