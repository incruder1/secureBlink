import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import helmet from "helmet";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
// app.use(csurf());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Auth </h1>");
});

//routes
app.use("/api/v1/auth", authRoutes);

// //rest api

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
