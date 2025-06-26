import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./DB/Db.js";
import routes from "./routes/index.js";
dotenv.config();
connectDb();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Allow your local frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
  credentials: true, // Allow cookies, authorization headers, etc.
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 200 for OPTIONS
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
