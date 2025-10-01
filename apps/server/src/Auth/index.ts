import express, { Router } from "express";
import { createUserSchema } from "../types/index.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();


export const AuthRouter:Router = express.Router();

AuthRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Auth Endpoint Up and Running"
    });
});

AuthRouter.post("/signup", async (req, res) => {
    const parsedData = createUserSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(403).json({
            Message: "Invalid Input",
            error: parsedData.error.format(),
        });
    }

    try{
        const User = await prismaClient.user.create({
            data:{
                name: parsedData.data.name,
                email: parsedData.data.email,
                password: parsedData.data.password
            }
        });

        return res.status(201).json({
            Message: "user Created Successfully"
        });
    } catch(error){
        return res.status(500).json({
            Message: "Something went wrong",
            error: String(error)
        });
    }


});