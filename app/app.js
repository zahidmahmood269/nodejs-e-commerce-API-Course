import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
dotenv.config();
import express from "express";
import path from "path";
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middlewares/globalErrHandler.js";

import productsRouter from "../routes/productsRoute.js";
import userRoutes from "../routes/usersRoute.js";
import courseRouter from "../routes/courseRoute.js";

//db connect
dbConnect();
const app = express();
//cors
app.use(cors());

//pass incoming data
app.use(express.json());
//url encoded
app.use(express.urlencoded({ extended: true }));

//server static files
app.use(express.static("public"));
//routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/products/", productsRouter);

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
