import { Company } from "@/models/company.model";
import { Expense } from "@/models/expense.model";
import User from "../../../models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/src-backend/db";

dbConnect();

export default async function income(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req;

  let company;
  let result;

  switch (method) {
    case "POST":
      try {
        const objUser = await User.findOne({ email: body.email });
        const verify = await Company.find({ name: body.name });

        if (verify.length === 0) {
          const companyBody = {
            name: body.name,
            users: [objUser._id],
          };
          const companyObj = await Company.create(companyBody);
          objUser.company.push(companyObj._id);
          objUser.save();
          res.status(200).json(companyObj);
        } else {
          res.status(400).json({ error: "Company name already exists" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ status: "error", payload: error });
        break;
      }
      break;

    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
