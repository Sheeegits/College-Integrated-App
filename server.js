import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import collegeRoutes from "./routes/collegeRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware to handle form-data correctly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use("/api/colleges", collegeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
