import express, { Request, Response } from "express";
import router from "./routes/index.route.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("*** Admin Panel API ***");
});
app.use("/api", router);

app.listen(PORT, () => console.log(`The server is running on Port ${PORT}`));
