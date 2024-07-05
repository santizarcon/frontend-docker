const sendEmail = () => {
  const email = document.getElementById("email").value;
  const url = document.getElementById("url").value;

  if (!email) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacios!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  sessionStorage.setItem("email", email);
  sessionStorage.setItem("urlApi", url);
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
        setTimeout(function () {
          window.location.href = "/cambioContra";
        }, 2000);
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
