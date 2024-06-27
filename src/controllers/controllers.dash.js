export const principalAdmin = (req, res) =>{
    res.render("views.dash.admin.ejs");
};

export const inventarioAdmin = (req, res) =>{
    res.render("views.inventory.admin.ejs");
};

export const gestionarCuentasAdmin = (req, res) =>{
    res.render("views.gestion.accounts.admin.ejs");
};

export const tablaHerramientas = (req, res) =>{
    res.render("views.table.tools.ejs");
};

export const editarHerramienta = (req, res) =>{
    res.render("views.edit.tool.ejs");
};