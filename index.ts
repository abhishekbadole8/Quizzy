import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./src/configs/dbConnection";
import userRoutes from "./src/routes/userRoutes";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDb(); // Connect to the database

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use("/api/user", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
