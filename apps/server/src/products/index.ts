import express, { Router } from "express"
import { productSchema } from "../types/index.js";
import { authMiddleware, roleMiddleware } from "../middleware/index.js";
import { PrismaClient } from "@prisma/client";

export const productRouter:Router = express.Router();

const prismaClient = new PrismaClient()

productRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Products Health End Point Up and Running"
    });
});

productRouter.post("/add", authMiddleware, roleMiddleware,async (req, res) => {
   const parsedData = productSchema.safeParse(req.body);
   
   if(!parsedData.success){
    return res.status(403).json({
        message: "Invalid Input",
        format: parsedData.error.format()
    });
}

    try{
        const {name, description, price} = parsedData.data;

    const product = await prismaClient.product.create({
        data: {
            name: name!,
            description: description!,
            price: price!
        }
    });

    return res.status(201).json({
        Message: "Product added successfully",
        product
    })
    } catch(error){
        return res.status(500).json({
            Message: "Something went wrong",
            error: error
        });
    }
   
});