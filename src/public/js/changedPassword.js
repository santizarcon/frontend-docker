
document.querySelector(".btn-codigo").addEventListener("click", cerrarVentana);

let fondo = document.querySelector(".fondo2");
let ventana = document.querySelector(".ventana");

function cerrarVentana () {
    ventana.classList.add("eliminar");
    fondo.classList.add("eliminar");
}

