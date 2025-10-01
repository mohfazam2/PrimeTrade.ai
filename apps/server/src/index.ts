import express, {Router}  from "express"
import { MainRouter } from "./Routes/index.js";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors());

app.get("/Health", (req, res) => {
    res.status(200).json({
        Message: "Index Route Up and Running"
    });
});

app.use("/api/v1", MainRouter);


app.listen(3001, () => {
    console.log("Server Started at post 3001");
})