import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/users", userRouter); //http://localhost:5000/users/signup or signin
app.use("/product", productRouter); //http://localhost:5000/users/signup or signin
const MONGODB_URL =
  "mongodb+srv://chedigdoura:oOkGkH6kKXJxTrko@cluster0.xjzekzs.mongodb.net/dod_DB";

const port = 5000;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
