// Variable global para almacenar la base de datos
let bovedaMaestra = [];

// 1. Cargar la base de datos JSON al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    fetch('./faro_bahia_master_db.json')
        .then(response => response.json())
        .then(data => {
            bovedaMaestra = data.rutinas;
            poblarSelectorRutinas();
        })
        .catch(error => console.error('Error cargando la Bóveda Maestra:', error));
});

// 2. Llenar el menú desplegable con las rutinas disponibles
function poblarSelectorRutinas() {
    const select = document.getElementById('rutinaSelect');
    select.innerHTML = '<option value="">-- Selecciona una rutina --</option>'; 
    
    bovedaMaestra.forEach(rutina => {
        let option = document.createElement('option');
        option.value = rutina.id;
        option.textContent = `[${rutina.categoria}] - ${rutina.nombre} (${rutina.kilometraje_base} KM)`;
        select.appendChild(option);
    });
}

// 3. Función para asignar la rutina al día seleccionado en el panel
function asignarRutina() {
    const diaId = document.getElementById('diaSelect').value;
    const rutinaId = document.getElementById('rutinaSelect').value;
    
    if (!rutinaId) {
        alert("Coach, por favor selecciona una rutina de la bóveda.");
        return;
    }
    
    const rutinaSeleccionada = bovedaMaestra.find(r => r.id === rutinaId);
    
    if(rutinaSeleccionada) {
        // Inyectar detalles en la tarjeta
        document.getElementById(`content-${diaId}`).innerHTML = `<strong>${rutinaSeleccionada.nombre}</strong><br><br>${rutinaSeleccionada.detalles}`;
        // Actualizar el kilometraje
        document.getElementById(`km-${diaId}`).textContent = `${rutinaSeleccionada.kilometraje_base} KM`;
    }
}