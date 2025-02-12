import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
      res.send("SIMPLE TASK API WORKS!");
})

app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
})
