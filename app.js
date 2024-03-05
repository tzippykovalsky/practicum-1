import express from "express";
import cors from "cors";
import userRouter from "./userRouts.js";
import { connectToDB } from "./config.js";


const app = express();

connectToDB();

app.use(cors)
app.use(express.json())
app.use("/api/users", userRouter);


app.use=(err,req,res,next)=>{
    console.log(err)
    res.status(res.statusCode || 500).send(err.message || "התרחשה תקלה");
}


let port =  8000;
app.listen(port, () => {
    console.log(`server is litening on port ${port}`)
})
