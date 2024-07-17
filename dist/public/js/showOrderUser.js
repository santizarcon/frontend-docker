const menu_icon = document.getElementById("menu-icon");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const menu = document.querySelector(".menu");
const contenedorContenido = document.querySelector(".contenedor_contenido");
const barraUsuario = document.querySelector(".barra_usuario");

const fotoUsuario = document.querySelector(".foto_usuario");
const eleccionUsuario2 = document.querySelector(".eleccion_usuario2");

// DEL RESPONSIVE
const eleccionUsuario = document.querySelector(".eleccion_usuario");
const fotoUsuario2 = document.querySelector(".foto_usuario2");

// RESPONSIVE ELECCION DE CERRA SESION Y EDITA PERFIL
fotoUsuario2.addEventListener("click", () => {
  eleccionUsuario.classList.toggle("aparece");
});

// Ocultar el menú si se hace clic fuera de él RESPONSIVE
document.addEventListener("click", (event) => {
  const isClickInside =
    eleccionUsuario.contains(event.target) ||
    fotoUsuario2.contains(event.target);
  // Comprueba si el elemento en el que se hizo clic (event.target) está contenido dentro del div (eleccion_usuario2 o fotoUsuario)
  // ||, si el clic ocurrió dentro de cualquiera de estos elementos, isClickInside será TRUE.
  //  contains, se usa para determinar si el elemento en el que se hizo clic (event.target) es un descendiente del div con la clase.

  if (!isClickInside) {
    // si es diferente a TRUE, significa que el clic no ocurrio dentro del div
    eleccionUsuario.classList.remove("aparece");
  }
});

// NORMAL ELECCION DE CERRA SESION Y EDITA PERFIL
fotoUsuario.addEventListener("click", () => {
  eleccionUsuario2.classList.toggle("apareceInicial");
});

// Ocultar el menú si se hace clic fuera de él NORMAL
document.addEventListener("click", (event) => {
  const isClickInside =
    eleccionUsuario2.contains(event.target) ||
    fotoUsuario.contains(event.target);

  if (!isClickInside) {
    eleccionUsuario2.classList.remove("apareceInicial");
  }
});

// MENU RESPONSIVE
menu.addEventListener("click", () => {
  // Esta el el RESPOSIVE, vuelva a la posicion
  barraLateral.classList.toggle("max-barra-lateral");

  // classList.contains() es una función de JavaScript que se
  // utiliza para verificar si un elemento HTML tiene una clase específica
  if (barraLateral.classList.contains("max-barra-lateral")) {
    menu.children[0].style.display = "none"; // icon menu
    menu.children[1].style.display = "block"; //icon circulo
  } else {
    menu.children[0].style.display = "block"; // icon menu
    menu.children[1].style.display = "none"; // icon circulo
  }
});

// MENU DESPEGABLE NORMAL VISTA
menu_icon.addEventListener("click", () => {
  // Barra de Arriba
  barraUsuario.classList.toggle("min-barra");

  // Barra Lateral
  barraLateral.classList.toggle("mini-barra-lateral");

  // organizar el margin-left del CONTENIDO.
  contenedorContenido.classList.toggle("min-contenido");

  // Para todos los span encontrados le agregamos la CALSE .oculto
  spans.forEach((span) => {
    span.classList.toggle("oculto");
  });
});

// PASAR DE HOJA A HOJA
const salir = () => {
  window.location.href = "/dash/pedidosUser";
};

const editarPerfil = () => {
  window.location.href = "/dash/editarPerfilUser";
};

// CONSUMO

const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const recurso = url + "/api/reportTools";

// CERRAS SESION
const cerrarSesion = () => {
  sessionStorage.setItem("token", "");
  sessionStorage.setItem("urlApi", "");
  sessionStorage.setItem("idUser", "");
  window.location.href = "/login";
};

// VERIFICAR INGRESO
const urlComprobar = url + "/api/oauth";

if (token == "" || token == null) {
  window.location.href = "/login";
}
if (url == "" || url == null) {
  window.location.href = "/login";
}

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
fetch(urlComprobar, options)
  .then((res) => res.json())
  .then((data) => {
    if (data.error == true) {
      window.location.href = "/login";
    }
  });

// CARGAR los datos de localStorage y mostrarlos en la página
document.getElementById("email").value =
  localStorage.getItem("nombre") +
  " " +
  localStorage.getItem("apellido") +
  " --- " +
  localStorage.getItem("email");
document.getElementById("fecha").value = localStorage
  .getItem("fecha")
  .substring(0, 10);
document.getElementById("ficha").value = localStorage.getItem("numero_ficha");

const id_informe = localStorage.getItem("id_informe");
const estado_solicitud = localStorage.getItem("estado_solicitud");
const estado_entrega = localStorage.getItem("estado_entrega");

const caja1 = document.getElementById("caja1");
const caja2 = document.getElementById("caja2");
const caja3 = document.getElementById("caja3");

// INTERRACCION DE LOS BOTONES
if (estado_solicitud === "aceptado") {
  caja1.style.display = "none";
  caja3.style.display = "none";
  caja2.style.display = "block";
} else {
  caja1.style.display = "block";
  caja2.style.display = "none";
  caja3.style.display = "none";
}

if (estado_entrega === "entregado") {
  caja2.style.display = "none";
  caja3.style.display = "block";
}

// MOSTRAR las herramientas de informe

const optionss = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id_informe: id_informe,
  }),
};
fetch(recurso, optionss)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar datos", data);
    } else {
      mostra(data.body);
    }
  })
  .catch((error) => console.log(error));

const mostra = (data) => {
  let body = "";

  for (let i = 0; i < data.length; i++) {
    body += `
       <div class="caja_herramienta">
                        
                        <p>1</p>
                        <div class="cont_nombre">
                            <p>${data[i].nombre_herramienta}</p>
                        </div>
                        <div class="cont_img">
                            <img src="${data[i].imagen}" alt="" class="imagen">
                        </div>
                        <div class="cont_numero">
                            <p>${data[i].cantidad_herramienta}</p>
                        </div>
    
                    </div>
  `;
  }
  document.getElementById("data").innerHTML = body;
};
