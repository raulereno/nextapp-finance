import { Income } from "@/models/income.model";
import { dbConnect } from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

interface IncomeApi {
  type: string;
  description: string;
}

export default async function expenseID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  await dbConnect();
  let result;
  let income;

  switch (method) {
    case "GET":
      income = await Income.findOne({ _id: query.id });

      res.status(200).json({ message: income });
      break;
    case "PUT":
      income = await Income.findOneAndUpdate(
        { _id: query.id },
        JSON.parse(body),
        {
          new: true,
        }
      );

      res
        .status(200)
        .json({ message: "update a unique income", payload: income });
      break;
    case "DELETE":
      result = await Income.deleteOne({ _id: query.id });

      res
        .status(200)
        .json({ message: "delete a unique income", result: result });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
