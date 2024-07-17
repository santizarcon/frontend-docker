import { Router } from "express";
import { about, cambioContra, cambioContraFirst, contact, home, login, register } from "../controllers/controllers.home.js";

const rutaHome = Router();

// RUTAS
rutaHome.get("/", home);
rutaHome.get("/about", about);
rutaHome.get("/contact", contact);
rutaHome.get("/login", login);
rutaHome.get("/register", register);
rutaHome.use("/cambioContraFirst", cambioContraFirst)
rutaHome.use("/cambioContra", cambioContra)

export default rutaHome;