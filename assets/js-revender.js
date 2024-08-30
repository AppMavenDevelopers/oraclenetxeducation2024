// 1. Bloquear teclas específicas, como F12 y combinaciones comunes para inspeccionar elementos
document.addEventListener('keydown', function(event) {
    if (
        event.key === 'F12' ||  // Bloquear F12
        (event.ctrlKey && event.shiftKey && event.key === 'I') || // Ctrl+Shift+I
        (event.ctrlKey && event.shiftKey && event.key === 'J') || // Ctrl+Shift+J
        (event.ctrlKey && event.key === 'U') || // Ctrl+U
        (event.ctrlKey && event.key === 'C') || // Ctrl+C
        (event.ctrlKey && event.key === 'V') || // Ctrl+V
        (event.ctrlKey && event.key === 'X') || // Ctrl+X
        (event.ctrlKey && event.key === 'A')    // Ctrl+A
    ) {
        event.preventDefault(); // Evitar la acción predeterminada
        return false;           // Detener la propagación del evento
    }
});

// 2. Deshabilitar el clic derecho para prevenir el menú contextual
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Evita el clic derecho
});

// 3. Deshabilitar copiar, pegar, y cortar
document.addEventListener('copy', function(event) {
    event.preventDefault(); // Evita copiar
});

document.addEventListener('paste', function(event) {
    event.preventDefault(); // Evita pegar
});

document.addEventListener('cut', function(event) {
    event.preventDefault(); // Evita cortar
});

// 4. Bloquear el arrastre de texto o elementos
document.addEventListener('dragstart', function(event) {
    event.preventDefault(); // Evita arrastrar elementos
});

// 5. Detectar si la consola de desarrollador está abierta (técnica básica)
(function() {
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            throw new Error("¡No intentes hackear!");
        }
    });

    setInterval(function() {
        console.log(element);
    }, 1000);
})();

// 6. Ofuscación básica de funciones críticas
(function() {
    function prevenirInspeccion() {
        document.addEventListener('keydown', function(event) {
            if (event.key === 'F12') {
                event.preventDefault();
            }
        });
    }

    // Ofuscación simple de nombres de funciones
    const ofuscar = prevenirInspeccion.toString().replace(/prevenirInspeccion/g, 'x' + Math.random().toString(36).substr(2, 9));
    eval(ofuscar);
})();

// 7. Monitoreo y bloqueo de intentos repetidos
let intentosBloqueados = 0;
document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && event.key === 'U')) {
        intentosBloqueados++;
        if (intentosBloqueados >= 3) {
            alert("Has intentado acceder a funciones restringidas varias veces. La página se cerrará.");
            window.close(); // Cierra la pestaña después de múltiples intentos
        }
    }
});

// 8. Advertencia sobre intentos de inspeccionar elementos
const preventInspection = function() {
    console.clear();
    console.warn("El uso de herramientas de desarrollo está restringido en esta página.");
};

setInterval(preventInspection, 1000);

// 9. Monitorizar cambios en la ventana (puede ser indicativo de uso de herramientas de inspección)
let lastHeight = window.innerHeight;
window.addEventListener('resize', function() {
    if (window.innerHeight < lastHeight) {
        alert("Hemos detectado un intento de inspeccionar elementos. Esto está restringido.");
        lastHeight = window.innerHeight;
    }
});
