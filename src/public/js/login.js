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
    headers:{
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
        sessionStorage.setItem("token", data.body.token);
        // sessionStorage.setItem("idUser", data.body.info[0].id);

        container_loading.style.display = "block";

        // Cmprobar si es user o admin
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
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
