//CAPTURAMOS EL FORMULARIO POR SU ID
const formLoginEl = document.getElementById("formLogin");
const loginMessageEl = document.getElementById("loginMessage");

function mostrarConEfecto(selector) {
    if (window.jQuery) {
        $(selector).hide().fadeIn(180);
    }
}

function mostrarMensaje(tipo, texto) {
    if (!loginMessageEl) {
        alert(texto);
        return;
    }

    loginMessageEl.textContent = texto;
    loginMessageEl.className = `status-message ${tipo}`;
    mostrarConEfecto("#loginMessage");
}


function validarCredenciales(email, password){
    //CREDENCIALES SIMULADAS DE LA BASE DE DATOS
    let emailDB = "usuario@gmail.com";
    let passwordDB = "123456";

    if(email == emailDB && password == passwordDB){
        //AQUÍ REALIZAMOS LAS ACCIONES SI LAS CREDENCIALES SON VÁLIDAS
        mostrarMensaje("success", "Credenciales correctas. Redirigiendo al inicio...");
        //LOCATION PERMITE REDIRECCIONAR AL USUARIO
        setTimeout(function(){
            location.href = "./index.html";
        }, 900);
        
    }else {
        //AQUÍ REALIZAMOS LAS ACCIONES SI NO SE CUMPLEN LA VALIDACIÓN
        mostrarMensaje("error", "Credenciales incorrectas. Vuelve a intentar.");
    }

    
}

//AGREGAR UN EVENTO SUBMIT AL FORMULARIO (ENVIAR LOS DATOS)

formLoginEl.addEventListener("submit", function(event){

    //DETENEMOS EL EVENTO / ACCIONES POR DEFECTO DEL FORMULARIO
    event.preventDefault();

    //CAPTURAMOS LOS VALORES INGRESADOS POR EL USUARIO EN LOS INPUTS
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    validarCredenciales(email, password);

});
