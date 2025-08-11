/**
 * admin-contenido.js - Gestión de contenido para Noticias, Emprendimientos, Transportes y Actividades
 */

document.addEventListener('DOMContentLoaded', function() {

    // Elementos del DOM
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const btnAgregar = document.querySelector('.btn-agregar-contenido');

    // Inicialización
    init();

    function init() {
        setupEventListeners();
    }

    function setupEventListeners() {
        tabs.forEach(tab => tab.addEventListener('click', cambiarPestaña));
        
        document.querySelectorAll('.filtro-select').forEach(select => {
            select.addEventListener('change', aplicarFiltros);
        });

        document.querySelectorAll('.busqueda-input').forEach(input => {
            input.addEventListener('input', aplicarFiltros);
        });

        // Configurar botones de agregar para cada sección
        document.querySelector('#transporte .btn-agregar-contenido')?.addEventListener('click', mostrarFormularioTransporte);
        document.querySelector('#actividades .btn-agregar-contenido')?.addEventListener('click', mostrarFormularioActividad);
        document.querySelector('#noticias .btn-agregar-contenido')?.addEventListener('click', mostrarFormularioNoticia);

        document.querySelectorAll('.cuadricula-contenido').forEach(grid => {
            grid.addEventListener('click', manejarAccionesTarjetas);
        });
    }

    function cambiarPestaña(e) {
        const tabId = e.target.getAttribute('data-tab');
        
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        e.target.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // Mostrar el botón de agregar solo en las pestañas correspondientes
        const btnAgregar = document.querySelector('.btn-agregar-contenido');
        if (btnAgregar) {
            btnAgregar.style.display = ['noticias', 'transporte', 'actividades'].includes(tabId) ? 'block' : 'none';
        }
    }

    // Filtro y búsqueda para todos los tabs
    function filtrarTarjetas(tabId) {
        const tab = document.getElementById(tabId);
        if (!tab) return;
        const select = tab.querySelector('.filtro-select');
        const input = tab.querySelector('.busqueda-input');
        const grid = tab.querySelector('.cuadricula-contenido');
        if (!grid) return;
        const tarjetas = Array.from(grid.children).filter(card => card.classList.contains('tarjeta-simple') || card.classList.contains('tarjeta-emprendimiento'));
        let filtro = select ? select.value.trim().toLowerCase() : '';
        let busqueda = input ? input.value.trim().toLowerCase() : '';
        tarjetas.forEach(card => {
            let mostrar = true;
            // Filtro por categoría/estado/tipo
            if (select && filtro) {
                if (tabId === 'noticias') {
                    mostrar = (card.dataset.categoria === filtro);
                } else if (tabId === 'emprendimientos') {
                    // Filtra por estado textual
                    const estadoCard = (card.dataset.estado || '').toLowerCase();
                    mostrar = (filtro === '' || estadoCard === filtro);
                } else if (tabId === 'transporte') {
                    mostrar = (card.dataset.tipo === filtro);
                } else if (tabId === 'actividades') {
                    mostrar = (card.dataset.categoria === filtro);
                }
            }
            // Filtro por búsqueda
            if (input && busqueda) {
                let texto = card.textContent.toLowerCase();
                mostrar = mostrar && texto.includes(busqueda);
            }
            card.style.display = mostrar ? '' : 'none';
        });
    }

    // Inicializar filtros en todos los tabs
    ['noticias','emprendimientos','transporte','actividades','quejas','miembros'].forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (!tab) return;
        const select = tab.querySelector('.filtro-select');
        const input = tab.querySelector('.busqueda-input');
        if (select) {
            select.addEventListener('change', () => filtrarTarjetas(tabId));
        }
        if (input) {
            input.addEventListener('input', () => filtrarTarjetas(tabId));
        }
    });

    // Para tabs que no tienen filtro, agregarlo dinámicamente
    ['quejas','miembros'].forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (!tab) return;
        if (!tab.querySelector('.filtros-contenido')) {
            const filtros = document.createElement('div');
            filtros.className = 'filtros-contenido';
            filtros.innerHTML = `
                <input type="text" class="busqueda-input" placeholder="Buscar...">
            `;
            tab.insertBefore(filtros, tab.querySelector('.cuadricula-contenido'));
            filtros.querySelector('.busqueda-input').addEventListener('input', () => filtrarTarjetas(tabId));
        }
    });

    function aplicarFiltros() {
        const tabActive = document.querySelector('.tab-content.active');
        if (!tabActive) return;
        
        const filtroValor = tabActive.querySelector('.filtro-select')?.value.toLowerCase() || '';
        const busqueda = tabActive.querySelector('.busqueda-input')?.value.toLowerCase() || '';
        
        tabActive.querySelectorAll('.tarjeta-simple, .tarjeta-emprendimiento').forEach(card => {
            const cardTitulo = card.querySelector('h4').textContent.toLowerCase();
            const cardInfo = card.querySelector('.info-tarjeta').textContent.toLowerCase();
            const cardCategoria = (card.dataset.categoria || '').toLowerCase();
            const cardEstado = card.dataset.estado?.toLowerCase() || '';
            const cardTipo = card.dataset.tipo?.toLowerCase() || '';
            
            let cumpleFiltro = true;
            let cumpleBusqueda = true;
            
            if (tabActive.id === 'emprendimientos') {
                cumpleFiltro = !filtroValor || filtroValor === 'todos los estados' || cardEstado === filtroValor;
            } else if (tabActive.id === 'transporte') {
                cumpleFiltro = !filtroValor || filtroValor === 'todos los tipos' || cardTipo === filtroValor;
            } else {
                cumpleFiltro = !filtroValor || filtroValor === 'todas las categorías' || cardCategoria.includes(filtroValor);
            }
            
            if (busqueda) {
                cumpleBusqueda = cardTitulo.includes(busqueda) || cardInfo.includes(busqueda);
            }
            
            card.style.display = cumpleFiltro && cumpleBusqueda ? 'block' : 'none';
        });
    }

    function manejarAccionesTarjetas(e) {
        const card = e.target.closest('.tarjeta-simple, .tarjeta-emprendimiento');
        if (!card) return;

        const id = card.dataset.id;
        const tipo = card.classList.contains('tarjeta-emprendimiento') ? 'emprendimiento' :
            card.classList.contains('tarjeta-transporte') ? 'transporte' :
            card.classList.contains('tarjeta-actividad') ? 'actividad' : 'noticia';

        if (e.target.classList.contains('btn-aprobar')) {
            aprobarEmprendimientoPendiente(id, card);
        } else if (e.target.classList.contains('btn-rechazar')) {
            rechazarEmprendimientoPendiente(id, card);
        } else if (e.target.classList.contains('btn-editar')) {
            editarContenido(id, tipo);
        } else if (e.target.classList.contains('btn-eliminar')) {
            eliminarContenido(id, tipo);
        } else if (e.target.classList.contains('btn-detalles')) {
            verDetallesEmprendimientoPendiente(card);
        }
    }

    async function aprobarEmprendimientoPendiente(id, card) {
        if (!confirm('¿Aprobar este emprendimiento?')) return;
        try {
            const res = await fetch('/api/aprobarEmprendimiento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (data.resultado) {
                card.remove();
                mostrarNotificacion('¡Emprendimiento aprobado y publicado!', 'exito');
            } else {
                mostrarNotificacion('Error: ' + data.mensaje, 'error');
            }
        } catch (err) {
            mostrarNotificacion('Error de conexión', 'error');
        }
    }

    async function rechazarEmprendimientoPendiente(id, card) {
        const motivo = prompt('Ingrese el motivo de rechazo:');
        if (!motivo) return;
        try {
            const res = await fetch('/api/rechazarEmprendimiento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, motivo })
            });
            const data = await res.json();
            if (data.resultado) {
                // Actualiza la tarjeta a estado rechazado sin eliminarla
                card.querySelector('.estado').textContent = 'Rechazado';
                card.querySelector('.estado').className = 'estado Rechazado';
                // Elimina botones de aprobar/rechazar, muestra motivo
                card.querySelector('.acciones-tarjeta').innerHTML =
                    `<span class="estado Rechazado">Rechazado</span>
                    <button class="btn-detalles" data-id="${id}">Detalles</button>`;
                // Agrega motivo en info-tarjeta
                let info = card.querySelector('.info-tarjeta');
                let motivoDiv = document.createElement('div');
                motivoDiv.className = 'motivo-rechazo';
                motivoDiv.innerHTML = `<strong>Motivo:</strong> ${motivo}`;
                info.appendChild(motivoDiv);
                mostrarNotificacion('¡Emprendimiento rechazado!', 'error');
            } else {
                mostrarNotificacion('Error: ' + data.mensaje, 'error');
            }
        } catch (err) {
            mostrarNotificacion('Error de conexión', 'error');
        }
    }

    function verDetallesEmprendimientoPendiente(card) {
        // Elimina cualquier modal existente
        document.querySelectorAll('.modal-detalles').forEach(m => m.remove());
        // Modal mejorado
        const modal = document.createElement('div');
        modal.className = 'modal-detalles';
        modal.innerHTML = `
            <div class="modal-contenido-detalles">
                <button class="btn-cerrar-detalles">&times;</button>
                <h3 class="modal-titulo">Detalles de Emprendimiento</h3>
                <div class="modal-detalles-body">
                    <div class="modal-detalles-imagen">
                        <img src="${card.querySelector('.imagen-tarjeta img').src}" alt="${card.querySelector('h4').textContent}">
                    </div>
                    <div class="modal-detalles-info">
                        <h4>${card.querySelector('h4').textContent}</h4>
                        ${Array.from(card.querySelectorAll('.info-tarjeta p')).map(p => `<p>${p.outerHTML}</p>`).join('')}
                        ${card.querySelector('.motivo-rechazo') ? card.querySelector('.motivo-rechazo').outerHTML : ''}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        modal.querySelector('.btn-cerrar-detalles').addEventListener('click', function () {
            document.body.removeChild(modal);
        });
    }

    function mostrarFormularioNoticia() {

        window.location.href = '/Admin_panel/crear_noticia';
        
    }

    function mostrarFormularioTransporte() {
        window.location.href = 'Admin_panel/crear_transporte';
    }

    function mostrarFormularioActividad() {
        window.location.href = 'Admin_panel/crear_actividad';
    }

    function mostrarNotificacion(mensaje, tipo) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.classList.add('mostrar');
        }, 100);
        
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }
    
    // Manejo de eliminación de tarjetas y base de datos
    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('btn-eliminar')) {
            const card = e.target.closest('.tarjeta-simple, .tarjeta-emprendimiento');
            if (!card) return;
            const id = e.target.getAttribute('data-id');
            // Detecta el tipo de card
            let tipo = '';
            if (card.closest('#noticias')) tipo = 'noticia';
            else if (card.closest('#emprendimientos')) tipo = 'emprendimiento';
            else if (card.closest('#transporte')) tipo = 'transporte';
            else if (card.closest('#actividades')) tipo = 'actividad';
            else if (card.closest('#quejas')) tipo = 'queja';
            else if (card.closest('#miembros')) tipo = 'usuario';

            let url = '';
            if (tipo === 'noticia') url = '/api/eliminarNoticia';
            else if (tipo === 'emprendimiento') url = '/api/eliminarEmprendimiento';
            else if (tipo === 'transporte') url = '/api/eliminarTransporte';
            else if (tipo === 'actividad') url = '/api/eliminarActividad';
            else if (tipo === 'queja') url = '/api/eliminarQueja';
            else if (tipo === 'usuario') url = '/api/eliminarUsuario';

            if (!url) return;

            if (confirm('¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.')) {
                try {
                    const res = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id })
                    });
                    const data = await res.json();
                    if (data.resultado) {
                        card.remove();
                        mostrarNotificacion('¡El registro fue eliminado exitosamente!', 'exito');
                    } else {
                        mostrarNotificacion('Error al eliminar: ' + data.mensaje, 'error');
                    }
                } catch (err) {
                    mostrarNotificacion('Error de conexión', 'error');
                }
            }
        }
    });

    function eliminarContenido(id, tipo) {
        let url = '';
        if (tipo === 'emprendimiento') url = '/api/eliminarEmprendimiento';
        else if (tipo === 'noticia') url = '/api/eliminarNoticia';
        else if (tipo === 'transporte') url = '/api/eliminarTransporte';
        else if (tipo === 'actividad') url = '/api/eliminarActividad';
        else if (tipo === 'queja') url = '/api/eliminarQueja';
        else if (tipo === 'usuario') url = '/api/eliminarUsuario';

        if (!url) return;

        if (confirm('¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.')) {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            })
            .then(res => res.json())
            .then(data => {
                if (data.resultado) {
                    const card = document.querySelector(`[data-id="${id}"]`);
                    if (card) card.remove();
                    mostrarNotificacion('¡El registro fue eliminado exitosamente!', 'exito');
                } else {
                    mostrarNotificacion('Error al eliminar: ' + data.mensaje, 'error');
                }
            })
            .catch(() => {
                mostrarNotificacion('Error de conexión', 'error');
            });
        }
    }
});