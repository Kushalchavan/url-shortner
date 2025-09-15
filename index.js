import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = 3000;

app.use("/", (req, res) => {
  res.json({ message: "Working...", status: "success" });
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
