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

app.use(express.static (path.join(__dirname, "public")));

app.use("/", (req, res) =>{
    res.render("views.error404.ejs");
});

export default app;