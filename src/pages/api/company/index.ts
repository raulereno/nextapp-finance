import { Expense } from "@/models/expense.model";
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
      //const incomes = await Expense.find();

      res.status(200).json({ message: "get", payload: "" });
      break;
    case "POST":
      //const result = await Expense.create(JSON.parse(body));

      res.status(200).json({ message: "post", payload: "" });
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
