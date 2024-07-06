import { Router } from "express";
import {
  addFichas,
  agregarHerramienta,
  ajustesAdmin,
  crearSubAdmin,
  editarFicha,
  editarHerramienta,
  editarPerfil,
  fichasAdmin,
  gestionarCuentasAdmin,
  informeSolicitudUser,
  inventarioAdmin,
  inventarioUser,
  pedidosAdmin,
  principalAdmin,
  tablaHerramientas,
  trasnferirResponsabilidad,
  verFormularios,
  verHerramienta,
  VerHerramientaUser,
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

rutaDash.get("/fichasAdmin", fichasAdmin);
rutaDash.get("/addFichas", addFichas);
rutaDash.get("/editarFicha", editarFicha);

rutaDash.get("/editarPerfil", editarPerfil);
rutaDash.get("/ajustesAdmin", ajustesAdmin);

// RUTAS USER
rutaDash.get("/inventarioUser", inventarioUser);
rutaDash.get("/VerHerramientaUser", VerHerramientaUser);

rutaDash.get("/informeSolicitudUser", informeSolicitudUser);


export default rutaDash;
