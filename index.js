import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./DB/Db.js";
import routes from "./routes/index.js";
dotenv.config();
connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the JWT authenticated API!");
});

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
