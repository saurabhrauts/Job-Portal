import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";

import userRoute from "./routes/userroute.js";
import companyRoute from "./routes/companyroutes.js";
import jobRoute from "./routes/jobroutes.js";
import applicationRoute from "./routes/applicationroutes.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// 🔥 CORS FIX
const corsOption = {

  origin: "https://job-portal-one-navy-48.vercel.app",

  credentials: true

};

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

// api routes
app.use("/api/v1/user", userRoute);

app.use("/api/v1/company", companyRoute);

app.use("/api/v1/job", jobRoute);

app.use("/api/v1/application", applicationRoute);

// default route
app.get("/", (req, res) => {

  res.send("API is running 🚀");

});

// start server
app.listen(PORT, async () => {

  await connectDB();

  console.log(`Server running at port ${PORT}`);

});