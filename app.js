async function cargarBaseDatos() {
    const response = await fetch('database.json');
    const data = await response.json();
    return data.rutinas;
}
// Función para calcular km automáticamente según el Pace Profile del atleta seleccionado...