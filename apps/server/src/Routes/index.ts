import express, { Router } from "express"
import { AuthRouter } from "../Auth/index.js";

export const MainRouter:Router = express.Router();

MainRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Router Endpoint Up and Running"
    })
})

MainRouter.use("/auth", AuthRouter);