import { Income } from "@/models/income.model";
import dbConnect from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  await dbConnect();

  const incomes = await Income.find();

  switch (method) {
    case "GET":
      res.status(200).json({ message: "get", payload: incomes });
      break;
    case "POST":
      res.status(200).json({ message: "post" });
      break;
    case "PUT":
      res.status(200).json({ message: "put" });
      break;
    case "DELETE":
      res.status(200).json({ message: "delete" });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
