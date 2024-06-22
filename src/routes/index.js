import { Router } from "express";
import rutaHome from "./routes.home";
import rutaDash from "./routes.dash";

const ruta = Router();

ruta.use("/", rutaHome);
ruta.use("/dash", rutaDash)

export default ruta;