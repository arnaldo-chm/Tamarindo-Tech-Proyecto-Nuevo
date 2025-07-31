/**
 * admin-contenido.js - Gestión de contenido para Noticias y Emprendimientos
 */

document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para Noticias
    const noticiasEjemplo = [
        {
            id: 1,
            titulo: 'Inauguración del nuevo parque tecnológico',
            autor: 'Departamento de Comunicaciones',
            fecha: '15/11/2023',
            estado: 'publicado',
            categoria: 'Noticias',
            imagen: '/img/NoticiaEjm.png'
        },
        {
            id: 2,
            titulo: 'Mantenimiento programado del sistema',
            autor: 'Equipo de TI',
            fecha: '10/11/2023',
            estado: 'publicado',
            categoria: 'Anuncios',
            imagen: '/img/NoticiaEjm.png'
        }
    ];

    // Datos de ejemplo para Emprendimientos
    const emprendimientosEjemplo = [
        {
            id: 101,
            titulo: 'Artesanías Locales',
            emprendedor: 'Ana Rodríguez',
            fecha: '05/11/2023',
            estado: 'pendiente',
            categoria: 'Artesanías',
            imagen: '/img/NoticiaEjm.png'
        },
        {
            id: 102,
            titulo: 'Café Orgánico',
            emprendedor: 'Carlos Méndez',
            fecha: '28/10/2023',
            estado: 'aprobado',
            categoria: 'Alimentos',
            imagen: '/img/NoticiaEjm.png'
        },
        {
            id: 103,
            titulo: 'Taller Mecánico',
            emprendedor: 'Luis Fernández',
            fecha: '15/10/2023',
            estado: 'rechazado',
            categoria: 'Servicios',
            imagen: '/img/NoticiaEjm.png',
            motivoRechazo: 'Documentación incompleta'
        }
    ];

    // Elementos del DOM
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const btnAgregar = document.querySelector('.btn-agregar-contenido');

    // Inicialización
    cargarNoticias(noticiasEjemplo);
    cargarEmprendimientos(emprendimientosEjemplo);
    setupEventListeners();

    // Cargar noticias en el grid
    function cargarNoticias(noticias) {
        const gridNoticias = document.querySelector('#noticias .cuadricula-contenido');
        if (!gridNoticias) return;
        
        gridNoticias.innerHTML = '';
        
        noticias.forEach(noticia => {
            const card = crearTarjetaNoticia(noticia);
            gridNoticias.appendChild(card);
        });
    }

    // Cargar emprendimientos en el grid
    function cargarEmprendimientos(emprendimientos) {
        const gridEmprendimientos = document.querySelector('#emprendimientos .cuadricula-contenido');
        if (!gridEmprendimientos) return;
        
        gridEmprendimientos.innerHTML = '';
        
        emprendimientos.forEach(emprendimiento => {
            const card = crearTarjetaEmprendimiento(emprendimiento);
            gridEmprendimientos.appendChild(card);
        });
    }

    // Crear tarjeta de noticia (simple)
    function crearTarjetaNoticia(noticia) {
        const card = document.createElement('div');
        card.className = 'tarjeta-simple';
        card.dataset.id = noticia.id;
        card.dataset.categoria = noticia.categoria.toLowerCase();

        card.innerHTML = `
            <div class="encabezado-tarjeta">
                <h4>${noticia.titulo}</h4>
                <span class="fecha">${noticia.fecha}</span>
            </div>
            <div class="imagen-tarjeta">
                <img src="${noticia.imagen}" alt="${noticia.titulo}">
            </div>
            <div class="info-tarjeta">
                <p><strong>Autor:</strong> ${noticia.autor}</p>
                <p><strong>Categoría:</strong> ${noticia.categoria}</p>
                <p><strong>Estado:</strong> ${formatEstado(noticia.estado)}</p>
            </div>
            <div class="acciones-tarjeta">
                <button class="btn-editar" data-id="${noticia.id}">Editar</button>
                <button class="btn-eliminar" data-id="${noticia.id}">Eliminar</button>
            </div>
        `;
        
        return card;
    }

    // Crear tarjeta de emprendimiento (con aprobación/rechazo)
    function crearTarjetaEmprendimiento(emprendimiento) {
        const card = document.createElement('div');
        card.className = 'tarjeta-emprendimiento';
        card.dataset.id = emprendimiento.id;
        card.dataset.estado = emprendimiento.estado;
        card.dataset.categoria = emprendimiento.categoria.toLowerCase();

        // Mostrar motivo de rechazo si existe
        const motivoRechazo = emprendimiento.motivoRechazo ? 
            `<div class="motivo-rechazo"><strong>Motivo:</strong> ${emprendimiento.motivoRechazo}</div>` : '';

        // Determinar texto de fecha según estado
        const fechaTexto = emprendimiento.estado === 'aprobado' ? 'Aprobado' : 
                          emprendimiento.estado === 'rechazado' ? 'Rechazado' : 'Solicitado';

        card.innerHTML = `
            <div class="encabezado-tarjeta">
                <h4>${emprendimiento.titulo}</h4>
                <span class="estado ${emprendimiento.estado}">${formatEstado(emprendimiento.estado)}</span>
            </div>
            <div class="imagen-tarjeta">
                <img src="${emprendimiento.imagen}" alt="${emprendimiento.titulo}">
            </div>
            <div class="info-tarjeta">
                <p><strong>Emprendedor:</strong> ${emprendimiento.emprendedor}</p>
                <p><strong>Categoría:</strong> ${emprendimiento.categoria}</p>
                <p><strong>${fechaTexto}:</strong> ${emprendimiento.fecha}</p>
                ${motivoRechazo}
            </div>
            <div class="acciones-tarjeta">
                ${emprendimiento.estado === 'pendiente' ? `
                <button class="btn-aprobar" data-id="${emprendimiento.id}">Aprobar</button>
                <button class="btn-rechazar" data-id="${emprendimiento.id}">Rechazar</button>
                ` : ''}
                <button class="btn-detalles" data-id="${emprendimiento.id}">Detalles</button>
            </div>
        `;
        
        return card;
    }

    // Formatear estado para mostrar
    function formatEstado(estado) {
        const estados = {
            'pendiente': 'Pendiente',
            'aprobado': 'Aprobado',
            'rechazado': 'Rechazado',
            'publicado': 'Publicado'
        };
        return estados[estado] || estado;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Manejo de pestañas
        tabs.forEach(tab => {
            tab.addEventListener('click', cambiarPestaña);
        });

        // Filtros (se aplican a la pestaña activa)
        document.querySelectorAll('.filtro-select').forEach(select => {
            select.addEventListener('change', aplicarFiltros);
        });

        document.querySelectorAll('.busqueda-input').forEach(input => {
            input.addEventListener('input', aplicarFiltros);
        });

        // Botón agregar
        if (btnAgregar) {
            btnAgregar.addEventListener('click', mostrarFormularioNoticia);
        }

        // Delegación de eventos para los botones de las tarjetas
        document.querySelectorAll('.cuadricula-contenido').forEach(grid => {
            grid.addEventListener('click', manejarAccionesTarjetas);
        });
    }

    // Cambiar entre pestañas
    function cambiarPestaña(e) {
        const tabId = e.target.getAttribute('data-tab');
        
        // Actualizar pestañas activas
        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        // Actualizar contenido visible
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }

    // Aplicar filtros a la pestaña activa
function aplicarFiltros() {
    const tabActive = document.querySelector('.tab-content.active');
    if (!tabActive) return;
    
    const filtroSelect = tabActive.querySelector('.filtro-select');
    const busquedaInput = tabActive.querySelector('.busqueda-input');
    
    const filtroValor = filtroSelect?.value.toLowerCase() || '';
    const busqueda = busquedaInput?.value.toLowerCase() || '';
    
    const cards = tabActive.querySelectorAll('.tarjeta-simple, .tarjeta-emprendimiento');
    
    cards.forEach(card => {
        // Para emprendimientos, filtramos por estado
        if (tabActive.id === 'emprendimientos') {
            const cardEstado = card.dataset.estado.toLowerCase();
            const cardCategoria = card.dataset.categoria.toLowerCase();
            const cardTitulo = card.querySelector('h4').textContent.toLowerCase();
            const cardInfo = card.querySelector('.info-tarjeta').textContent.toLowerCase();
            
            // Filtro por estado (si se ha seleccionado uno específico)
            const cumpleEstado = filtroValor === '' || filtroValor === 'todos los estados' || 
                                cardEstado === filtroValor;
            
            // Filtro por búsqueda
            const cumpleBusqueda = busqueda === '' || 
                cardTitulo.includes(busqueda) || 
                cardInfo.includes(busqueda);
            
            card.style.display = (cumpleEstado && cumpleBusqueda) ? 'block' : 'none';
        } 
        // Para otras pestañas (noticias, etc.) filtramos por categoría
        else {
            const cardCategoria = card.dataset.categoria.toLowerCase();
            const cardTitulo = card.querySelector('h4').textContent.toLowerCase();
            const cardInfo = card.querySelector('.info-tarjeta').textContent.toLowerCase();
            
            const cumpleCategoria = filtroValor === '' || 
                                  filtroValor === 'todas las categorías' || 
                                  cardCategoria.includes(filtroValor);
            
            const cumpleBusqueda = busqueda === '' || 
                cardTitulo.includes(busqueda) || 
                cardInfo.includes(busqueda);
            
            card.style.display = (cumpleCategoria && cumpleBusqueda) ? 'block' : 'none';
        }
    });
}

    // Manejar acciones en las tarjetas
    function manejarAccionesTarjetas(e) {
        const card = e.target.closest('.tarjeta-simple, .tarjeta-emprendimiento');
        if (!card) return;
        
        const id = card.dataset.id;
        const tipo = card.classList.contains('tarjeta-simple') ? 'noticia' : 'emprendimiento';

        if (e.target.classList.contains('btn-aprobar')) {
            aprobarEmprendimiento(id);
        } else if (e.target.classList.contains('btn-rechazar')) {
            rechazarEmprendimiento(id);
        } else if (e.target.classList.contains('btn-editar')) {
            editarContenido(id, tipo);
        } else if (e.target.classList.contains('btn-eliminar')) {
            eliminarContenido(id, tipo);
        } else if (e.target.classList.contains('btn-detalles')) {
            verDetalles(id, tipo);
        }
    }

    // Funciones de acciones para emprendimientos
    function aprobarEmprendimiento(id) {
        const card = document.querySelector(`.tarjeta-emprendimiento[data-id="${id}"]`);
        if (card) {
            card.dataset.estado = 'aprobado';
            card.querySelector('.estado').textContent = 'Aprobado';
            card.querySelector('.estado').className = 'estado aprobado';
            
            // Actualizar fecha de aprobación
            const fechaInfo = card.querySelector('.info-tarjeta p:nth-child(3)');
            if (fechaInfo) {
                const hoy = new Date().toLocaleDateString('es-ES');
                fechaInfo.innerHTML = `<strong>Aprobado:</strong> ${hoy}`;
            }
            
            // Actualizar botones
            const acciones = card.querySelector('.acciones-tarjeta');
            acciones.innerHTML = '<button class="btn-detalles" data-id="${id}">Detalles</button>';
            
            console.log(`Emprendimiento ${id} aprobado`);
        }
    }

    function rechazarEmprendimiento(id) {
        const motivo = prompt('Ingrese el motivo del rechazo:');
        if (motivo) {
            const card = document.querySelector(`.tarjeta-emprendimiento[data-id="${id}"]`);
            if (card) {
                card.dataset.estado = 'rechazado';
                card.querySelector('.estado').textContent = 'Rechazado';
                card.querySelector('.estado').className = 'estado rechazado';
                
                // Actualizar fecha de rechazo
                const fechaInfo = card.querySelector('.info-tarjeta p:nth-child(3)');
                if (fechaInfo) {
                    const hoy = new Date().toLocaleDateString('es-ES');
                    fechaInfo.innerHTML = `<strong>Rechazado:</strong> ${hoy}`;
                }
                
                // Agregar motivo de rechazo
                const infoCard = card.querySelector('.info-tarjeta');
                let motivoDiv = card.querySelector('.motivo-rechazo');
                
                if (!motivoDiv) {
                    motivoDiv = document.createElement('div');
                    motivoDiv.className = 'motivo-rechazo';
                    infoCard.appendChild(motivoDiv);
                }
                
                motivoDiv.innerHTML = `<strong>Motivo:</strong> ${motivo}`;
                
                // Actualizar botones
                const acciones = card.querySelector('.acciones-tarjeta');
                acciones.innerHTML = '<button class="btn-detalles" data-id="${id}">Detalles</button>';
                
                console.log(`Emprendimiento ${id} rechazado. Motivo: ${motivo}`);
            }
        }
    }

    // Funciones comunes
    function editarContenido(id, tipo) {
        console.log(`Editar ${tipo} con ID: ${id}`);
        // Implementar lógica de edición según el tipo
    }

    function eliminarContenido(id, tipo) {
        if (confirm(`¿Está seguro de eliminar esta ${tipo}?`)) {
            console.log(`${tipo} eliminada con ID: ${id}`);
            // Implementar lógica de eliminación
        }
    }

    function verDetalles(id, tipo) {
        console.log(`Ver detalles de ${tipo} con ID: ${id}`);
        // Implementar lógica para mostrar detalles
    }

    function mostrarFormularioNoticia() {
        console.log('Mostrar formulario para nueva noticia');
        // Implementar lógica para mostrar formulario
    }
});