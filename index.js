import express from "express";
import "dotenv/config";
import userRouter from "./routes/user.route.js";
import urlRouter from "./routes/url.route.js";
import { authenticationMiddleware } from "./middleware/auth.middleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(authenticationMiddleware);

app.use("/user", userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
