import { Company } from "@/models/company.model";
import { Income } from "@/models/income.model";
import type { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../../src-backend/db";
import { connection } from "mongoose";

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  await conn();
  let company;

  switch (method) {
    case "GET":
      company = await Company.findById({ _id: query.companyId })
        .populate("incomes")
        .lean();
      connection.close()
      res.status(200).json({ message: "get", payload: company.incomes });
      break;
    case "POST":
      company = await Company.findById({ _id: query.companyId });
      const result = await Income.create(JSON.parse(body));

      await company.incomes.push(result);
      await company.save();
      connection.close()
      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      connection.close()
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
