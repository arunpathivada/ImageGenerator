import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import dalleRoute from "./routes/dalleRoute.js";
import postRoute from "./routes/postRoute.js";
dotenv.config();
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
app.use(cors(corsOptions));
app.use(express.json({limit:'50mb'}));
const url = process.env.MONGO_URL;
mongoose.connect(url)
    .then(()=>console.log("mongoDB connected"))
    .catch((err)=>console.log(err));


app.use("/api/v1/post",postRoute);
app.use('/api/v1/dalle',dalleRoute);
app.get('/',async(req,res)=>{
    res.send('Hello from DaLL-E');
})

app.listen(8080,()=>{
    console.log("server started at port 8080");
})