//SIMULAMOS EL BALANCE DE LA BASE DE DATOS
let balanceInicial = 100_000;

//CAPTURAMOS EL ELEMENTO DEL DOM QUE MOSTRARÁ EL BALANCE

let balanceEl = document.getElementById("balance");

//LE ASIGNAMOS AL ELEMENTO CAPTURADO EL VALOR DE balanceInicial
balanceEl.innerText = balanceInicial.toLocaleString("es-CL");

//SIMULAR DATA DE REGISTROS DE TRANSACCIONES

let transacciones = [
    { id: 1, glosa: "Compra en línea", monto: 50_000 },
    { id: 2, glosa: "Transferencia recibida ", monto: 150_000 },
    { id: 3, glosa: "Depósito", monto: 100_000 },
];

//CAPTURAMOS LISTA DONDE SE AGREGARÁN LOS LI
const listaTransaccionesEl = document.getElementById("listaTransacciones");

let elementosLista = "";
if (listaTransaccionesEl) {
    //USAMOS UN CICLO / BUCLE
    for (const transaccion of transacciones) {
        let monto = transaccion.monto.toLocaleString("es-CL");

        elementosLista += `<li class="list-group-item list-group-item-action">${transaccion.glosa} - $${monto}</li>`;
    };

    listaTransaccionesEl.innerHTML = elementosLista;
}