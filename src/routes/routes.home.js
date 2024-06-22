import { Router } from "express";
import { home } from "../controllers/controllers.home";

const rutaHome = Router();

rutaHome.get("/", home)

export default rutaHome;