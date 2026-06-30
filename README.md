# Alky-Wallet

Alky-Wallet es una aplicación web estática que simula una billetera digital. Permite navegar por una landing page, iniciar sesión con credenciales de prueba, consultar un saldo inicial, realizar depósitos simulados, enviar dinero a contactos registrados y visualizar un historial de transacciones.

El proyecto fue desarrollado como entrega del Módulo 2 de Fundamentos del desarrollo Front-end.

## Características principales

- Interfaz responsive construida con Bootstrap 5.
- Página de inicio con presentación del producto y accesos rápidos.
- Login con validación de credenciales simuladas.
- Consulta de balance de cuenta.
- Depósito de dinero con validación de monto mínimo.
- Envío de dinero con selección de contacto, validación de saldo y confirmación previa.
- Agenda de contactos con búsqueda por nombre, alias, banco o CBU.
- Alta de nuevos contactos mediante modal.
- Historial de transacciones con ingresos y egresos diferenciados visualmente.
- Mensajes de estado para operaciones exitosas o errores.
- Estilos personalizados centralizados en CSS.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.8
- jQuery 3.7.1
- SVG para recursos visuales

## Estructura del proyecto

```text
.
├── index.html
├── login.html
├── deposit.html
├── sendmoney.html
├── transactions.html
├── assets
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── imagen1.svg
│   │   ├── imagen2.svg
│   │   └── imagen3.svg
│   └── js
│       ├── deposit.js
│       ├── login.js
│       ├── sendmoney.js
│       ├── transactions.js
│       └── transactions.fragments.js
└── README.md
```

## Funcionamiento

### Inicio

La página `index.html` funciona como pantalla principal del proyecto. Presenta la propuesta de Alky-Wallet y permite acceder al inicio de sesión o al historial de movimientos.

### Login

La página `login.html` valida las credenciales ingresadas contra datos simulados en `assets/js/login.js`.

Credenciales de prueba:

```text
Correo: usuario@gmail.com
Contraseña: 123456
```

Si los datos son correctos, se muestra un mensaje de éxito y la aplicación redirige al inicio. Si son incorrectos, se informa el error en pantalla.

### Depósitos

La página `deposit.html` muestra un saldo inicial simulado de `$100.000`. Desde el formulario se puede ingresar un monto a depositar.

Reglas aplicadas:

- El monto mínimo permitido es `$500`.
- Antes de completar la operación se solicita confirmación.
- Si el depósito es válido, el saldo visible se actualiza dinámicamente.
- La información se mantiene solo durante la sesión actual de la página.

### Envío de dinero

La página `sendmoney.html` permite simular transferencias a contactos.

Incluye:

- Saldo inicial simulado de `$100.000`.
- Contactos precargados.
- Buscador por nombre, alias, banco o CBU.
- Selector de contacto mediante radio button.
- Formulario para agregar nuevos contactos.
- Validación de monto mínimo.
- Validación de saldo disponible.
- Confirmación antes de enviar dinero.

Contactos iniciales:

```text
John Doe - john.doe - ABC Bank - CBU 123456789
Jane Smith - jane.smith - XYZ Bank - CBU 987654321
```

### Transacciones

La página `transactions.html` renderiza un listado de movimientos simulados desde `assets/js/transactions.fragments.js`.

Cada transacción muestra:

- Glosa o descripción.
- Fecha.
- Monto.
- Tipo de movimiento, diferenciando ingresos y egresos con estilos visuales.

## Cómo ejecutar el proyecto

Este proyecto no requiere instalación de dependencias ni proceso de compilación. Puede ejecutarse directamente en el navegador.

1. Clonar o descargar el repositorio.
2. Abrir el archivo `index.html` en el navegador.
3. Navegar entre las páginas desde el menú superior.

También puede ejecutarse con una extensión como Live Server en Visual Studio Code para tener recarga automática durante el desarrollo.

## Dependencias externas

El proyecto carga Bootstrap y jQuery desde CDN:

- Bootstrap CSS y JS
- jQuery

Por este motivo, se recomienda tener conexión a internet al abrir el proyecto para que los estilos, componentes interactivos y efectos se carguen correctamente.

## Consideraciones importantes

- La aplicación no utiliza backend ni base de datos real.
- Los saldos, contactos y transacciones son datos simulados en archivos JavaScript.
- Las operaciones no persisten al recargar la página.
- El login es demostrativo y no implementa autenticación real.
- Las confirmaciones usan el método nativo `confirm()` del navegador.

## Buenas prácticas aplicadas

- Separación de responsabilidades entre HTML, CSS y JavaScript.
- Uso de archivos JavaScript específicos para cada flujo.
- Validaciones de formularios desde HTML y JavaScript.
- Uso de nombres descriptivos para variables, funciones y archivos.
- Interfaz responsive mediante grilla y componentes de Bootstrap.
- Mensajes visuales para mejorar la experiencia del usuario.
- Uso de `DocumentFragment` en el historial de transacciones para optimizar el renderizado de listas.

## Mejoras futuras sugeridas

- Persistir datos con `localStorage` o una API.
- Implementar autenticación real.
- Unificar el saldo entre las distintas páginas.
- Registrar automáticamente depósitos y transferencias en el historial.
- Agregar edición y eliminación de contactos.
- Incorporar filtros por fecha o tipo de transacción.
- Sumar pruebas automatizadas para las funciones principales.
- Mejorar accesibilidad con validaciones anunciadas para lectores de pantalla.

## Autoría

Proyecto desarrollado para una entrega académica de Front-end.
