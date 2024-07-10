const menu_icon = document.getElementById("menu-icon");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const menu = document.querySelector(".menu");
const contenedorContenido = document.querySelector(".contenedor_contenido");
const barraUsuario = document.querySelector(".barra_usuario");
const inventoryList = document.querySelector(".inventory-list");

const fotoUsuario = document.querySelector(".foto_usuario");
const eleccionUsuario2 = document.querySelector(".eleccion_usuario2");

// DEL RESPONSIVE
const eleccionUsuario = document.querySelector(".eleccion_usuario");
const fotoUsuario2 = document.querySelector(".foto_usuario2");

//ESPECIAL DE ESTA HOJA

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

  // organizar lista cuando el menu esta cerrado
  inventoryList.classList.toggle("min-lista");

  // Para todos los span encontrados le agregamos la CALSE .oculto
  spans.forEach((span) => {
    span.classList.toggle("oculto");
  });
});

// PASAR DE HOJA A HOJA
const editarPerfil = () => {
  window.location.href = "/dash/editarPerfilUser";
};

const cancelar = () => {
  window.location.href = "/dash/inventarioUser";
};

// CONSUMO
const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const idUser = sessionStorage.getItem("idUser");
const endpoint = "/api/tool/";
const recurso = url + endpoint;

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

// MOSTRAR las fichas
const recur = url + "/api/ficha";
fetch(recur)
.then((res) => res.json())
.then((data) => {
  if (data.error) {
    console.error("error al mostrar datos", data);
  } else {
    mostrar(data.body);
  }
})
.catch((error) => console.log(error));

const mostrar = (data) => {
let body = "";

for (let i = 0; i < data.length; i++) {
  body += `
    <option value="${data[i].numero_ficha}" id="opcion_id">${data[i].numero_ficha}</option>   
  `;
}
document.getElementById("ficha").innerHTML = body;

};

// MOSTRAR el correo del usuario
const rec = sessionStorage.getItem("urlApi")  + "/api/userShow/";
const optio = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: idUser,
  }),
};
fetch(rec, optio)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar datos", data);
    } else {
      document.getElementById("names").value = data.body[0].email;
    }

  })
 


// MOSTRAR las herramientas a pedir
const solicitar = document.getElementById("solicitar");
const cart = sessionStorage.getItem("urlApi") + "/api/showCartTool";
const tool = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id_user: idUser,
  }),
};

fetch(cart, tool)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar datos", data);
    } else {
      cartTool(data.body);
    }
  })
  .catch((error) => console.log(error));

const cartTool = (data) => {
  let limit = false;
  let body = "";
  for (let i = 0; i < data.length; i++) {
    body += `
    <div class="caja_herramienta">
                    <p>${i + 1}</p>
                    <div class="cont_nombre">
                        <p>${data[i].nombre_herramienta}</p>
                    </div>
                    <div class="cont_img">
                        <div class="foto"><img src="${data[i].imagen
      }" alt="" class="toolImg"></div>
                    </div>
                    <div class="cont_numero">
                        <p>${data[i].cantidad_herramienta}</p>
                    </div>
                </div>                  
  `;
    if (data[i].cantidad_herramienta > data[i].cantidad_disponible) {
      limit = true;
    }
  }
  document.getElementById("cart").innerHTML = body;
  solicitar.addEventListener("click", () => {
    const fecha = document.getElementById("fecha").value;
    const ficha = document.getElementById("ficha").value;
    if (ficha === "" || fecha === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos vacios!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (data.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Debera agregar algo al carrito para continuar con la solicitud",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (limit) {
      Swal.fire({
        icon: "warning",
        title:
          "Hay una herramienta que supera la cantidad disponible, porfavor revisar y eliminarla del carrito para poder hacer la solicitud",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // CREAR el informe de solicitud
      const info = sessionStorage.getItem("urlApi") + "/api/reportRequest";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numero_ficha: ficha,
          fecha: fecha,
          id_user: idUser,
        }),
      };

      fetch(info, option)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("error al mostrar datos", data);
          } else {
            Swal.fire({
              icon: "success",
              title: "Se a creado el informe de solicitud con exito",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.href = "/dash/inventarioUser";
            }, 1500);
          }
        })
        .catch((error) => console.log(error));
    }
  });
};
