export const home = (req, res) =>{
    res.render("views.home.ejs");
};

export const register = (req, res) =>{
    res.render("views.register.ejs");
};

export const login = (req, res) =>{
    res.render("views.login.ejs");
};

export const ruperarContra = (req, res) =>{
    res.render("views.password.recover.ejs");
};

export const cambioContra = (req, res) =>{
    res.render("views.changed.password.ejs");
};
