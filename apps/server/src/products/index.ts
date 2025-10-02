import express, { Router } from "express"

export const productRouter:Router = express.Router();

productRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Products Health End Point Up and Running"
    });
});