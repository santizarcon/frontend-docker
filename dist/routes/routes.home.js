import { Router } from "express";
import { cambioContra, home, login, register } from "../controllers/controllers.home";

const rutaHome = Router();

// RUTAS
rutaHome.get("/", home);
rutaHome.get("/login", login);
rutaHome.get("/register", register);
rutaHome.use("/cambioContra", cambioContra)

export default rutaHome;