import type { NextApiRequest, NextApiResponse } from "next";

export default function income(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ message: "get" });
      break;
    case "POST":
      res.status(200).json({ message: "post" });
      break;
    case "PUT":
      res.status(200).json({ message: "put" });
      break;
    case "DELETE":
      res.status(200).json({ message: "delete" });
      break;
    default:
      res.status(400).json({ error: "Invalid Method" });
      break;
  }
}
