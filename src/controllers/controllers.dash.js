// ADMIN

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

export const fichasAdmin = (req, res) => {
  res.render("admin/views.fichas.admin.ejs");
};

export const addFichas = (req, res) => {
  res.render("admin/views.add.ficha.ejs");
};

export const editarPerfil = (req, res) => {
  res.render("admin/views.edit.perfil.ejs");
};

export const editarFicha = (req, res) => {
  res.render("admin/views.edit.ficha.ejs");
};

export const ajustesAdmin = (req, res) => {
  res.render("admin/views.setting.admin.ejs");
};


// USER
export const inventarioUser = (req, res) => {
  res.render("user/views.inventory.user.ejs");
};

export const VerHerramientaUser = (req, res) => {
  res.render("user/views.show.tool.user.ejs");
};

export const informeSolicitudUser = (req, res) => {
  res.render("user/views.request.report.user.ejs");
};

export const pedidosUser = (req, res) => {
  res.render("user/views.orders.user.ejs");
};

export const verReporteUser = (req, res) => {
  res.render("user/views.show.order.user.ejs");
};

export const formulariosUser = (req, res) => {
  res.render("user/views.formu.user.ejs");
};

export const crearFormuNew = (req, res) => {
  res.render("user/views.order.new.tool.ejs");
};

export const crearFormuDano = (req, res) => {
  res.render("user/views.demage.tool.ejs");
};

export const editarPerfilUser = (req, res) => {
  res.render("user/views.edit.perfil.user.ejs");
};

export const ajustesUser = (req, res) => {
  res.render("user/views.setting.user.ejs");
};

