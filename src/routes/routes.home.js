import { Router } from "express";
import { cambioContra, cambioContraFirst, home, login, register } from "../controllers/controllers.home.js";

const rutaHome = Router();

// RUTAS
rutaHome.get("/", home);
rutaHome.get("/login", login);
rutaHome.get("/register", register);
rutaHome.use("/cambioContraFirst", cambioContraFirst)
rutaHome.use("/cambioContra", cambioContra)

export default rutaHome;