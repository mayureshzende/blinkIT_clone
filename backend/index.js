// console.log("hello");
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/connectDB.js";
import userrouter from "./router/userRouter.js";
import productsrouter from "./router/productRouter.js";

const PORT = process.env.PORT || 3000;
const app = express();

// body parser
app.use(express.json({ limit: "5MB" }));
app.use(cors());

// connecting to DB
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ data: "Welcome to the backend" });
});

app.use("/api", userrouter);
app.use("/api", productsrouter);

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});
