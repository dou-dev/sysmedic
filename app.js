import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { loginRouter } from "./routes/loginRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { registerRouter } from "./routes/registerRouter.js";
import { doctorRoutes } from "./routes/doctorsRoutes.js";
import { appointmentRoutes } from "./routes/appointmentRoutes.js";

const PORT = process.env.PORT ?? 3030;
const app = express();
app.disable("x-powered-by");

app.use(json());
dotenv.config();
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ message: "Sysmedic API" });
});

app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/doctors", doctorRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/confirm", registerRouter);
app.use("/register", registerRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
