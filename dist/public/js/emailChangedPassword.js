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

  sessionStorage.setItem("urlApi", url);
  const urlApi = sessionStorage.getItem("urlApi") + "/api/sendOTP";
  console.log(urlApi);
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
          title: "Correo no valido",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // console.log(data);
        // if (data.body.info[0].rol) {
        //   setTimeout(function () {
        //     window.location.href = "/";
        //   }, 2000);
        // } else {
        //   setTimeout(function () {
        //     window.location.href = "/dash/inventarioUser";
        //   }, 2000);
        // }
        console.log("malo");
      }
    })
    .catch((err) => {
      console.log("Tenemos un problema", err);
    });
};
