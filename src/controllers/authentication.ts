import express from "express";
import { createUser, getUserByEmail } from "../models/users";
import { authentication, random } from "../utils";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      username,
      email,
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.sendStatus(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
