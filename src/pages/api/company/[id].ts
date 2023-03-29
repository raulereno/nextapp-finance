import { Company } from "@/models/company.model";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
export default async function companyID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  console.log(query);
  let company;

  switch (method) {
    case "GET":
      try {
        //64238a57bfa0ac002ef68b45
        company = await Company.findOne({ _id: query.id });
      } catch (error) {
        res.status(400).json({ status: "error", payload: error });
      }
      res.status(200).json({ status: "success", payload: company });
      break;

    default:
      break;
  }
}
