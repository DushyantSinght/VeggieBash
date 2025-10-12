// import dotenv from "dotenv";
// dotenv.config();
// import cookieParser from "cookie-parser";
// import express from 'express';
// import cors from 'cors';
// import connectDb from './configs/db.js';
// import 'dotenv/config'
// import userRouter from './routes/userRoute.js';
// import sellerRouter from './routes/sellerRoute.js';
// import connectCloudinary from './configs/cloudinary.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import addressRouter from './routes/addressRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import { stripeWebhooks } from "./controllers/orderController.js";

// const app = express();
// const port = process.env.PORT || 4000;
// await connectDb();
// await connectCloudinary();
// //Allow multiple origins
// const allowedOrigins = ['http://localhost:5173','https://veggie-bash-frt.vercel.app']

// app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks);

// //Middeleware configuration
// // CORS first, so headers and cookies are handled before parsing
// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true, // allow cookies from frontend
// }));

// // Parse cookies & JSON after CORS
// app.use(cookieParser());
// app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("API is working");
// })

// app.use("/api/user",userRouter);
// app.use("/api/seller",sellerRouter);
// app.use("/api/product",productRouter);
// app.use("/api/cart",cartRouter);
// app.use("/api/address",addressRouter);
// app.use("/api/order",orderRouter);

// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// })
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDb from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;

// Database & cloud setup
await connectDb();
await connectCloudinary();

const allowedOrigins = [
  "http://localhost:5173",
  "https://veggie-bash-frt.vercel.app",
];

// Stripe webhook FIRST (raw body)
app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// CORS, cookies, JSON middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
