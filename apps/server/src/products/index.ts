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
        Updated_Product: response 
    });
    } catch(error){
        return res.status(500).json({
            Message: "Something Went Wrong",
            Error: error
        })
    }
});

productRouter.delete("/delete", authMiddleware, roleMiddleware, async (req, res) => {
    
    const { id } = req.body;

    if (!id || typeof id !== "number" || id <= 0) {
        return res.status(400).json({
            Message: "Invalid product id",
        });
    }

    try {
        
        const existingProduct = await prismaClient.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return res.status(404).json({
                Message: "Product not found",
            });
        }

        
        await prismaClient.product.delete({
            where: { id },
        });

        return res.status(200).json({
            Message: "Product deleted successfully",
            Deleted_Product: existingProduct, 
        });
    } catch (error) {
        return res.status(500).json({
            Message: "Something went wrong",
            Error: String(error),
        });
    }
});
