import { Router } from "express";
import { home, login, register } from "../controllers/controllers.home";

const rutaHome = Router();

// RUTAS
rutaHome.get("/", home);
rutaHome.get("/login", login);
rutaHome.get("/register", register);

export default rutaHome;