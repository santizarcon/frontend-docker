import { Router } from "express";
import { editarHerramienta, gestionarCuentasAdmin, inventarioAdmin, principalAdmin, tablaHerramientas } from "../controllers/controllers.dash";

const rutaDash = Router();

rutaDash.get("/principalAdmin", principalAdmin);
rutaDash.get("/inventarioAdmin", inventarioAdmin);
rutaDash.get("/gestionCuentasAdmin", gestionarCuentasAdmin);
rutaDash.get("/tablaHerramientas", tablaHerramientas);
rutaDash.get("/editarHerramienta", editarHerramienta);

export default rutaDash;