import express from "express";
import "./db-connection";
import itemRouter from "./routes/item.route";
import operatorRouter from "./routes/operator.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  const currentTime = new Date().toLocaleString();
  res.status(200).send({
    status: "success",
    date: currentTime,
  });
});

app.use("/items", itemRouter);
app.use("/operators", operatorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});