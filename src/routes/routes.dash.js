import { Router } from "express";
import {
  addFichas,
  agregarHerramienta,
  ajustesAdmin,
  ajustesUser,
  crearFormuDano,
  crearFormuNew,
  crearSubAdmin,
  editarFicha,
  editarHerramienta,
  editarPerfil,
  editarPerfilUser,
  fichasAdmin,
  formulariosUser,
  gestionarCuentasAdmin,
  informeSolicitudUser,
  inventarioAdmin,
  inventarioUser,
  pedidosAdmin,
  pedidosUser,
  principalAdmin,
  tablaHerramientas,
  trasnferirResponsabilidad,
  verFormularios,
  verHerramienta,
  VerHerramientaUser,
  verReporte,
  verReporteUser,
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
rutaDash.get("/pedidosUser", pedidosUser);
rutaDash.get("/verReporteUser", verReporteUser);

rutaDash.get("/formulariosUser", formulariosUser);
rutaDash.get("/crearFormuNew", crearFormuNew);
rutaDash.get("/crearFormuDano", crearFormuDano);

rutaDash.get("/editarPerfilUser", editarPerfilUser);
rutaDash.get("/ajustesUser", ajustesUser);


export default rutaDash;
