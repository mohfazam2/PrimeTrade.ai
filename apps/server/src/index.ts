import express, {Router}  from "express"
import { MainRouter } from "./Routes/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


const app = express();


app.use(express.json());
app.use(cors());

app.get("/Health", (req, res) => {
    res.status(200).json({
        Message: "Index Route Up and Running"
    });
});

app.use("/api/v1", MainRouter);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prime Trade AI API",
      version: "1.0.0",
      description: "API documentation for Prime Trade AI backend",
    },
    servers: [
      {
        url: "https://prime-trade-ai-server.vercel.app/api/v1", 
      },
    ],
  },
  apis: ["./Routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3001, () => {
    console.log("Server Started at post 3001");
})