
const url = "http://localhost:4000";

const register = () =>{

    const names = document.getElementById("names").value;
    const lastNames = document.getElementById("last_names").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    // const input = document.querySelectorAll(".input");

    // Verificar que lo campos no esten vacios
    if (!names || !lastNames || !email || !password || !confirmPassword) {
        Swal.fire({
            icon: "warning",
            title: "Campos vacios!",
            showConfirmButton: false,
            timer: 1500
        });
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
            Swal.fire({
                icon: "success",
                title: "Haz sido registrado Exitosamente",
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(function() {
                window.location.href = '/login';
            }, 2000);
        }else{

            Swal.fire({
                icon: "error",
                title: "El correo ya existe, Intenta con otro",
                showConfirmButton: false,
                timer: 1500
            });

        }
        
    })
    .catch(err=>{
        console.log("Tenemos un problema", err);
    });

}


// const mostrarFichas = () =>{
//     const urlF = "http://localhost:4000/api/ficha";

//     fetch(urlF)
//     .then(res=>res.json())
//     .then(data=>{
//         if(data.error){
//             console.error("error al mostrar los datos", data);
//         }else{
//             mostrar(data.body[0]);
//         }
//     })
//     .catch(err=>{
//         console.log("Tenemos un problema", err);
//     });

//     const mostrar = (data) =>{
//         // const numeroFicha = document.getElementById("numero_ficha");
//         let body = '';
        
//         for (let i = 0; i < data.length; i++) {
//               body += `
//                 <option value="${data[i].numero_ficha}">${data[i].numero_ficha}</option>
//             `;

//         }
//         document.getElementById('numero_ficha').innerHTML = body;

//         // document.getElementById("numero_ficha") = numeroFicha;
       
//     }

// }




