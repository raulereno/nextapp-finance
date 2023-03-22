import { NextApiRequest, NextApiResponse } from "next";

export default function incomeID(req: NextApiRequest, res: NextApiResponse) {
  return res.json("id");
}
