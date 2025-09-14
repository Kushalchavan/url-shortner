import express from "express";

const app = express();
const PORT = 3000;

app.use("/", (req, res) => {
  res.json({ message: "Working...", status: "success" });
});

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
