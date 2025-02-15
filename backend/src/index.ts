import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import tasksRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

const env = process.env.NODE_ENV || "development";

const corsOptions =
  env === "production"
    ? {
        origin: ["https://simple-task-ten.vercel.app"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
        ],
        credentials: true,
      }
    : {
        origin: "*",
      };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("SIMPLE TASK API WORKS!");
});


export default app;
