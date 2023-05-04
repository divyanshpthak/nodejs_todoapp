import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import userRoute from "./routes/user.js"
import taskRoute from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./midddlewares/error.js";
// import cors from "cors";

const app= express();

config({
    path: "./data/config.env"
})

app.use(cookieParser());
app.use(express.json());
app.use(userRoute);
app.use(taskRoute);
// app.use(cors({
//     methods: ["GET","POST","PUT","DELETE"],
//     credentials: true,
// }))

mongoose.connect("mongodb://localhost:27017",{
    dbName: "backednapi"
})
.then(()=>console.log("Database is connected"))
.catch((e)=>console.log(e));


app.get("/",(req,res)=>{
    res.send("Nice Working");
})

app.listen(5000,()=>{
    console.log("Server is working");
})

app.use(errorMiddleware);