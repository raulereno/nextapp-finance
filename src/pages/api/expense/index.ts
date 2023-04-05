import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import type { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../src-backend/db";
import { connection } from "mongoose";

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  await conn();
  let company;
  let expenses;
  switch (method) {
    case "GET":
      try {
        company = await Company.findById({ _id: query.companyId })
          .populate("expenses")
          .lean();
      } catch (error) {
        res.status(400).json("erro");
      }

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
