import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/Routes.js";
import Connection from "./db/db.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 9000;
app.use("/", router);
Connection(process.env.USERNAME_DB, process.env.PASSWORD_DB);
app.listen(PORT, () => {
  console.log("server running");
});
