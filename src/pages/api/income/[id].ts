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
      try {
        income = await Income.findOne({ _id: query.id });
      } catch (error) {
        res.status(400).json({ message: income });
      }
      res.status(200).json({ status: "sucess", payload: income });
      break;
    case "PUT":
      try {
        income = await Income.findOneAndUpdate(
          { _id: query.id },
          JSON.parse(body),
          {
            new: true,
          }
        );
      } catch (error) {
        res.status(400).json({ status: "error", message: error });
      }
      res.status(200).json({ status: "sucess", payload: income });
      break;
    case "DELETE":
      try {
        result = await Income.deleteOne({ _id: query.id });
      } catch (error) {
        res.status(400).json({ status: "error", message: error });
      }
      res.status(200).json({ message: "sucess", result: result });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
