import { config } from "dotenv";
config();

export const home = (req, res) => {
  res.render("views.home.ejs");
};

export const about = (req, res) => {
  res.render("views.about.ejs");
};

export const contact = (req, res) => {
  res.render("views.contact.ejs");
};

export const register = (req, res) => {
  const url = process.env.BACKEND_URL;
  const options = {
    url: url,
  };
  res.render("views.register.ejs", options);
};

export const login = (req, res) => {
  const url = process.env.BACKEND_URL;
  const options = {
    url: url,
  };
  res.render("views.login.ejs", options);
};

export const cambioContraFirst = (req, res) => {
  const url = process.env.BACKEND_URL;
  const options = {
    url: url,
  };
  res.render("views.email.changed.password.ejs", options);
};

export const cambioContra = (req, res) => {
  res.render("views.changed.password.ejs");
};
