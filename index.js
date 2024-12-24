import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import userRoute from "./Routers/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.status(200).send("welcome To Api");
});

app.use("/api/auth", userRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is started and running sucessfully : ${port}`);
});
