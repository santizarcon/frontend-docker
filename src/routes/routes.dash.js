import { Router } from "express";

const rutaDash = Router();

rutaDash.get("/principal",(req, res) =>{
    res.render("<h1> DASHBOARD </h1>");
});

export default rutaDash;