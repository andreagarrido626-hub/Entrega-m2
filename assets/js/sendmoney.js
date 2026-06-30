//SIMULAMOS LA CARGA DE UN BALANCE INICIAL
let balance = 100_000;

//CAPTURAMOS EL ELEMENTO DEL DOM EN CUAL QUEREMOS MOSTRAR EL BALANCE
const balanceEl = document.getElementById("balance");
const sendMessageEl = document.getElementById("sendMessage");
const contactosSugeridosEl = document.getElementById("contactosSugeridos");

function mostrarConEfecto(selector) {
    if (window.jQuery) {
        $(selector).hide().fadeIn(180);
    }
}

//LE ASIGNAMOS EL VALOR SIMULADO DE LA BASE DE DATOS
balanceEl.textContent = balance.toLocaleString("es-CL");

//SIMULAMOS LOS REGISTROS DE CONTACTO DEL CLIENTE

const contactos = [
    {
        id: 1,
        nombre: "John Doe",
        cbu: "123456789",
        alias: "john.doe",
        banco: "ABC Bank",
    },
    {
        id:2,
        nombre: "Jane Smith",
        cbu: "987654321",
        alias: "jane.smith",
        banco: "XYZ Bank",
    },
];

function mostrarMensajeTransferencia(tipo, texto) {
    if (!sendMessageEl) {
        alert(texto);
        return;
    }

    sendMessageEl.textContent = texto;
    sendMessageEl.className = `status-message ${tipo}`;
    mostrarConEfecto("#sendMessage");
}

function actualizarSugerencias() {
    if (!contactosSugeridosEl) {
        return;
    }

    contactosSugeridosEl.innerHTML = contactos.map(function(contacto){
        return `<option value="${contacto.nombre}">${contacto.alias} - ${contacto.banco}</option>`;
    }).join("");
}

//FUNCIÓN QUE SE VA A ENCARGAR DE CARGAR LOS CONTACTOS EN LA UL DEL DOM
function cargarContactos(listaContactos){

    let acumuladorLi = "";

    for (const contacto of listaContactos) {

        //DESECTRUCTURAR LAS PROPIEDADES DEL OBJETO
        let { id, nombre, cbu, alias, banco } = contacto;

        //AQUÍ VAMOS ACUMULANDO TANTOS LI COMO CONTACTOS TENGAMOS
        acumuladorLi += `
        <li class="list-group-item contact-item">
            <div class="contact-main">
            <input class="form-check-input me-1" type="radio" name="contacto" value="${cbu}" id="contacto${id}" required>

            <label class="form-check-label" for="contacto${id}">
                <span class="contact-name">${nombre}</span>
                <span class="contact-meta">CBU: ${cbu} | Alias: ${alias} | Banco: ${banco}</span>
            </label>
            </div>
        </li>
        `;
    };

    //AGREGAMOS LOS ELEMENTOS DE LISTA A LA UL DEL DOM
    document.getElementById("listaContactos").innerHTML = acumuladorLi || `<li class="empty-state">No hay contactos que coincidan con la búsqueda.</li>`;
    mostrarConEfecto("#listaContactos .list-group-item");
};

//FUNCIÓN INICIAL / PRINCIAL

function main(){
    cargarContactos(contactos);
    actualizarSugerencias();
};

main();

//LÓGICA BUSCAR CONTACTO CON FILTRO DE CONTACTOS

const buscarContactoEl = document.getElementById("buscarContacto");

//AGREGAMOS EL EVENTO INPUT AL ELEMENTO

buscarContactoEl.addEventListener("input", function(event){
    event.preventDefault();

    let textoBusqueda = buscarContactoEl.value;

    //DEJAMO EL TEXTO EL INPUT EN MINÚSCULAS
    textoBusqueda = textoBusqueda.toLowerCase();

    //FILTRAR LOS CONTACTOS QUE COINCIDAN POR EL TEXTO BUSCADO

    let contactosFiltrados = contactos.filter(function(contacto){
        //DESECTRUCTURAR LAS PROPIEDADES DEL OBJETO
        let {nombre, cbu, alias, banco } = contacto;

        nombre = nombre.toLowerCase();
        alias = alias.toLowerCase();
        banco = banco.toLowerCase();

        let reglaNombre = nombre.includes(textoBusqueda);
        let reglaAlias = alias.includes(textoBusqueda);
        let reglaCbu = cbu.includes(textoBusqueda);
        let reglaBanco = banco.includes(textoBusqueda);

        if(reglaNombre || reglaAlias || reglaCbu || reglaBanco){
            return contacto;
        }else{
            return false;
        }
    });

    //UNA VEZ FILTRADOS LOS CONTACTOS LOS ENVIAMOS A LA FUNCIÓN DE CARGAR CONTACTOS
    cargarContactos(contactosFiltrados);
});

//LÓGICA DE ENVIAR DINERO A UN USUARIO SELECCIONADO

const formSendMoneyEl = document.getElementById("formSendMoney");

//AGREGAMOS EL EVENTO SUBMIT

formSendMoneyEl.addEventListener("submit", function(event){

    //DEBEMOS PREVENIR LAS ACCIONES POR DEFECTO
    event.preventDefault();

    //CAPTURAMOS LA DATA DEL FORMULARIO
    let dataFormulario = new FormData(formSendMoneyEl);

    let monto = dataFormulario.get("monto");

    monto = Number(monto);

    if (monto < 500) {
        mostrarMensajeTransferencia("error", "El monto mínimo para transferir es $500.");
        return;
    }

    let cbuContacto = dataFormulario.get("contacto");

    if (!cbuContacto) {
        mostrarMensajeTransferencia("error", "Selecciona un contacto para continuar.");
        return;
    }

    //PREGUNTAMOS AL USUARIO SI ESTÁ SEGURO DE TRANSFERIR
    let confirmacion = confirm(`¿Está seguro de transferir la suma de: $ ${monto.toLocaleString("es-CL")}?`);

    if(!confirmacion){
        //EL RETURN DETIENE LA EJECUCIÓN DEL RESTO DE CÓDIGO
        return;
    }

    //VALIDAR SI EXISTE SALDO DISPONIBLE Y DESCONTAR DE SER POSIBLE

    if(balance >= monto){
        //EN ESTE CASO PUEDO TRANSFERIR
        balance = balance - monto;
        let textoMensaje = 
        `Se ha transferido correctamente la suma de: $ ${monto.toLocaleString("es-CL")} a la cuenta\nN° ${cbuContacto}.
        \nSu nuevo saldo es de: ${balance.toLocaleString("es-CL")}
        `;
        mostrarMensajeTransferencia("success", textoMensaje);

        //ACTUALIZAMOS EL BALANCE EN EL SPAN DEL DOM
        balanceEl.textContent = balance.toLocaleString("es-CL");

        //limpiamos el formulario
        formSendMoneyEl.reset();
        cargarContactos(contactos);

    }else{
        mostrarMensajeTransferencia("error", "No hay saldo suficiente para realizar esta transferencia.");
    }
});

const formContactoEl = document.getElementById("formContacto");

if (formContactoEl) {
    formContactoEl.addEventListener("submit", function(event){
        event.preventDefault();

        const nuevoContacto = {
            id: contactos.length + 1,
            nombre: document.getElementById("nuevoNombre").value.trim(),
            cbu: document.getElementById("nuevoCbu").value.trim(),
            alias: document.getElementById("nuevoAlias").value.trim(),
            banco: document.getElementById("nuevoBanco").value.trim(),
        };

        contactos.push(nuevoContacto);
        cargarContactos(contactos);
        actualizarSugerencias();
        formContactoEl.reset();

        const modal = bootstrap.Modal.getInstance(document.getElementById("contactModal"));
        modal.hide();
        mostrarMensajeTransferencia("success", "Contacto agregado correctamente.");
    });
}
