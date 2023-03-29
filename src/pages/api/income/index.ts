import { Company } from "@/models/company.model";
import { Income } from "@/models/income.model";
import { dbConnect } from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  await dbConnect();
  let company;

  switch (method) {
    case "GET":
      company = await Company.findById({ _id: query.companyId });
      await company.populate("incomes");

      res.status(200).json({ message: "get", payload: company.incomes });
      break;
    case "POST":
      company = await Company.findById({ _id: query.companyId });
      const result = await Income.create(body);
      company.incomes.push(result);
      company.save();
      res.status(200).json({ message: "post", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
