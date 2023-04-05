import { Income } from "@/models/income.model";
import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../src-backend/db";
import { connection } from "mongoose";

interface IncomeApi {
  type: string;
  description: string;
}

export default async function expenseID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;

  await conn();
  let result;
  let income;

  switch (method) {
    case "GET":
      try {
        income = await Income.findOne({ _id: query.id });
      } catch (error) {
        connection.close();
        res.status(400).json({ message: income });
      }
      connection.close();
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
        connection.close();
        res.status(400).json({ status: "error", message: error });
      }
      connection.close();
      res.status(200).json({ status: "sucess", payload: income });
      break;
    case "DELETE":
      try {
        result = await Income.deleteOne({ _id: query.id });
      } catch (error) {
        connection.close();
        res.status(400).json({ status: "error", message: error });
      }
      connection.close();
      res.status(200).json({ message: "sucess", result: result });
      break;
    default:
      connection.close();
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
