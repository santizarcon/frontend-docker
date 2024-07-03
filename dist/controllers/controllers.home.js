import { config } from "dotenv";
config();

export const home = (req, res) =>{
    res.render("views.home.ejs");
};

export const register = (req, res) =>{
    res.render("views.register.ejs");
};

export const login = (req, res) =>{
    const url = process.env.BACKEND_URL;
    const options = {
        url : url
    }
    res.render("views.login.ejs", options);
};

export const cambioContraFirst = (req, res) =>{
    res.render("views.email.changed.password.ejs");
};

export const cambioContra = (req, res) =>{
    res.render("views.changed.password.ejs");
};
