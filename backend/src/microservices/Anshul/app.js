import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

import orderRouter from './routes/order.routes.js'
import reviewRouter from './routes/review.routes.js'
import productRouter from './routes/product.routes.js'

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    // credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use('/orders',orderRouter)
app.use('/reviews',reviewRouter)
app.use('/products',productRouter)

export { app };
