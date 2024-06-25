
const url = "http://localhost:4000";

// DISEÑO PARA LA PAGINA
let btnAddFile = document.getElementById("btn-add-flie");
let btnAgregarFicha = document.getElementById("btn-agregar-ficha");
let formRegister = document.querySelector(".register");
let formFichas = document.querySelector(".ficha");

btnAddFile.addEventListener("click", () =>{
    formRegister.classList.add("hide")
    formFichas.classList.remove("hide")
})

btnAgregarFicha.addEventListener("click", () =>{
    formFichas.classList.add("hide")
    formRegister.classList.remove("hide")
})


// DATOS
const register = () =>{

    const names = document.getElementById("names").value;
    const lastNames = document.getElementById("last_names").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    // const input = document.querySelectorAll(".input");

    // Verificar que lo campos no esten vacios
    if (!names || !lastNames || !email || !password || !confirmPassword) {
        Swal.fire("Campos vacios!");
        return;
    }
    // Validar si la contraseña es correcta en los dos campos
    if (password === confirmPassword) {


    }else{
        Swal.fire("Las contraseñas no coinciden!");
        return;
    }

    sessionStorage.setItem("urlApi", url);
    const urlApi = sessionStorage.getItem("urlApi") + "/api/user";
    const options ={
        method:"POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email : email,
            password : password,
            nombre : names,
            apellido : lastNames
        })
    };
    fetch(urlApi, options)
    .then(res=>res.json())
    .then(data=>{
        if(data.error==false){
            window.location.href = '/dash/principalAdmin';
        }
    })
    .catch(err=>{
        console.log("Tenemos un problema", err);
    });

}


