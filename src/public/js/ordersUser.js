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

// ESPECIAL DE ESTA HOJA



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


// PASAR de hoja a hoja
const editarPerfil = () => {
    window.location.href = "/dash/editarPerfilUser";
};

const mostrar = () => {
    window.location.href = '/dash/';
}


// CONSUMO

const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const id_user = sessionStorage.getItem("idUser");
const endpoint = "/api/userReport/";
const recurso = url + endpoint;


// CERRAS SESION
const cerrarSesion = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("urlApi", "");
    sessionStorage.setItem("idUser", "");
    window.location.href = '/login';
}

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
        'Authorization': `Bearer ${token}`
    }
}
fetch(urlComprobar, options)
    .then(res => res.json())
    .then(data => {
        if (data.error == true) {
            window.location.href = "/login"
        }
    });


// MOSTRAR los formualrios NUEVA HERRAMIENTA
const optionss = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: id_user,
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
         <div class="caja_reporte">
  
                          <div class="contenido_reporte">
                              <div class="content-between">
                                  <h5 class="contexto_title">Informe de Solicitud</h5>
                                  <small>${data[i].fecha.substring(0, 10)}</small>
                              </div>
                              <p class="contexto">${data[i].email} </p>
                          </div>
  
                          <div class="acciones">
                              <div class="mensaje">
                              ${data[i].estado_solicitud}
                              </div>
                              <div class="ojito">
                                  <i class='icono bx bxs-hide' onclick="viewDetails('${data[i].id}', '${data[i].fecha}', '${data[i].email}', '${data[i].nombre}', '${data[i].apellido}', '${data[i].numero_ficha}', '${data[i].estado_solicitud}', '${data[i].estado_entrega}');"></i>
                              </div>
                          </div>
  
                      </div>
    `;
    }
    document.getElementById("data").innerHTML = body;

};

// CAPTURAR datos y mostrarlos en el reporte
function viewDetails(
    id_informe,
    fecha,
    email,
    nombre,
    apellido,
    numero_ficha,
    estado_solicitud,
    estado_entrega
) {
    // Guardar los datos en localStorage
    localStorage.setItem("id_informe", id_informe);
    localStorage.setItem("fecha", fecha);
    localStorage.setItem("email", email);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("numero_ficha", numero_ficha);
    localStorage.setItem("estado_solicitud", estado_solicitud);
    localStorage.setItem("estado_entrega", estado_entrega);

    // Redirigir a la página de detalles
    window.location.href = "./verReporteUser";
}


// BARRA DE BUSQUEDA
const search = document.getElementById("search_invenatry");

search.addEventListener("keyup", e => {
    const query = e.target.value.toLowerCase();

    document.querySelectorAll('#data tr').forEach(row => {
        // const nombreHerramienta = row.querySelector('.n').textContent.toLowerCase();
        // const descripcionHerramienta = row.querySelector('.d').textContent.toLowerCase();
        if (nombreHerramienta.includes(query) || descripcionHerramienta.includes(query)) {
            row.classList.remove('filtro');
        } else {
            row.classList.add('filtro');
        }
    });
});

const style = document.createElement('style')
style.innerHTML = `
.filtro {
    display: none;
    }
`;

document.head.appendChild(style);