import { Router } from "express";
import {
  agregarHerramienta,
  ajustesAdmin,
  crearSubAdmin,
  editarHerramienta,
  editarPerfil,
  gestionarCuentasAdmin,
  inventarioAdmin,
  pedidosAdmin,
  principalAdmin,
  tablaHerramientas,
  trasnferirResponsabilidad,
  verFormularios,
  verHerramienta,
  verNotificacionesAdmin,
  verReporte,
} from "../controllers/controllers.dash.js";

const rutaDash = Router();

// RUTAS ADMIN

rutaDash.get("/principalAdmin", principalAdmin);

rutaDash.get("/inventarioAdmin", inventarioAdmin);
rutaDash.get("/verHerramienta", verHerramienta);

rutaDash.get("/tablaHerramientas", tablaHerramientas);
rutaDash.get("/editarHerramienta", editarHerramienta);
rutaDash.get("/agregarHerramienta", agregarHerramienta);

rutaDash.get("/gestionCuentasAdmin", gestionarCuentasAdmin);
rutaDash.get("/crearSubAdmin", crearSubAdmin);
rutaDash.get("/trasnferirResponsabilidad", trasnferirResponsabilidad);

rutaDash.get("/pedidosAdmin", pedidosAdmin);
rutaDash.get("/verReporte", verReporte);

rutaDash.get("/verFormularios", verFormularios);

rutaDash.get("/verNotificacionesAdmin", verNotificacionesAdmin);

rutaDash.get("/editarPerfil", editarPerfil);
rutaDash.get("/ajustesAdmin", ajustesAdmin);

// RUTAS USER


export default rutaDash;
