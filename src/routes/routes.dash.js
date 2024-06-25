import { Router } from "express";
import { principalAdmin } from "../controllers/controllers.dash";

const rutaDash = Router();

rutaDash.get("/principalAdmin", principalAdmin);

export default rutaDash;