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




// CONSUMO

const token = sessionStorage.getItem("token");
const url = sessionStorage.getItem("urlApi");
const endpoint = "/api/formNew";
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
        <div class="caja_reporte">
    
            <div class="contenido_reporte">
              <div class="content-between">
                <h5 class="contexto_title">Formulario de Nueva Herramienta</h5>
                <small>${data[i].fecha.substring(0, 10)}</small>
              </div>
              <p class="contexto"> Enviado por : ${data[i].email}</p>
        
            </div>
    
            <div class="acciones">
                    
              <div class="ojito">
                <i class='icono bx bxs-file-pdf green' onclick="reporte('${data[i].asunto}', '${data[i].cantidad}', '${data[i].descripcion}', '${data[i].email}', '${data[i].nombre}', '${data[i].apellido}');"></i>
              </div>
            </div>
    
        </div>
  `;
  }
  document.getElementById("data").innerHTML = body;

};

// CREAR reporte para NUEVA HERRAMIENTA
const reporte = (asunto, cantidad, descripcion, email, nombre, apellido) => {
  const reporte = new jsPDF();

  // Encabezado
  reporte.setFontSize(20);
  reporte.setFont("helvetica", "bold");
  reporte.text('Tool_Inventory - SENA', 105, 15, null, null, 'center');
  reporte.setLineWidth(1);
  reporte.line(10, 20, 200, 20);

  // Contenido
  let fila = 30;
  reporte.setFontSize(16);
  reporte.setTextColor(220, 53, 69); // Rojo
  reporte.text(10, fila, "Formulario Petición de Nueva Herramienta");

  fila += 10;
  reporte.setFontSize(12);
  reporte.setTextColor(0, 0, 0); // Negro
  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Enviado por:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, email);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Asunto:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, asunto);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Nombre:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, `${nombre} ${apellido}`);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Cantidad que requiere:");
  reporte.setFont("helvetica", "normal");
  reporte.text(70, fila, cantidad.toString());

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Descripción:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, descripcion);

  // Agregar pie de página con la fecha
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  reporte.line(10, 280, 200, 280);
  reporte.setFontSize(10);
  reporte.setFont("helvetica", "italic");
  reporte.text(`Fecha y hora de impresión: ${formattedDate} -- ${formattedTime}`, 10, 285);

  // Guardar el PDF
  reporte.save("FormularioNuevaHerramienta.pdf");
};



// MOSTRAR los formualrios DAÑO HERRAMIENTA
const recursos = url + "/api/formDemage";
fetch(recursos)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      console.error("error al mostrar datos", data);
    } else {
      mostrar2(data.body);
    }
  })
  .catch((error) => console.log(error));

const mostrar2 = (data) => {
  let body = "";

  for (let i = 0; i < data.length; i++) {
    body += `
        <div class="caja_reporte">
    
            <div class="contenido_reporte">
              <div class="content-between">
                <h5 class="contexto_title">Formulario Daño Herramienta</h5>
                <small>${data[i].fecha.substring(0, 10)}</small>
              </div>
              <p class="contexto"> Enviado por : ${data[i].email}</p>
            </div>
    
            <div class="acciones">
                    
              <div class="ojito">
                <i class='icono bx bxs-file-pdf' onclick="crearReporte('${data[i].asunto}', '${data[i].cantidad}', '${data[i].descripcion}', '${data[i].email}', '${data[i].nombre}', '${data[i].apellido}','${data[i].nombre_herramienta}');"></i>
              </div>
            </div>
    
        </div>
  `;
  }
  document.getElementById("data2").innerHTML = body;

};

// <p class="contexto"> ${data[i].asunto}</p> 

// CREAR reporte2 para DAÑO HERRAMIENTA
const crearReporte = (asunto, cantidad, descripcion, email, nombre, apellido, nombre_herramienta) => {
  const reporte = new jsPDF();

  // Encabezado
  reporte.setFontSize(20);
  reporte.setFont("helvetica", "bold");
  reporte.text('Tool_Inventory - SENA', 105, 15, null, null, 'center');
  reporte.setLineWidth(1);
  reporte.line(10, 20, 200, 20);

  // Contenido
  let fila = 30;
  reporte.setFontSize(16);
  reporte.setTextColor(220, 53, 69); // Rojo
  reporte.text(10, fila, "Formulario Daño de Herramienta");

  fila += 10;
  reporte.setFontSize(12);
  reporte.setTextColor(0, 0, 0); // Negro
  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Enviado por:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, email);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Asunto:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, asunto);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Nombre:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, `${nombre} ${apellido}`);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Herramienta:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, nombre_herramienta);

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Cantidad rotas:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, cantidad.toString());

  reporte.setFont("helvetica", "bold");
  reporte.text(10, (fila += 10), "Descripción:");
  reporte.setFont("helvetica", "normal");
  reporte.text(50, fila, descripcion);

  // Agregar pie de página con la fecha
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const formattedTime = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  });

  reporte.line(10, 280, 200, 280);
  reporte.setFontSize(10);
  reporte.setFont("helvetica", "italic");
  reporte.text(`Fecha y hora de impresión: ${formattedDate} -- ${formattedTime}`, 10, 285);

  // Guardar el PDF
  reporte.save("FormularioDañoHerramienta.pdf");
};




// MOSTRAR todos lo REPORTE de daño herramienta PDF
document.getElementById('generatePdfBtn').addEventListener('click', function () {
  fetch(recursos)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        console.error("error al mostrar datos", data);
      } else {
        generatePdfBtn(data.body);
      }
    })
    .catch((error) => console.log(error));
});

const generatePdfBtn = (data) => {
  // Crear una instancia de jsPDF
  const doc = new jsPDF();

  // Agregar encabezado
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Tool_Inventory - SENA', 105, 10, null, null, 'center');
  doc.setFont("helvetica", "normal");
  doc.text('Reporte Daños Herramientas:', 14, 22);


  // Crear la estructura de datos para la tabla
  const tableData = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    tableData.push([
      item.fecha.substring(0, 10),
      item.email,
      `${item.nombre} ${item.apellido}`,
      item.asunto,
      `${item.descripcion}`,
      `${item.nombre_herramienta} (CANTIDAD: ${item.cantidad})`
    ]);
  }


  // Configurar posición y dimensiones de la tabla
  doc.autoTable({
    startY: 30, // Posición inicial de la tabla
    head: [['Fecha', 'Enviado por', 'Instructor', 'Asunto', 'Descripcion', 'Herramienta']], // Encabezados de las columnas
    body: tableData, // Datos de la tabla
    headStyles: { fillColor: [255, 182, 193] }, // Color del encabezado
    didDrawPage: function (data) {
      // Agregar pie de página con la fecha
      const formattedDate = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const formattedTime = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Fecha y hora de impresión: ${formattedDate} -- ${formattedTime}`, 10, doc.internal.pageSize.height - 10);
    }
  });

  // Guardar el PDF
  doc.save('ReporteDañoHerramientas.pdf');

};


// BARRA DE BUSQUEDA
const search = document.getElementById("search_invenatry");

search.addEventListener("keyup", e => {
  const query = e.target.value.toLowerCase();

  document.querySelectorAll('#data .caja_reporte').forEach(row => {

    const title = row.querySelector('.contexto_title').textContent.toLowerCase();
    const contexto = row.querySelector('.contexto').textContent.toLowerCase();

    if (title.includes(query) || contexto.includes(query)) {
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