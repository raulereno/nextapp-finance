import { NextApiRequest, NextApiResponse } from "next";
import User from "../../src-backend/models/user.model";
import mongoose, { Schema } from "mongoose";
import { UserType } from "@/models/user.model";
export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      const user = await User.find();
      console.log(user);

      // if(user.length > 0){
      //     result = user

      // } else {
      //     const newUser = await User.create({
      //         email: body.email,
      //         name: body.name,
      //         photo: body.photo? body.photo : 'undefined',
      //     })
      //     result = newUser
      // }

      res.status(200).json(user);
  }
}
