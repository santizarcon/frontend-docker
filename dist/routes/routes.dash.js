import { Router } from "express";
import {
  agregarHerramienta,
  crearSubAdmin,
  editarHerramienta,
  gestionarCuentasAdmin,
  inventarioAdmin,
  principalAdmin,
  tablaHerramientas,
  verHerramienta,
} from "../controllers/controllers.dash";

const rutaDash = Router();

rutaDash.get("/principalAdmin", principalAdmin);
rutaDash.get("/inventarioAdmin", inventarioAdmin);
rutaDash.get("/verHerramienta", verHerramienta);
rutaDash.get("/gestionCuentasAdmin", gestionarCuentasAdmin);
rutaDash.get("/crearSubAdmin", crearSubAdmin);
rutaDash.get("/tablaHerramientas", tablaHerramientas);
rutaDash.get("/editarHerramienta", editarHerramienta);
rutaDash.get("/agregarHerramienta", agregarHerramienta);

crearSubAdmin

export default rutaDash;
