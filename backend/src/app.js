import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routes from "./routes/route.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
