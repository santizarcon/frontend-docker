const container_loading = document.getElementById("container_loading");

// const url = "https://tool-inventory.cleverapps.io";


const logueo = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url = document.getElementById("url").value;

  if (!email || !password) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  sessionStorage.setItem("urlApi", url);
  const urlApi = sessionStorage.getItem("urlApi") + "/api/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  fetch(urlApi, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error == true) {
        Swal.fire({
          icon: "error",
          title: "Algun campo no esta correcto",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {

        // Comprobar si la cuenta no esta desactivada
        if (data.body.info[0].estado == "inactivo") {

          Swal.fire({
            title: "Quieres recuperar tu cuenta?",
            text: "Estimado usuario, hemos recibido una solicitud de eliminación de tu cuenta por parte del administrador. Si deseas recuperar tu cuenta y conservar tus datos, por favor haz clic en el botón de recuperación a continuación. Si consideras que esta eliminación fue un error o prefieres seguir adelante con el proceso, por favor selecciona la opción de cancelar. Estamos aquí para ayudarte en cualquier decisión que tomes. ¡Gracias!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Recuperar",
          }).then((result) => {
            if (result.isConfirmed) {
              activarCuenta(data.body.info[0].email);
              Swal.fire({
                title: "¡Exitoso!",
                text: "Tu cuenta esta activa otra vez.",
                icon: "success",
              });
              
            }
          });


        } else {

          sessionStorage.setItem("token", data.body.token);
          sessionStorage.setItem("idUser", data.body.info[0].id);

          container_loading.style.display = "block";

          // Comprobar si es user o admin
          if (data.body.info[0].rol) {

            setTimeout(function () {
              window.location.href = "/dash/principalAdmin";
              container_loading.style.display = "none";
            }, 2000);

          } else {

            setTimeout(function () {
              window.location.href = "/dash/inventarioUser";
              container_loading.style.display = "none";
            }, 2000);

          }

        }

      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};


const url = sessionStorage.getItem("urlApi");
const endpoint = "/api/user";
const recurso = url + endpoint;

// Activar la cuenta
const activarCuenta = (correo) => {

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: correo,
    }),
  };

  fetch(recurso, options)
    .then((res) => res.json())
    .then((data) => {
      
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
}