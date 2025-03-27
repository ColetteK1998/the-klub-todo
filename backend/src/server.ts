import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", todoRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
