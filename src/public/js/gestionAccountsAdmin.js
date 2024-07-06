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


const btnAddNewAdmin = document.querySelector(".btn-add-subadmin");
const btn_change = document.querySelector(".btn-change");



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


// PASAR DE HOJA A HOJA
btnAddNewAdmin.addEventListener("click", () => {
    window.location.href = '/dash/crearSubAdmin';
});

btn_change.addEventListener("click", () =>{
    window.location.href = '/dash/trasnferirResponsabilidad';
});

const editarPerfil = () => {
    window.location.href = "/dash/editarPerfil";
};

const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const id_admin = sessionStorage.getItem("idUser");
const endpoint = "/api/accounts";
const recurso = url + endpoint;

// CERRAS SESION
const cerrarSesion = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("urlApi", "");
    sessionStorage.setItem("idUser", "");
    window.location.href = '/login';
};

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


// MOSTRAR llos todos los usuarios
fetch(recurso)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar datos", data);
    } else {
      mostrar(data.body);
    }
  })
  .catch((err) => console.log(err));

const mostrar = (data) => {
  let body = "";

  for (let i = 0; i < data.length; i++) {
    body += `

     <tr>
        <th scope="row">${data[i].id}</th>
        <td class="rol">${data[i].rol}</td>
        <td class="email">${data[i].email}</td>
        <td class="nombre"> ${data[i].nombre}</td>
        <td class="apellido">${data[i].apellido}</td>
        <td class="estado">${data[i].estado}</td>
        <td scope="btn">
            <button class="act-icon red btn-trash-open" onclick="eliminar(event);"> Inactivar </button>
        </td>
    </tr>
                      
    `;
  }
  document.getElementById("data").innerHTML = body;
};




// CONSEGUIR el id del usuario o subadmin, y mostrar el mensaje de aceptar o no
const eliminar = (event) => {
    const eliminar_id =event.target.parentElement.parentElement.children[0].innerText;
    console.log(eliminar_id);
  
    Swal.fire({
      title: "Estas seguro de inactivar la cuenta?",
      text: "¡No podrás revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Desactivar!",
    }).then((result) => {
      if (result.isConfirmed) {
  
        eliminarApi(eliminar_id);
        
        Swal.fire({
          title: "¡Exitoso!",
          text: "Este usuario esta desactivado.",
          icon: "success",
        });
      }
    });
  };
  
  // DESACTIVAR el usuario
  const eliminarApi = (idusu) => {
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_user: idusu,
        id_admin: id_admin,
      }),
    };
  
    fetch(recurso, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error == false) {
          Swal.fire(data.body);
          window.location.href = "/dash/gestionCuentasAdmin";
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

        const rol = row.querySelector('.rol').textContent.toLowerCase();
        const email = row.querySelector('.email').textContent.toLowerCase();
        const nombre = row.querySelector('.nombre').textContent.toLowerCase();
        const apellido = row.querySelector('.apellido').textContent.toLowerCase();
        const estado = row.querySelector('.estado').textContent.toLowerCase();

        if(rol.includes(query) || email.includes(query) || nombre.includes(query) || apellido.includes(query) || estado.includes(query)){
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