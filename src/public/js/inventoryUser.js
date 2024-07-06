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

// FUNCION DEL CARRITO
const carrito = document.getElementById("carrito");
const cont_carrito = document.getElementById("container_carrito");
const cierre_carrito = document.getElementById("icono_cerrar");
const eliminar_carrito = document.getElementById("icono_eliminar");

carrito.addEventListener("click", () =>{
  carrito.style.display = "none";
  cont_carrito.style.display = "block";
})

// Cerrar el carrito mientras esta en compras
cierre_carrito.addEventListener("click", () => {
  carrito.style.display = "block";
  cont_carrito.style.display = "none";
})

// Aparece un mensaje de si quiere eliminar este carrito y no pedir
eliminar_carrito.addEventListener("click", () => {
  carrito.style.display = "block";
  cont_carrito.style.display = "none";
})



// PASAR DE HOJA A HOJA
// const editarPerfil = () => {
//   window.location.href = "/dash/editarPerfil";
// };

// CONSUMO
const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
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

  
// MOSTRAR herramientas en el inventario
fetch(recurso)
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
   <li>
          <div class="card">
              <div class="cont-img">
                  <img src="${data[i].imagen}" alt="">
              </div>
              <div class="card-body">
                  <h5 class="card-title">${
                    data[i].nombre_herramienta.substring(0, 30)
                  }</h5>
                  <p class="card-text">${
                    data[i].descripcion.substring(0, 20) + "..."
                  }</p>
                  <div class="cont-btn">
                      <button class="btn" onclick="viewDetails('${
                        data[i].nombre_herramienta
                      }', '${data[i].imagen}' ,'${data[i].descripcion}', '${
    data[i].cantidad_disponible
  }', '${data[i].cantidad_total}', '${
    data[i].referencia
  }');">Ver dettales</button>
                  </div>
              </div>
          </div>
  </li>                  
  `;
}
document.getElementById("data").innerHTML = body;

};

// CAPTURAR datos y mandarlos a otra hoja, (showToolUser)
function viewDetails(
  nombre_herramienta,
  imagen,
  descripcion,
  cantidad_disponible,
  cantidad_total,
  referencia
) {
  // Guardar los datos en localStorage
  localStorage.setItem("nombreHerramienta", nombre_herramienta);
  localStorage.setItem("imagen", imagen);
  localStorage.setItem("descripcion", descripcion);
  localStorage.setItem("cantidadDisponible", cantidad_disponible);

  // Redirigir a la página de detalles
  window.location.href = "./VerHerramientaUser";
}


// BARRA DE BUSQUEDA
const search = document.getElementById("search_invenatry");

search.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase();

  document.querySelectorAll("#data li").forEach((row) => {
    const nombreHerramienta = row.querySelector(".card-title").textContent.toLowerCase();

    if (nombreHerramienta.includes(query)) {
      row.classList.remove("filtro");
    } else {
      row.classList.add("filtro");
    }
  });
});

const style = document.createElement("style");
style.innerHTML = `
.filtro {
    display: none;
    }
`;

document.head.appendChild(style);
