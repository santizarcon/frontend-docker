const container_loading = document.getElementById("container_loading");

const url = "http://localhost:4000";

const logueo = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
        sessionStorage.setItem("token", data.body);

        container_loading.style.display = "block";

        setTimeout(function () {
          window.location.href = "/dash/principalAdmin";
          container_loading.style.display = "none";
        }, 2000);
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
