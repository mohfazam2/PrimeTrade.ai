import express, { Router } from "express";
import { createUserSchema, loginUserSchema } from "../types/index.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prismaClient = new PrismaClient();

export const AuthRouter: Router = express.Router();

AuthRouter.get("/health", (req, res) => {
  res.status(200).json({
    Message: "Auth Endpoint Up and Running",
  });
});

AuthRouter.post("/signup", async (req, res) => {
  const parsedData = createUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(403).json({
      Message: "Invalid Input",
      error: parsedData.error.format(),
    });
  }

  try {
    const { name, email, password } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      Message: "user Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Something went wrong",
      error: String(error),
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const parsedData = loginUserSchema.safeParse(req.body);

  try {
    if (!parsedData.success) {
      return res.status(411).json({
        Message: "Invalid Input",
        error: parsedData.error.format(),
      });
    }

    const { email, password } = parsedData.data;

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        Message: "User Not Found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        Message: "Incorrect password",
      });
    }

    return res.status(200).json({
      Message: "Login Successful",
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Something went wrong",
      error: String(error),
    });
  }
});
