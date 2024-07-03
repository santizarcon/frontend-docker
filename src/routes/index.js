import { Router } from "express";
import rutaHome from "./routes.home.js";
import rutaDash from "./routes.dash.js";

const ruta = Router();

ruta.use("/", rutaHome);
ruta.use("/dash", rutaDash);


export default ruta;