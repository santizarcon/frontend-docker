// CONSUMO
const url = document.getElementById("url").value;
sessionStorage.setItem("urlApi", url);

const token = sessionStorage.getItem("token");
const url2 = sessionStorage.getItem("urlApi");
const endpoint = "/api/user";
const recurso = url2 + endpoint;
// const endpoint = "https://tool-inventory.cleverapps.io/api/user";

const register = () => {
  const names = document.getElementById("names").value;
  const lastNames = document.getElementById("last_names").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;

  // Verificar que lo campos no esten vacios
  if (!names || !lastNames || !email || !password || !confirmPassword) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  // Validar que el correo
  const gmail = /^[^\s@]+@+gmail+\.com+$/;
  const sena = /^[^\s@]+@+soy\.sena\.edu+\.co+$/;
  const hotmail = /^[^\s@]+@+hotmail+\.com+$/;
  const texto = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/i;

  if (!gmail.test(email) && !sena.test(email) && !hotmail.test(email)) {
    Swal.fire("El correo NO cumple con los requisitos para ser valido!");
    return;
  }
  if (!texto.test(names) || !texto.test(lastNames)) {
    Swal.fire(
      "El campo nombre y apellido no puede contenter numeros o simbolos"
    );
    return;
  }

  // Validar si la contraseña es correcta en los dos campos
  if (password === confirmPassword) {
  } else {
    Swal.fire("Las contraseñas no coinciden!");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: email,
      password: password,
      nombre: names,
      apellido: lastNames,
    }),
  };
  fetch(recurso, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.error == false) {
        Swal.fire({
          icon: "success",
          title: "Haz sido registrado Exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(function () {
          window.location.href = "/login";
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "El correo ya existe, Intenta con otro",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
