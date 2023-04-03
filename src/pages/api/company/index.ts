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
  let result;

  switch (method) {
    case "POST":
      try {
        result = await Company.create(body);
      } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", payload: error });
        break;
      }

      res.status(200).json({ status: "success", payload: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
