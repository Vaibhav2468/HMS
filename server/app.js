import express from "express"
import { config } from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import mongoose from 'mongoose'
const app=express();
//////////////////////
const schemaData = mongoose.Schema({
  name:String,
  email:String,
  mobile:String,
},{
  Timestamp:true
})
const userModel = mongoose.model("user",schemaData)
app.get('/a',async(req,res)=>{ 
  const userModel = mongoose.model("user",schemaData)
      const data =await userModel.find({})
  console.log("hello")
  res.json({success:true,data:data})
  })
/////////////////////
config({path:"./config/config.env"})
//console.log(`${process.env.MONGO_URI}`)

//////////////////

// app.use(cors({
//   origin: true,
//   credentials: true,
// }));

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // local / Postman
    callback(null, true); // allow all origins dynamically (simple solution)
  },
  credentials: true,
}));

// app.use(cors({
//   origin: [process.env.FRONTED_URL_ONE, process.env.FRONTED_URL_TWO],
//   credentials: true,
// }));
///////////////
// app.use(
//     cors({
//      origin: [process.env.FRONTED_URL_ONE, process.env.FRONTED_URL_TWO],
//       method: ["GET", "POST", "DELETE", "PUT"],
//       credentials: true,
//     })
//   );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  dbConnection()
  
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use(errorMiddleware);

export default app;




