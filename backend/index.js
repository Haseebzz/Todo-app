import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { userRouter } from "./routes/users.js";
import { taskRouter } from "./routes/tasks.js";


const app = express()
app.use(express.json());
dotenv.config();
app.use(cors());
app.use("/auth",userRouter);
app.use("/todo",taskRouter);

mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

app.get("/", (req,res)=> {
    res.send("server is running")
})


app.listen(process.env.PORT, () => {
    console.log("everything is running")
} )