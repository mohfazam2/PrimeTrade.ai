import express, { Router } from "Express";

export const AuthRouter:Router = express.Router();

AuthRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "Auth Endpoint Up and Running"
    });
});