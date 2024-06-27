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

// Funcion de navegacion de botones
// const editarPerfil = document.getElementById("editar_perfil");
// const cerrarSesion = document.getElementById("cerrar_sesion");

// ESPECIAL DE ESTA HOJA

// VENTANA IMAGEN
const btnImg = document.querySelectorAll(".btn-img-open");
const ventanaImagenHerramienta = document.querySelector(
  ".ventana_imagen_herramienta"
);
const btnCerrarImg = document.getElementById("btn-close-img");

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

// NAVEGACION a otras paginas de html
// editarPerfil.addEventListener("click", () => {
//     window.location.href = 'editarPerfilAdmin.html';
// })

// cerrarSesion.addEventListener("click", () => {
//     window.location.href = 'index.html';
// })

const pasar = (event) => {
  const fila = event.target.parentElement.parentElement;
  console.log(fila);
  const idTool = fila.cells[0].innerText;
  const name_tool = fila.cells[1].innerText;
  const descripcion_tool = fila.cells[3].innerText;
  const amount_available = fila.cells[4].innerText;
  const amount_total = fila.cells[5].innerText;
  const reference = fila.cells[6].innerText;

  localStorage.setItem("idTool", idTool);
  localStorage.setItem("editNameTool", name_tool);
  localStorage.setItem("editDescripcion", descripcion_tool);
  localStorage.setItem("editAmountAvailable", amount_available);
  localStorage.setItem("editAmountTotal", amount_total);
  localStorage.setItem("editReference", reference);

  window.location.href = "/dash/editarHerramienta";
};

// ESPECIAL DE ESTA HOJA

// NAVEGACION a otras paginas de html
// editarPerfil.forEach(function (button) {
//     button.addEventListener("click", function () {
//         window.location.href = 'editarPerfilAdmin.html';
//     });
// });

// // VENTANA IMAGEN
// btnImg.forEach(function (button) {
//     button.addEventListener("click", function () {
//         ventanaImagenHerramienta.style.display = 'block';
//         // ventanaEliminarHerramienta.classList.add("open");
//     });
// });

// btnCerrarImg.addEventListener("click", function () {
//     ventanaImagenHerramienta.style.display = 'none';
// });

// CONSUMO

let url = "http://localhost:4000/api/tool";

// MOSTRAR
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar datos", data);
    } else {
      mostrar(data.body);
    }
  })
  .catch((error) => console.log(err));

const mostrar = (data) => {
  console.log(data);

  let body = "";

  for (let i = 0; i < data.length; i++) {
    body += `
    
            <tr>
                <th scope="row">${data[i].id}</th>
                    <td>${data[i].nombre_herramienta}</td>
                    <td scope="btn"> <button class="see-img btn-img-open"> <i class='bx bx-image'></i> </button> </td>
                    <td>${data[i].descripcion}</td>
                    <td>${data[i].cantidad_disponible}</td>
                    <td>${data[i].cantidad_total}</td>
                    <td>${data[i].referencia}</td>
                    <td scope="btn">
                        <button class="act-icon green btn-edit" onclick="pasar(event);">  </button>
                        <button class="act-icon red btn-trash-open" onclick="eliminar(event);">  </button>
                    </td>
            </tr>                        
    `;
  }

  document.getElementById("data").innerHTML = body;
};

// ELIMINAR

const eliminar = (event) => {
  const eliminar_id =
    event.target.parentElement.parentElement.children[0].innerText;
  console.log(eliminar_id);

  Swal.fire({
    title: "Estas seguro?",
    text: "¡No podrás revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarApi(eliminar_id);
      Swal.fire({
        title: "¡Borrado!",
        text: "Tu archivo ha sido eliminado.",
        icon: "success",
      });
    }
  });
};

const eliminarApi = (idusu) => {
  // const token = sessionStorage.getItem("token");
  // "x-access-token": token

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: idusu,
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error == false) {
        Swal.fire(data.body);
        window.location.href = "/dash/tablaHerramientas";
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
