/**
 * admin-contenido.js - Gestión de contenido para Noticias, Emprendimientos, Transportes y Actividades
 */

document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo
    // const noticiasEjemplo = [
    //     {
    //         id: 1,
    //         titulo: 'Inauguración del nuevo parque tecnológico',
    //         autor: 'Departamento de Comunicaciones',
    //         fecha: '15/11/2023',
    //         estado: 'publicado',
    //         categoria: 'Noticias',
    //         imagen: '/img/NoticiaEjm.png',
    //         descripcion: 'El nuevo parque tecnológico abrirá sus puertas el próximo mes.'
    //     },
    //     {
    //         id: 2,
    //         titulo: 'Mantenimiento programado del sistema',
    //         autor: 'Equipo de TI',
    //         fecha: '10/11/2023',
    //         estado: 'publicado',
    //         categoria: 'Anuncios',
    //         imagen: '/img/NoticiaEjm.png',
    //         descripcion: 'El sistema estará inaccesible durante 2 horas el día 15/11.'
    //     }
    // ];

    // const emprendimientosEjemplo = [
    //     {
    //         id: 101,
    //         titulo: 'Artesanías Locales',
    //         emprendedor: 'Ana Rodríguez',
    //         fecha: '05/11/2023',
    //         estado: 'pendiente',
    //         categoria: 'Artesanías',
    //         imagen: '/img/NoticiaEjm.png'
    //     },
    //     {
    //         id: 102,
    //         titulo: 'Café Orgánico',
    //         emprendedor: 'Carlos Méndez',
    //         fecha: '28/10/2023',
    //         estado: 'aprobado',
    //         categoria: 'Alimentos',
    //         imagen: '/img/NoticiaEjm.png'
    //     }
    // ];

    // const transportesEjemplo = [
    //     {
    //         id: 301,
    //         nombre: "Bus Interurbano",
    //         tipo: "Bus",
    //         horarios: "/img/horarios-bus.png",
    //         tarifa: "$2.50",
    //         contacto: "2222-2222",
    //         imagen: "/img/transporte-ejemplo.jpg"
    //     },
    //     {
    //         id: 302,
    //         nombre: "Taxi Seguro",
    //         tipo: "Taxi",
    //         horarios: "24/7",
    //         tarifa: "$3.50 base + $1.50/km",
    //         contacto: "3333-3333",
    //         imagen: "/img/transporte-ejemplo.jpg"
    //     }
    // ];

    // const actividadesEjemplo = [
    //     {
    //         id: 401,
    //         titulo: "Taller de Pintura",
    //         categoria: "Cultural",
    //         fecha: "20/11/2023",
    //         descripcion: "Taller de pintura al óleo para principiantes",
    //         imagen: "/img/actividad-ejemplo.jpg"
    //     },
    //     {
    //         id: 402,
    //         titulo: "Torneo de Fútbol",
    //         categoria: "Deportiva",
    //         fecha: "25/11/2023",
    //         descripcion: "Torneo comunitario de fútbol",
    //         imagen: "/img/actividad-ejemplo.jpg"
    //     }
    // ];

    // Elementos del DOM
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const btnAgregar = document.querySelector('.btn-agregar-contenido');

    // Inicialización
    init();

    function init() {
        // cargarNoticias(noticiasEjemplo);
        // cargarEmprendimientos(emprendimientosEjemplo);
        // cargarTransportes(transportesEjemplo);
        // cargarActividades(actividadesEjemplo);
        setupEventListeners();
    }

    // function cargarNoticias(noticias) {
    //     const grid = document.querySelector('#noticias .cuadricula-contenido');
    //     if (!grid) return;
        
    //     grid.innerHTML = '';
    //     noticias.forEach(noticia => {
    //         grid.appendChild(crearTarjetaNoticia(noticia));
    //     });
    // }

    // function cargarEmprendimientos(emprendimientos) {
    //     const grid = document.querySelector('#emprendimientos .cuadricula-contenido');
    //     if (!grid) return;
        
    //     grid.innerHTML = '';
    //     emprendimientos.forEach(emprendimiento => {
    //         grid.appendChild(crearTarjetaEmprendimiento(emprendimiento));
    //     });
    // }

    // function cargarTransportes(transportes) {
    //     const grid = document.querySelector('#transporte .cuadricula-contenido');
    //     if (!grid) return;
        
    //     grid.innerHTML = '';
    //     transportes.forEach(transporte => {
    //         grid.appendChild(crearTarjetaTransporte(transporte));
    //     });
    // }

    // function cargarActividades(actividades) {
    //     const grid = document.querySelector('#actividades .cuadricula-contenido');
    //     if (!grid) return;
        
    //     grid.innerHTML = '';
    //     actividades.forEach(actividad => {
    //         grid.appendChild(crearTarjetaActividad(actividad));
    //     });
    // }

//     async function cargarQuejas() {
//     const res = await fetch('/api/quejas');
//     const quejas = await res.json();
//     const grid = document.getElementById('quejas-contenido');
//     grid.innerHTML = '';
//     quejas.forEach(queja => {
//         const card = document.createElement('div');
//         card.className = 'tarjeta-simple';
//         card.innerHTML = `
//             <div class="info-tarjeta">
//                 <p><strong>Nombre:</strong> ${queja.nombre}</p>
//                 <p><strong>Reporte:</strong> ${queja.reporte}</p>
//                 <p><strong>Fecha:</strong> ${queja.fecha}</p>
//                 ${queja.archivo ? `<p><strong>Archivo:</strong> ${queja.archivo}</p>` : ''}
//             </div>
//         `;
//         grid.appendChild(card);
//     });
// }

//  if (document.getElementById('quejas').classList.contains('active')) {
//         cargarQuejas();
//     }

// // Llama a cargarQuejas cuando se activa la pestaña de quejas
// document.querySelector('[data-tab="quejas"]').addEventListener('click', cargarQuejas);

    // function crearTarjetaNoticia(noticia) {
    //     const card = document.createElement('div');
    //     card.className = 'tarjeta-simple';
    //     card.dataset.id = noticia.id;
    //     card.dataset.categoria = noticia.categoria.toLowerCase();

    //     card.innerHTML = `
    //         <div class="encabezado-tarjeta">
    //             <h4>${noticia.titulo}</h4>
    //             <span class="fecha">${noticia.fecha}</span>
    //         </div>
    //         <div class="imagen-tarjeta">
    //             <img src="${noticia.imagen}" alt="${noticia.titulo}">
    //         </div>
    //         <div class="info-tarjeta">
    //             <p><strong>Autor:</strong> ${noticia.autor}</p>
    //             <p><strong>Categoría:</strong> ${noticia.categoria}</p>
    //             <p><strong>Estado:</strong> ${formatEstado(noticia.estado)}</p>
    //             ${noticia.descripcion ? `<p class="descripcion-tarjeta">${noticia.descripcion}</p>` : ''}
    //         </div>
    //         <div class="acciones-tarjeta">
    //             <button class="btn-editar" data-id="${noticia.id}">Editar</button>
    //             <button class="btn-eliminar" data-id="${noticia.id}">Eliminar</button>
    //         </div>
    //     `;
    //     return card;
    // }

    // function crearTarjetaEmprendimiento(emprendimiento) {
    //     const card = document.createElement('div');
    //     card.className = 'tarjeta-emprendimiento';
    //     card.dataset.id = emprendimiento.id;
    //     card.dataset.estado = emprendimiento.estado;
    //     card.dataset.categoria = emprendimiento.categoria.toLowerCase();

    //     const motivoRechazo = emprendimiento.motivoRechazo ? 
    //         `<div class="motivo-rechazo"><strong>Motivo:</strong> ${emprendimiento.motivoRechazo}</div>` : '';

    //     const fechaTexto = emprendimiento.estado === 'aprobado' ? 'Aprobado' : 
    //                       emprendimiento.estado === 'rechazado' ? 'Rechazado' : 'Solicitado';

    //     card.innerHTML = `
    //         <div class="encabezado-tarjeta">
    //             <h4>${emprendimiento.titulo}</h4>
    //             <span class="estado ${emprendimiento.estado}">${formatEstado(emprendimiento.estado)}</span>
    //         </div>
    //         <div class="imagen-tarjeta">
    //             <img src="${emprendimiento.imagen}" alt="${emprendimiento.titulo}">
    //         </div>
    //         <div class="info-tarjeta">
    //             <p><strong>Emprendedor:</strong> ${emprendimiento.emprendedor}</p>
    //             <p><strong>Categoría:</strong> ${emprendimiento.categoria}</p>
    //             <p><strong>${fechaTexto}:</strong> ${emprendimiento.fecha}</p>
    //             ${motivoRechazo}
    //         </div>
    //         <div class="acciones-tarjeta">
    //             ${emprendimiento.estado === 'pendiente' ? `
    //             <button class="btn-aprobar" data-id="${emprendimiento.id}">Aprobar</button>
    //             <button class="btn-rechazar" data-id="${emprendimiento.id}">Rechazar</button>
    //             ` : ''}
    //             <button class="btn-detalles" data-id="${emprendimiento.id}">Detalles</button>
    //         </div>
    //     `;
    //     return card;
    // }

    // function crearTarjetaTransporte(transporte) {
    //     const card = document.createElement('div');
    //     card.className = 'tarjeta-simple';
    //     card.dataset.id = transporte.id;
    //     card.dataset.tipo = transporte.tipo.toLowerCase();

    //     card.innerHTML = `
    //         <div class="encabezado-tarjeta">
    //             <h4>${transporte.nombre}</h4>
    //             <span class="fecha">${transporte.tipo}</span>
    //         </div>
    //         <div class="imagen-tarjeta">
    //             <img src="${transporte.imagen}" alt="${transporte.nombre}">
    //         </div>
    //         <div class="info-tarjeta">
    //             <p><strong>Horarios:</strong> ${typeof transporte.horarios === 'string' ? transporte.horarios : 
    //                 `<img src="${transporte.horarios}" alt="Horarios" style="max-width:100%;">`}</p>
    //             <p><strong>Tarifa:</strong> ${transporte.tarifa}</p>
    //             <p><strong>Contacto:</strong> ${transporte.contacto}</p>
    //         </div>
    //         <div class="acciones-tarjeta">
    //             <button class="btn-editar" data-id="${transporte.id}">Editar</button>
    //             <button class="btn-eliminar" data-id="${transporte.id}">Eliminar</button>
    //         </div>
    //     `;
        
    //     return card;
    // }

    // function crearTarjetaActividad(actividad) {
    //     const card = document.createElement('div');
    //     card.className = 'tarjeta-simple';
    //     card.dataset.id = actividad.id;
    //     card.dataset.categoria = actividad.categoria.toLowerCase();

    //     card.innerHTML = `
    //         <div class="encabezado-tarjeta">
    //             <h4>${actividad.titulo}</h4>
    //             <span class="fecha">${actividad.fecha}</span>
    //         </div>
    //         <div class="imagen-tarjeta">
    //             <img src="${actividad.imagen}" alt="${actividad.titulo}">
    //         </div>
    //         <div class="info-tarjeta">
    //             <p><strong>Categoría:</strong> ${actividad.categoria}</p>
    //             <p class="descripcion-tarjeta">${actividad.descripcion}</p>
    //         </div>
    //         <div class="acciones-tarjeta">
    //             <button class="btn-editar" data-id="${actividad.id}">Editar</button>
    //             <button class="btn-eliminar" data-id="${actividad.id}">Eliminar</button>
    //         </div>
    //     `;
        
    //     return card;
    // }

    // function formatEstado(estado) {
    //     const estados = {
    //         'pendiente': 'Pendiente',
    //         'aprobado': 'Aprobado',
    //         'rechazado': 'Rechazado',
    //         'publicado': 'Publicado'
    //     };
    //     return estados[estado] || estado;
    // }

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

    function formatDateForInput(dateString) {
        // Convierte fecha en formato DD/MM/YYYY a YYYY-MM-DD para input type="date"
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return dateString;
    }

    function formatDateFromInput(dateString) {
        // Convierte fecha en formato YYYY-MM-DD a DD/MM/YYYY
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
        return dateString;
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