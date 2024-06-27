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
// const volverEditarHerrmienta = document.querySelector(".btn-cerrar-salir");




// RESPONSIVE ELECCION DE CERRA SESION Y EDITA PERFIL
fotoUsuario2.addEventListener("click", () => {
    eleccionUsuario.classList.toggle("aparece");

})

// Ocultar el menú si se hace clic fuera de él RESPONSIVE
document.addEventListener("click", (event) => {
    const isClickInside = eleccionUsuario.contains(event.target) || fotoUsuario2.contains(event.target);
    // Comprueba si el elemento en el que se hizo clic (event.target) está contenido dentro del div (eleccion_usuario2 o fotoUsuario)
    // ||, si el clic ocurrió dentro de cualquiera de estos elementos, isClickInside será TRUE.
    //  contains, se usa para determinar si el elemento en el que se hizo clic (event.target) es un descendiente del div con la clase.

    if (!isClickInside) { // si es diferente a TRUE, significa que el clic no ocurrio dentro del div
        eleccionUsuario.classList.remove("aparece");
    }
});


// NORMAL ELECCION DE CERRA SESION Y EDITA PERFIL
fotoUsuario.addEventListener("click", () => {
    eleccionUsuario2.classList.toggle("apareceInicial");

})

// Ocultar el menú si se hace clic fuera de él NORMAL
document.addEventListener("click", (event) => {
    const isClickInside = eleccionUsuario2.contains(event.target) || fotoUsuario.contains(event.target);

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
    }
    else {
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
// cerrarSesion.addEventListener("click", () => {
//     window.location.href = 'index.html';
// })

// volverEditarHerrmienta.addEventListener("click", () => {
//     window.location.href = 'editarHerramientasAdmin.html';
// })

// editarPerfil.forEach(function (button) {
//     button.addEventListener("click", function () {
//         window.location.href = 'editarPerfilAdmin.html';
//     });
// });











const salir = () => {
window.location.href = "/dash/tablaHerramientas";
};

const url = "http://localhost:4000/api/tool";

// Datos traidos de TABLETOOLS.JS

id_tool = localStorage.getItem("EditIdTool");

document.getElementById("name_tool").value = localStorage.getItem("editNameTool");

document.getElementById("descripcion_tool").value = localStorage.getItem("editDescripcion");

document.getElementById("amount_available").value = localStorage.getItem("editAmountAvailable");

document.getElementById("amount_total").value = localStorage.getItem("editAmountTotal");

document.getElementById("reference").value = localStorage.getItem("editReference");

const modificar = () => {
  const id = id_tool;
  const name_tool = document.getElementById("name_tool").value;
  const descripcion_tool = document.getElementById("descripcion_tool").value;
  const amount_available = document.getElementById("amount_available").value;
  const amount_total = document.getElementById("amount_total").value;
  const reference = document.getElementById("reference").value;
  const id_admin = 1;
  console.log(id, name_tool,descripcion_tool, amount_available, amount_total, reference, id_admin  );

  // const token = sessionStorage.getItem("token");
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nombre_herramienta: name_tool,
      imagen: "",
      descripcion: descripcion_tool,
      cantidad_disponible: amount_available,
      cantidad_total: amount_total,
      referencia: reference,
      id_admin: id_admin,
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error == false) {
        Swal.fire({
          icon: "success",
          title: "¡Ha sido actualizado exitosamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "¡No se puedo actualizar!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};


