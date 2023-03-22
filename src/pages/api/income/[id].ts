import { NextApiRequest, NextApiResponse } from "next";

export default function expenseID(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ message: "get a unique income" });
      break;
    case "PUT":
      res.status(200).json({ message: "update a unique income" });
      break;
    case "DELETE":
      res.status(200).json({ message: "delete a unique income" });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
