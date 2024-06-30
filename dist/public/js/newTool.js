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
// const salirAgregarHerramienta = document.querySelector(".btn-cerrar-salir");

// ESPECIAL DE ESTA HOJA





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


// salirAgregarHerramienta.addEventListener("click", () => {
//     window.location.href = 'editarHerramientasAdmin.html';
// });

// editarPerfil.forEach(function (button) {
//     button.addEventListener("click", function () {
//         window.location.href = 'editarPerfilAdmin.html';
//     });
// });



// CERRAS SESION
const cerrarSesion = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("urlBuho", "");
    window.location.href = '/login';
}

// PASAR DE HOJA A HOJA
const salir = () => {
    window.location.href = "/dash/tablaHerramientas";
};


// CONSUMO
const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const endpoint = "/api/tool";
const recurso = url + endpoint;


// VERIFICAR INGRESO
const urlComprobar = url + "/api/oauth";

if (token == "" || token == null) {
  window.location.href = "/login"
};
if (url == "" || url == null) {
  window.location.href = "/login"
};

const options = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
     'Authorization' : `Bearer ${token}`
  }
}
fetch(urlComprobar, options)
  .then(res => res.json())
  .then(data => {
    if (data.error == true) {
      window.location.href = "/login"
    }
  });

// CREAR una nueva herramienta
const crear = () =>{

    const name_tool = document.getElementById("name_tool").value;
    const description = document.getElementById("description").value;
    const amount_total = document.getElementById("amount_total").value;
    const reference = document.getElementById("reference").value;
    const idAdmin = 1;


    // Verificar que lo campos no esten vacios
    if (!name_tool || !description || !amount_total || !reference) {
        Swal.fire({
            icon: "warning",
            title: "Campos vacios!",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    const options ={
        method:"POST",
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre_herramienta : name_tool,
            imagen : "",
            descripcion : description,
            cantidad_total : amount_total,
            referencia : reference,
            id_admin : idAdmin,
        })
    };
    fetch(recurso, options)
    .then(res=>res.json())
    .then(data=>{
        if(data.error==false){
            Swal.fire({
                icon: "success",
                title: "Se ha creado una nueva herramienta",
                showConfirmButton: false,
                timer: 1500
            });
      
        }else{

            Swal.fire({
                icon: "error",
                title: "No se pudo crear",
                showConfirmButton: false,
                timer: 1500
            });

        }
        
    })
    .catch(err=>{
        console.log("Tenemos un problema", err);
    });

}