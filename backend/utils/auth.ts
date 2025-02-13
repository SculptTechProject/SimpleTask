import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const salt = process.env.SALT_ROUNDS || 10;

    if (!email || !password) {
      throw new Error("Error username or password");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exist!" });
    }

    bcrypt.hash(password, salt, async (err, passwordHash) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        const newUser = await prisma.user.create({
          data: { email, password: passwordHash },
        });
        res.status(201).json({ message: "User created: ", user: newUser });
      }
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Email and password required!" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password!" });
    }

    const hashedPassword = user.password;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
