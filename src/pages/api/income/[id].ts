import { Income } from "@/models/income.model";
import { dbConnect } from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function expenseID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      let income = await Income.findOne({ _id: query.id });
      res.status(200).json({ message: income });
      break;
    case "PUT":
      res.status(200).json({ message: "update a unique income" });
      break;
    case "DELETE":
      let result = await Income.deleteOne({ _id: query.id });

      res
        .status(200)
        .json({ message: "delete a unique income", result: result });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
