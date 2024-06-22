import express from "express";
import {config} from "dotenv";
import ruta from "./routes";
import ejs from "ejs";
import path from "path";
config();

const app = express();

app.set("port", process.env.PORT);

app.use("/", ruta);

// MIDDLEWARE
app.set('view engine', 'ejs');
app.set("views", path.join (__dirname, "views"));
console.log(__dirname);

export default app;
