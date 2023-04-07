import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src-backend/db";

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
      company = await Company.findById({ _id: query.companyId })
        .populate("expenses")
        .lean();

      res.status(200).json({ message: "get", payload: company.expenses });
      break;
    case "POST":
      company = await Company.findById({ _id: query.companyId });

      const result = await Expense.create(JSON.parse(body));
      await company.expenses.push(result);
      await company.save();
      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
