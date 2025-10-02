import express, { Router } from "express"
import { productSchema, updateProductSchema } from "../types/index.js";
import { authMiddleware, roleMiddleware } from "../middleware/index.js";
import { PrismaClient } from "@prisma/client";

export const productRouter:Router = express.Router();

const prismaClient = new PrismaClient()

productRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Products Health End Point Up and Running"
    });
});

productRouter.get("/all", async (req, res) => {
    try{
        const products = await prismaClient.product.findMany({
            orderBy:{
                id: "asc"
            }
        });

        return res.status(200).json({
            Message: "All products fetched",
            Products: products
        });
    } catch(error){
        return res.status(500).json({
            Message: "Something went wrong",
            error: error
        });
    }
})

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

productRouter.put("/update", authMiddleware, roleMiddleware, async (req, res) => {
    const parsedData = updateProductSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(403).json({
            Message: "Something Went Wrong"
        });
    }

    const {id, name, description, price} = parsedData.data
    try{
        const response = await prismaClient.product.update({
        where: {
            id: id
        }, 
        data: {
            name,
            description: description || null,
            price
        } 
    });

    return res.status(200).json({
        Message: "Product Updated Successfully",
        
        Old_Product: parsedData.data,
        New_Product: response

        
    })
    } catch(error){
        return res.status(500).json({
            Message: "Something Went Wrong",
            Error: error
        })
    }
});