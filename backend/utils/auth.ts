import bcrypt from "bcryptjs";
import { error } from "console";
import { Request, Response } from "express";

export const registerAuth = (req: Request, res: Response) => {
      const { username, password } = req.body;
      const salt = process.env.SALT_ROUNDS || 10;

      if (!username || !password) {
            throw new Error("Error username or password");
      }

      bcrypt.hash(password, salt, (err, passwordHash) => {
            if (err) {
                  res.status(500).json({ error: "Internal server error" });
            } else {
                  //todo save to db!
                  console.log("Username: ", username);
                  console.log("Password hash: ", passwordHash);
                  res.status(200);
            }
      })
}