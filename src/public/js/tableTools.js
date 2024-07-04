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


// PASAR DE HOJA A HOJA con informacion
const pasar = (event) => {
  const fila = event.target.parentElement.parentElement;
  const idTool = fila.cells[0].innerText;
  const name_tool = fila.cells[1].innerText;
  const descripcion_tool = fila.cells[2].innerText;
  const amount_available = fila.cells[3].innerText;
  const amount_total = fila.cells[4].innerText;
  const reference = fila.cells[5].innerText;

  localStorage.setItem("EditIdTool", idTool);
  localStorage.setItem("editNameTool", name_tool);
  localStorage.setItem("editDescripcion", descripcion_tool);
  localStorage.setItem("editAmountAvailable", amount_available);
  localStorage.setItem("editAmountTotal", amount_total);
  localStorage.setItem("editReference", reference);

  window.location.href = "/dash/editarHerramienta";
};

const editarPerfil = () => {
  window.location.href = "/dash/editarPerfil";
};

// CONSUMO

const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const endpoint = "/api/tool/";
const recurso = url + endpoint;


// CERRAS SESION
const cerrarSesion = () => {
  sessionStorage.setItem("token", "");
  sessionStorage.setItem("urlApi", "");
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

// MOSTRAR las herramientas del inventario en una tabla
fetch(recurso)
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
  let body = "";

  for (let i = 0; i < data.length; i++) {
    body += `
    
            <tr>
                <th scope="row">${data[i].id}</th>
                    <td class="n">${data[i].nombre_herramienta}</td>
                    <td class="d">${data[i].descripcion.substring(0, 35) + '...'}</td>
                    <td>${data[i].cantidad_disponible}</td>
                    <td>${data[i].cantidad_total}</td>
                    <td>${data[i].referencia}</td>
                    <td scope="btn">
                        <button class="act-icon green btn-edit" onclick="pasar(event);">Editar</button>
                        <button class="act-icon red btn-trash-open" onclick="eliminar(event);">Eliminar</button>
                    </td>
            </tr>                        
    `;
  }
  document.getElementById("data").innerHTML = body;
};


// CONSEGUIR el id de la herramienta, y mostrar el mensaje de aceptar o no
const eliminar = (event) => {
  const eliminar_id =event.target.parentElement.parentElement.children[0].innerText;

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

// ELIMINAR la herramienta
const eliminarApi = (idusu) => {

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: idusu,
    }),
  };

  fetch(recurso, options)
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

// BARRA DE BUSQUEDA
const search = document.getElementById("search_invenatry");

search.addEventListener("keyup", e => {
    const query = e.target.value.toLowerCase();
    
    document.querySelectorAll('#data tr').forEach(row =>{
        const nombreHerramienta = row.querySelector('.n').textContent.toLowerCase();
        const descripcionHerramienta = row.querySelector('.d').textContent.toLowerCase();
        if(nombreHerramienta.includes(query) || descripcionHerramienta.includes(query)){
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