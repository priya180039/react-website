import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ThreadRoute from "./routes/ThreadRoute.js";
import ReplyRoute from "./routes/ReplyRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ThreadRoute);
app.use(ReplyRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => console.log("Server up and running..."));
