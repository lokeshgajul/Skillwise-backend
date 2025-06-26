import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import connectDB from "./DB/Db.js";
dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.104:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the JWT authenticated API!");
});

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
