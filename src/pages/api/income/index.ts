import { Income } from "@/models/income.model";
import { dbConnect } from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const incomes = await Income.find();
      res.status(200).json({ message: "get", payload: incomes });
      break;
    case "POST":
      const result = await Income.create(body);
      res.status(200).json({ message: "post", result: result });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
