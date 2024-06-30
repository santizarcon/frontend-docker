export const principalAdmin = (req, res) => {
  res.render("views.dash.admin.ejs");
};

export const inventarioAdmin = (req, res) => {
  res.render("views.inventory.admin.ejs");
};

export const verHerramienta = (req, res) => {
  res.render("views.show.tool.admin.ejs");
};

export const gestionarCuentasAdmin = (req, res) => {
  res.render("views.gestion.accounts.admin.ejs");
};

export const crearSubAdmin = (req, res) => {
  res.render("views.add.subAdmin.ejs");
};

export const tablaHerramientas = (req, res) => {
  res.render("views.table.tools.ejs");
};

export const editarHerramienta = (req, res) => {
  res.render("views.edit.tool.ejs");
};

export const agregarHerramienta = (req, res) => {
  res.render("views.new.tool.ejs");
};
