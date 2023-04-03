import { Expense } from "@/models/expense.model";
import { Income } from "@/models/income.model";
import { dbConnect } from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function expenseID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  console.log(query);
  await dbConnect();
  let expense;
  switch (method) {
    case "GET":
      expense = await Expense.findOne({ _id: query.id });

      res.status(200).json({ message: expense });
      break;
    case "PUT":
      expense = await Expense.findOneAndUpdate(
        { _id: query.id },
        JSON.parse(body),
        {
          new: true,
        }
      );

      res
        .status(200)
        .json({ message: "update a unique income", payload: expense });
      break;
    case "DELETE":
      let result = await Expense.deleteOne({ _id: query.id });

      res
        .status(200)
        .json({ message: "delete a unique income", result: result });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
