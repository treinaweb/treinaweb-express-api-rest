import express, { type Request, type Response } from "express";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "servidor online!" });
});

app.listen(port, () => {
  console.log(`Server runing on http://localhost:${port}`);
});
