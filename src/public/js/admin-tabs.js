/**
 * admin-tabs.js - Controlador del sistema de pestañas
 * 
 * Funcionalidades:
 * - Cambio entre pestañas
 * - Almacenamiento del estado activo
 * - Soporte para URLs con hash
 */

document.addEventListener('DOMContentLoaded', function() {
    // Controlador para sistemas de pestañas
    const tabSystems = document.querySelectorAll('.admin-tabs, .config-container');
    
    tabSystems.forEach(system => {
        const tabs = system.querySelectorAll('.tab-btn, .config-tab');
        const tabContents = system.querySelectorAll('.tab-content, .config-section');
        
        // Función para activar una pestaña
        const activateTab = (tab) => {
            // Desactivar todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar la pestaña seleccionada
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const content = system.querySelector(`#${tabId}`);
            if (content) content.classList.add('active');
            
            // Actualizar URL si es el sistema principal
            if (system.classList.contains('admin-tabs')) {
                history.pushState(null, '', `#${tabId}`);
            }
        };
        
        // Event listeners para las pestañas
        tabs.forEach(tab => {
            tab.addEventListener('click', () => activateTab(tab));
        });
        
        // Activar pestaña desde URL hash
        if (system.classList.contains('admin-tabs')) {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const tabToActivate = system.querySelector(`.tab-btn[data-tab="${hash}"]`);
                if (tabToActivate) activateTab(tabToActivate);
            }
        }
    });
    
    // Botón "Nuevo" en pestañas
    const btnAgregar = document.querySelector('.btn-agregar');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para abrir un modal de creación
            console.log('Abrir formulario para nuevo elemento');
            // Ejemplo: mostrarModal('nuevo-elemento');
        });
    }
});