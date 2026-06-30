// SIMULAMOS EL BALANCE DE LA BASE DE DATOS
let balanceInicial = 100_000;

// CAPTURAMOS EL ELEMENTO DEL DOM QUE MOSTRARÁ EL BALANCE
let balanceEl = document.getElementById("balance");

if (balanceEl) {
    // LE ASIGNAMOS AL ELEMENTO CAPTURADO EL VALOR DE balanceInicial
    balanceEl.innerText = balanceInicial.toLocaleString("es-CL");
}

// SIMULAR DATA DE REGISTROS DE TRANSACCIONES
let transacciones = [
    { id: 1, glosa: "Compra en línea", monto: 50_000, ingreso: false, fecha: "26/06/2026" },
    { id: 2, glosa: "Transferencia recibida", monto: 150_000, ingreso: true, fecha: "25/06/2026" },
    { id: 3, glosa: "Depósito", monto: 100_000, ingreso: true, fecha: "24/06/2026" },
    { id: 4, glosa: "Compra Cyber Day", monto: 75_000, ingreso: false, fecha: "22/06/2026" },
];

function mostrarConEfecto(selector) {
    if (window.jQuery) {
        $(selector).hide().each(function(index){
            $(this).delay(index * 80).fadeIn(180);
        });
    }
}

// CAPTURAMOS LISTA DONDE SE AGREGARÁN LOS LI
const listaTransaccionesEl = document.getElementById("listaTransacciones");

if (listaTransaccionesEl) {
    // Usamos DocumentFragment para evitar reflows/repints múltiples
    const fragment = document.createDocumentFragment();

    for (const transaccion of transacciones) {
        const li = document.createElement("li");
        li.className = "list-group-item transaction-item";

        const monto = transaccion.monto.toLocaleString("es-CL");
        const signo = transaccion.ingreso ? "+" : "-";
        const claseMonto = transaccion.ingreso ? "amount-income" : "amount-expense";

        li.innerHTML = `
            <div class="transaction-main">
                <span class="transaction-title">${transaccion.glosa}</span>
                <span class="transaction-meta">${transaccion.fecha}</span>
            </div>
            <span class="${claseMonto}">${signo} $${monto}</span>
        `;

        fragment.appendChild(li);
    }

    // Limpiamos la lista actual (si existe contenido) y insertamos el fragmento de una sola vez
    listaTransaccionesEl.innerHTML = "";
    listaTransaccionesEl.appendChild(fragment);
    mostrarConEfecto("#listaTransacciones .list-group-item");
}
