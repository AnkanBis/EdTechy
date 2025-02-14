import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import signupRouter from "./routes/authRoutes";
import applicationRouter from "./routes/applicationRoutes";
import scholarshipRouter from "./routes/scholarshipRoute";
import universityRouter from "./routes/universityRoutes";
import connectDB from "./config/db";
import cors from "cors";

const PORT = process.env.PORT;
const app: Application = express();

app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/v1/user", signupRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/scholarships", scholarshipRouter);
app.use("/api/v1/university", universityRouter);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
