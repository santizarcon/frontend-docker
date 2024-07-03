export const principalAdmin = (req, res) => {
  res.render("admin/views.dash.admin.ejs");
};

export const inventarioAdmin = (req, res) => {
  res.render("admin/views.inventory.admin.ejs");
};

export const verHerramienta  = (req, res) => {
  res.render("admin/views.show.tool.admin.ejs");
};

export const tablaHerramientas = (req, res) => {
  res.render("admin/views.table.tools.ejs");
};

export const editarHerramienta = (req, res) => {
  res.render("admin/views.edit.tool.ejs");
};

export const agregarHerramienta = (req, res) => {
  res.render("admin/views.new.tool.ejs");
};

export const gestionarCuentasAdmin = (req, res) => {
  res.render("admin/views.gestion.accounts.admin.ejs");
};

export const crearSubAdmin = (req, res) => {
  res.render("admin/views.add.subAdmin.ejs");
};

export const trasnferirResponsabilidad = (req, res) => {
  res.render("admin/views.transferring.responsibilities.ejs");
};

export const pedidosAdmin = (req, res) => {
  res.render("admin/views.orders.admin.ejs");
};

export const verReporte = (req, res) => {
  res.render("admin/views.show.order.admin.ejs");
};

export const verFormularios = (req, res) => {
  res.render("admin/views.form.admin.ejs");
};

export const verNotificacionesAdmin = (req, res) => {
  res.render("admin/views.notifications.admin.ejs");
};

export const editarPerfil = (req, res) => {
  res.render("admin/views.edit.perfil.ejs");
};

export const ajustesAdmin = (req, res) => {
  res.render("admin/views.setting.admin.ejs");
};

