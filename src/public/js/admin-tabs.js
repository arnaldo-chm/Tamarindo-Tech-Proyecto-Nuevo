document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tabNavButtons = document.querySelectorAll('.tab-nav .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const sidebarLinks = document.querySelectorAll('.menu-barra-lateral a');
    const btnAgregar = document.querySelector('.btn-agregar-contenido');

    // Función para cambiar de pestaña
    function activateTab(tabId) {
        // Actualizar tabs principales
        tabNavButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        
        // Actualizar contenido
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
        
        // Actualizar barra lateral
        sidebarLinks.forEach(link => {
            link.classList.toggle('activo', link.dataset.tab === tabId);
        });
        
        // Mostrar/ocultar botón "Agregar Noticia"
        if (btnAgregar) {
            btnAgregar.style.display = tabId === 'noticias' ? 'block' : 'none';
        }
    }

    // Event listeners para tabs principales
    tabNavButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activateTab(btn.dataset.tab);
        });
    });

    // Event listeners para barra lateral
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            activateTab(link.dataset.tab);
        });
    });

    // Activar pestaña inicial desde URL hash o por defecto
    const hash = window.location.hash.substring(1);
    const defaultTab = 'noticias';
    const initialTab = hash && document.querySelector(`.tab-btn[data-tab="${hash}"]`) ? hash : defaultTab;
    activateTab(initialTab);
});

