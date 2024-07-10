let fondo = document.querySelector(".fondo2");
let ventana = document.querySelector(".ventana");

const container_loading = document.getElementById("container_loading");

function cerrarVentana() {
  ventana.classList.add("eliminar");
  fondo.classList.add("eliminar");
}

// Consumo
// Funcion flecha para verificar el otp
const checkOTP = () => {
  const otp = document.getElementById("codigo").value;
  if (!otp) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  const urlApi = sessionStorage.getItem("urlApi") + "/api/oauthOTP";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      otp: otp,
    }),
  };
  fetch(urlApi, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error == true) {
        Swal.fire({
          icon: "question",
          title: "El código OTP no es válido o ha caducado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        cerrarVentana();
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};

// Funcion flecha para enviar de nuevo el codigo otp
const againOTP = () => {
  const email = sessionStorage.getItem("email");
  const urlApi = sessionStorage.getItem("urlApi") + "/api/sendOTP";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };
  fetch(urlApi, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error == true) {
        Swal.fire({
          icon: "error",
          title: "Correo no existe",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Codigo otp enviado nuevamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};

// Funcion flecha para recuperar la contraseña
const recoverPassword = () => {
  const email = sessionStorage.getItem("email");
  const password = document.getElementById("new-password").value;
  const passwordConfirm = document.getElementById("again-new-password").value;
  if (!password || !passwordConfirm) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (password != passwordConfirm) {
    Swal.fire({
      icon: "warning",
      title: "Contraseñas no coinciden!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  const urlApi = sessionStorage.getItem("urlApi") + "/api/recoverPassword";
  const options = {
    method: "PUT",
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
          title: "Hubo un error al cambiar su contraseña, intente nuevamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        sessionStorage.setItem("email", "");
        container_loading.style.display = "block";
        setTimeout(function () {
          window.location.href = "/login";
          container_loading.style.display = "none";
        }, 2000);
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
