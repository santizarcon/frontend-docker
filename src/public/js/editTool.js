const url = "http://localhost:4000/api/tool";

// Datos traidos de TABLETOOLS.JS

id_tool = localStorage.getItem("editNameTool");

document.getElementById("name_tool").value =
  localStorage.getItem("editNameTool");

document.getElementById("descripcion_tool").value =
  localStorage.getItem("editDescripcion");

document.getElementById("amount_available").value = localStorage.getItem(
  "editAmountAvailable"
);

document.getElementById("amount_total").value =
  localStorage.getItem("editAmountTotal");

document.getElementById("reference").value =
  localStorage.getItem("editReference");

const modificar = () => {
  const name_tool = document.getElementById("name_tool").value;
  const descripcion_tool = document.getElementById("descripcion_tool").value;
  const amount_available = document.getElementById("amount_available").value;
  const amount_total = document.getElementById("amount_total").value;
  const editReference = document.getElementById("reference").value;
  const id_admin = 1;

  // const token = sessionStorage.getItem("token");
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id_tool,
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
