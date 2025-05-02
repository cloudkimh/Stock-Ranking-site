import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";

import { errorHandler } from "./global/error.handle.js";
import { preRequestHandler } from "./global/pre_request.handle.js";
import routes from "./api/index.js";

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
    origin: process.env.ADMIN_FRONT_END_URL || `http://localhost:3000`,
    credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle pre-request
app.use(preRequestHandler);

// Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorHandler);

export default app;