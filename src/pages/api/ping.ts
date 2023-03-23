// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Income, IncomeType } from "@/models/income.model";
import dbConnect from "@/utils/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = { message: string; time: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ message: "pong", time: "" });
}
