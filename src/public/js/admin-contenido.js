/**
 * admin-contenido.js - Gestión de contenido para Noticias, Emprendimientos, Transportes y Actividades
 */

document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo
    const noticiasEjemplo = [
        {
            id: 1,
            titulo: 'Inauguración del nuevo parque tecnológico',
            autor: 'Departamento de Comunicaciones',
            fecha: '15/11/2023',
            estado: 'publicado',
            categoria: 'Noticias',
            imagen: '/img/NoticiaEjm.png',
            descripcion: 'El nuevo parque tecnológico abrirá sus puertas el próximo mes.'
        },
        {
            id: 2,
            titulo: 'Mantenimiento programado del sistema',
            autor: 'Equipo de TI',
            fecha: '10/11/2023',
            estado: 'publicado',
            categoria: 'Anuncios',
            imagen: '/img/NoticiaEjm.png',
            descripcion: 'El sistema estará inaccesible durante 2 horas el día 15/11.'
        }
    ];

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
        }
    ];

    const transportesEjemplo = [
        {
            id: 301,
            nombre: "Bus Interurbano",
            tipo: "Bus",
            horarios: "/img/horarios-bus.png",
            tarifa: "$2.50",
            contacto: "2222-2222",
            imagen: "/img/transporte-ejemplo.jpg"
        },
        {
            id: 302,
            nombre: "Taxi Seguro",
            tipo: "Taxi",
            horarios: "24/7",
            tarifa: "$3.50 base + $1.50/km",
            contacto: "3333-3333",
            imagen: "/img/transporte-ejemplo.jpg"
        }
    ];

    const actividadesEjemplo = [
        {
            id: 401,
            titulo: "Taller de Pintura",
            categoria: "Cultural",
            fecha: "20/11/2023",
            descripcion: "Taller de pintura al óleo para principiantes",
            imagen: "/img/actividad-ejemplo.jpg"
        },
        {
            id: 402,
            titulo: "Torneo de Fútbol",
            categoria: "Deportiva",
            fecha: "25/11/2023",
            descripcion: "Torneo comunitario de fútbol",
            imagen: "/img/actividad-ejemplo.jpg"
        }
    ];

    // Elementos del DOM
    const tabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const btnAgregar = document.querySelector('.btn-agregar-contenido');

    // Inicialización
    init();

    function init() {
        cargarNoticias(noticiasEjemplo);
        cargarEmprendimientos(emprendimientosEjemplo);
        cargarTransportes(transportesEjemplo);
        cargarActividades(actividadesEjemplo);
        setupEventListeners();
    }

    function cargarNoticias(noticias) {
        const grid = document.querySelector('#noticias .cuadricula-contenido');
        if (!grid) return;
        
        grid.innerHTML = '';
        noticias.forEach(noticia => {
            grid.appendChild(crearTarjetaNoticia(noticia));
        });
    }

    function cargarEmprendimientos(emprendimientos) {
        const grid = document.querySelector('#emprendimientos .cuadricula-contenido');
        if (!grid) return;
        
        grid.innerHTML = '';
        emprendimientos.forEach(emprendimiento => {
            grid.appendChild(crearTarjetaEmprendimiento(emprendimiento));
        });
    }

    function cargarTransportes(transportes) {
        const grid = document.querySelector('#transporte .cuadricula-contenido');
        if (!grid) return;
        
        grid.innerHTML = '';
        transportes.forEach(transporte => {
            grid.appendChild(crearTarjetaTransporte(transporte));
        });
    }

    function cargarActividades(actividades) {
        const grid = document.querySelector('#actividades .cuadricula-contenido');
        if (!grid) return;
        
        grid.innerHTML = '';
        actividades.forEach(actividad => {
            grid.appendChild(crearTarjetaActividad(actividad));
        });
    }

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
                ${noticia.descripcion ? `<p class="descripcion-tarjeta">${noticia.descripcion}</p>` : ''}
            </div>
            <div class="acciones-tarjeta">
                <button class="btn-editar" data-id="${noticia.id}">Editar</button>
                <button class="btn-eliminar" data-id="${noticia.id}">Eliminar</button>
            </div>
        `;
        return card;
    }

    function crearTarjetaEmprendimiento(emprendimiento) {
        const card = document.createElement('div');
        card.className = 'tarjeta-emprendimiento';
        card.dataset.id = emprendimiento.id;
        card.dataset.estado = emprendimiento.estado;
        card.dataset.categoria = emprendimiento.categoria.toLowerCase();

        const motivoRechazo = emprendimiento.motivoRechazo ? 
            `<div class="motivo-rechazo"><strong>Motivo:</strong> ${emprendimiento.motivoRechazo}</div>` : '';

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

    function crearTarjetaTransporte(transporte) {
        const card = document.createElement('div');
        card.className = 'tarjeta-simple';
        card.dataset.id = transporte.id;
        card.dataset.tipo = transporte.tipo.toLowerCase();

        card.innerHTML = `
            <div class="encabezado-tarjeta">
                <h4>${transporte.nombre}</h4>
                <span class="fecha">${transporte.tipo}</span>
            </div>
            <div class="imagen-tarjeta">
                <img src="${transporte.imagen}" alt="${transporte.nombre}">
            </div>
            <div class="info-tarjeta">
                <p><strong>Horarios:</strong> ${typeof transporte.horarios === 'string' ? transporte.horarios : 
                    `<img src="${transporte.horarios}" alt="Horarios" style="max-width:100%;">`}</p>
                <p><strong>Tarifa:</strong> ${transporte.tarifa}</p>
                <p><strong>Contacto:</strong> ${transporte.contacto}</p>
            </div>
            <div class="acciones-tarjeta">
                <button class="btn-editar" data-id="${transporte.id}">Editar</button>
                <button class="btn-eliminar" data-id="${transporte.id}">Eliminar</button>
            </div>
        `;
        
        return card;
    }

    function crearTarjetaActividad(actividad) {
        const card = document.createElement('div');
        card.className = 'tarjeta-simple';
        card.dataset.id = actividad.id;
        card.dataset.categoria = actividad.categoria.toLowerCase();

        card.innerHTML = `
            <div class="encabezado-tarjeta">
                <h4>${actividad.titulo}</h4>
                <span class="fecha">${actividad.fecha}</span>
            </div>
            <div class="imagen-tarjeta">
                <img src="${actividad.imagen}" alt="${actividad.titulo}">
            </div>
            <div class="info-tarjeta">
                <p><strong>Categoría:</strong> ${actividad.categoria}</p>
                <p class="descripcion-tarjeta">${actividad.descripcion}</p>
            </div>
            <div class="acciones-tarjeta">
                <button class="btn-editar" data-id="${actividad.id}">Editar</button>
                <button class="btn-eliminar" data-id="${actividad.id}">Eliminar</button>
            </div>
        `;
        
        return card;
    }

    function formatEstado(estado) {
        const estados = {
            'pendiente': 'Pendiente',
            'aprobado': 'Aprobado',
            'rechazado': 'Rechazado',
            'publicado': 'Publicado'
        };
        return estados[estado] || estado;
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

    function aplicarFiltros() {
        const tabActive = document.querySelector('.tab-content.active');
        if (!tabActive) return;
        
        const filtroValor = tabActive.querySelector('.filtro-select')?.value.toLowerCase() || '';
        const busqueda = tabActive.querySelector('.busqueda-input')?.value.toLowerCase() || '';
        
        tabActive.querySelectorAll('.tarjeta-simple, .tarjeta-emprendimiento').forEach(card => {
            const cardTitulo = card.querySelector('h4').textContent.toLowerCase();
            const cardInfo = card.querySelector('.info-tarjeta').textContent.toLowerCase();
            const cardCategoria = card.dataset.categoria.toLowerCase();
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

    function aprobarEmprendimiento(id) {
        const card = document.querySelector(`.tarjeta-emprendimiento[data-id="${id}"]`);
        if (!card) return;
        
        card.dataset.estado = 'aprobado';
        card.querySelector('.estado').textContent = 'Aprobado';
        card.querySelector('.estado').className = 'estado aprobado';
        
        const hoy = new Date().toLocaleDateString('es-ES');
        const fechaInfo = card.querySelector('.info-tarjeta p:nth-child(3)');
        if (fechaInfo) fechaInfo.innerHTML = `<strong>Aprobado:</strong> ${hoy}`;
        
        card.querySelector('.acciones-tarjeta').innerHTML = '<button class="btn-detalles" data-id="${id}">Detalles</button>';
    }

    function rechazarEmprendimiento(id) {
        const motivo = prompt('Ingrese el motivo del rechazo:');
        if (!motivo) return;
        
        const card = document.querySelector(`.tarjeta-emprendimiento[data-id="${id}"]`);
        if (!card) return;
        
        card.dataset.estado = 'rechazado';
        card.querySelector('.estado').textContent = 'Rechazado';
        card.querySelector('.estado').className = 'estado rechazado';
        
        const hoy = new Date().toLocaleDateString('es-ES');
        const fechaInfo = card.querySelector('.info-tarjeta p:nth-child(3)');
        if (fechaInfo) fechaInfo.innerHTML = `<strong>Rechazado:</strong> ${hoy}`;
        
        let motivoDiv = card.querySelector('.motivo-rechazo');
        if (!motivoDiv) {
            motivoDiv = document.createElement('div');
            motivoDiv.className = 'motivo-rechazo';
            card.querySelector('.info-tarjeta').appendChild(motivoDiv);
        }
        motivoDiv.innerHTML = `<strong>Motivo:</strong> ${motivo}`;
        
        card.querySelector('.acciones-tarjeta').innerHTML = '<button class="btn-detalles" data-id="${id}">Detalles</button>';
    }

    function editarContenido(id, tipo) {
        const card = document.querySelector(`.tarjeta-${tipo === 'noticia' || tipo === 'transporte' || tipo === 'actividad' ? 'simple' : 'emprendimiento'}[data-id="${id}"]`);
        if (!card) return;

        if (tipo === 'transporte') {
            editarTransporte(id);
            return;
        }

        if (tipo === 'actividad') {
            editarActividad(id);
            return;
        }

        const descripcionActual = card.querySelector('.descripcion-tarjeta')?.textContent || '';

        const formulario = document.createElement('div');
        formulario.className = 'modal-edicion';
        formulario.innerHTML = `
            <div class="modal-contenido">
                <h3>Editar ${tipo}</h3>
                <form id="form-editar-${tipo}">
                    <div class="form-group">
                        <label for="titulo">Título:</label>
                        <input type="text" id="titulo" value="${card.querySelector('h4').textContent}" required>
                    </div>
                    ${tipo === 'noticia' ? `
                    <div class="form-group">
                        <label for="autor">Autor:</label>
                        <input type="text" id="autor" value="${card.querySelector('.info-tarjeta p:first-child').textContent.replace('Autor: ', '')}" required>
                    </div>
                    ` : tipo === 'emprendimiento' ? `
                    <div class="form-group">
                        <label for="emprendedor">Emprendedor:</label>
                        <input type="text" id="emprendedor" value="${card.querySelector('.info-tarjeta p:first-child').textContent.replace('Emprendedor: ', '')}" required>
                    </div>
                    ` : ''}
                    <div class="form-group">
                        <label for="categoria">Categoría:</label>
                        <select id="categoria" required>
                            ${tipo === 'noticia' ? `
                            <option value="Noticias" ${card.dataset.categoria === 'noticias' ? 'selected' : ''}>Noticias</option>
                            <option value="Anuncios" ${card.dataset.categoria === 'anuncios' ? 'selected' : ''}>Anuncios</option>
                            <option value="Eventos" ${card.dataset.categoria === 'eventos' ? 'selected' : ''}>Eventos</option>
                            ` : tipo === 'emprendimiento' ? `
                            <option value="Artesanias" ${card.dataset.categoria === 'artesanias' ? 'selected' : ''}>Artesanías</option>
                            <option value="Alimentos" ${card.dataset.categoria === 'alimentos' ? 'selected' : ''}>Alimentos</option>
                            <option value="Servicios" ${card.dataset.categoria === 'servicios' ? 'selected' : ''}>Servicios</option>
                            ` : ''}
                        </select>
                    </div>
                    ${tipo === 'actividad' ? `
                    <div class="form-group">
                        <label for="fecha">Fecha:</label>
                        <input type="date" id="fecha" value="${formatDateForInput(card.querySelector('.fecha').textContent)}" required>
                    </div>
                    ` : ''}
                    <div class="form-group">
                        <label for="descripcion">Descripción:</label>
                        <textarea id="descripcion" rows="4">${descripcionActual}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="imagen">Cambiar imagen:</label>
                        <input type="file" id="imagen" accept="image/*">
                        <div class="vista-previa-imagen" id="vista-previa-imagen">
                            <img src="${card.querySelector('.imagen-tarjeta img').src}" alt="Imagen actual" style="max-width: 100%; max-height: 150px;">
                        </div>
                    </div>
                    <div class="form-acciones">
                        <button type="button" class="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(formulario);
        formulario.style.display = 'flex';

        const inputImagen = formulario.querySelector('#imagen');
        const vistaPrevia = formulario.querySelector('#vista-previa-imagen');

        inputImagen.addEventListener('change', function() {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = function(e) {
                    vistaPrevia.innerHTML = `<img src="${e.target.result}" alt="Nueva imagen" style="max-width: 100%; max-height: 150px;">`;
                }
                lector.readAsDataURL(archivo);
            }
        });

        formulario.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nuevoTitulo = formulario.querySelector('#titulo').value;
            const nuevaDescripcion = formulario.querySelector('#descripcion').value;
            const nuevaCategoria = formulario.querySelector('#categoria').value;
            
            let nuevaImagen = card.querySelector('.imagen-tarjeta img').src;
            if (inputImagen.files && inputImagen.files[0]) {
                nuevaImagen = URL.createObjectURL(inputImagen.files[0]);
            }

            // Actualizar tarjeta
            card.querySelector('h4').textContent = nuevoTitulo;
            card.querySelector('.imagen-tarjeta img').src = nuevaImagen;
            card.querySelector('.imagen-tarjeta img').alt = nuevoTitulo;
            card.dataset.categoria = nuevaCategoria.toLowerCase();
            
            if (tipo === 'noticia') {
                card.querySelector('.info-tarjeta p:first-child').textContent = 
                    `Autor: ${formulario.querySelector('#autor').value}`;
            } else if (tipo === 'emprendimiento') {
                card.querySelector('.info-tarjeta p:first-child').textContent = 
                    `Emprendedor: ${formulario.querySelector('#emprendedor').value}`;
            }
            
            if (tipo === 'actividad') {
                const fechaInput = formulario.querySelector('#fecha').value;
                const fechaFormateada = formatDateFromInput(fechaInput);
                card.querySelector('.fecha').textContent = fechaFormateada;
            }
            
            let descripcionElement = card.querySelector('.descripcion-tarjeta');
            if (descripcionElement) {
                descripcionElement.textContent = nuevaDescripcion;
            } else if (nuevaDescripcion) {
                descripcionElement = document.createElement('p');
                descripcionElement.className = 'descripcion-tarjeta';
                descripcionElement.textContent = nuevaDescripcion;
                card.querySelector('.info-tarjeta').appendChild(descripcionElement);
            }
            
            document.body.removeChild(formulario);
            mostrarNotificacion(`${tipo} actualizada correctamente`, 'exito');
        });

        formulario.querySelector('.btn-cancelar').addEventListener('click', function() {
            document.body.removeChild(formulario);
        });
    }

    function editarTransporte(id) {
        const card = document.querySelector(`.tarjeta-simple[data-id="${id}"]`);
        if (!card) return;

        const formulario = document.createElement('div');
        formulario.className = 'modal-edicion';
        formulario.innerHTML = `
            <div class="modal-contenido">
                <h3>Editar Transporte</h3>
                <form id="form-editar-transporte">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" value="${card.querySelector('h4').textContent}" required>
                    </div>
                    <div class="form-group">
                        <label for="tipo">Tipo:</label>
                        <select id="tipo" required>
                            <option value="Bus" ${card.dataset.tipo === 'bus' ? 'selected' : ''}>Bus</option>
                            <option value="Taxi" ${card.dataset.tipo === 'taxi' ? 'selected' : ''}>Taxi</option>
                            <option value="Colectivo" ${card.dataset.tipo === 'colectivo' ? 'selected' : ''}>Colectivo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="horarios">Horarios:</label>
                        <input type="text" id="horarios" value="${card.querySelector('.info-tarjeta p:first-child').textContent.replace('Horarios: ', '')}" required>
                    </div>
                    <div class="form-group">
                        <label for="tarifa">Tarifa:</label>
                        <input type="text" id="tarifa" value="${card.querySelector('.info-tarjeta p:nth-child(2)').textContent.replace('Tarifa: ', '')}" required>
                    </div>
                    <div class="form-group">
                        <label for="contacto">Contacto:</label>
                        <input type="text" id="contacto" value="${card.querySelector('.info-tarjeta p:nth-child(3)').textContent.replace('Contacto: ', '')}" required>
                    </div>
                    <div class="form-group">
                        <label for="imagen">Cambiar imagen:</label>
                        <input type="file" id="imagen" accept="image/*">
                        <div class="vista-previa-imagen" id="vista-previa-imagen">
                            <img src="${card.querySelector('.imagen-tarjeta img').src}" alt="Imagen actual" style="max-width: 100%; max-height: 150px;">
                        </div>
                    </div>
                    <div class="form-acciones">
                        <button type="button" class="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(formulario);
        formulario.style.display = 'flex';

        const inputImagen = formulario.querySelector('#imagen');
        const vistaPrevia = formulario.querySelector('#vista-previa-imagen');

        inputImagen.addEventListener('change', function() {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = function(e) {
                    vistaPrevia.innerHTML = `<img src="${e.target.result}" alt="Nueva imagen" style="max-width: 100%; max-height: 150px;">`;
                }
                lector.readAsDataURL(archivo);
            }
        });

        formulario.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const nombre = formulario.querySelector('#nombre').value;
            const tipo = formulario.querySelector('#tipo').value;
            const horarios = formulario.querySelector('#horarios').value;
            const tarifa = formulario.querySelector('#tarifa').value;
            const contacto = formulario.querySelector('#contacto').value;
            
            let imagenSrc = card.querySelector('.imagen-tarjeta img').src;
            if (inputImagen.files && inputImagen.files[0]) {
                imagenSrc = URL.createObjectURL(inputImagen.files[0]);
            }

            // Actualizar tarjeta
            card.querySelector('h4').textContent = nombre;
            card.querySelector('.fecha').textContent = tipo;
            card.dataset.tipo = tipo.toLowerCase();
            
            const infoTarjeta = card.querySelector('.info-tarjeta');
            infoTarjeta.innerHTML = `
                <p><strong>Horarios:</strong> ${horarios}</p>
                <p><strong>Tarifa:</strong> ${tarifa}</p>
                <p><strong>Contacto:</strong> ${contacto}</p>
            `;
            
            card.querySelector('.imagen-tarjeta img').src = imagenSrc;
            card.querySelector('.imagen-tarjeta img').alt = nombre;
            
            document.body.removeChild(formulario);
            mostrarNotificacion('Transporte actualizado correctamente', 'exito');
        });

        formulario.querySelector('.btn-cancelar').addEventListener('click', function() {
            document.body.removeChild(formulario);
        });
    }

    function editarActividad(id) {
        const card = document.querySelector(`.tarjeta-simple[data-id="${id}"]`);
        if (!card) return;

        const formulario = document.createElement('div');
        formulario.className = 'modal-edicion';
        formulario.innerHTML = `
            <div class="modal-contenido">
                <h3>Editar Actividad</h3>
                <form id="form-editar-actividad">
                    <div class="form-group">
                        <label for="titulo">Título:</label>
                        <input type="text" id="titulo" value="${card.querySelector('h4').textContent}" required>
                    </div>
                    <div class="form-group">
                        <label for="categoria">Categoría:</label>
                        <select id="categoria" required>
                            <option value="Cultural" ${card.dataset.categoria === 'cultural' ? 'selected' : ''}>Cultural</option>
                            <option value="Deportiva" ${card.dataset.categoria === 'deportiva' ? 'selected' : ''}>Deportiva</option>
                            <option value="Educativa" ${card.dataset.categoria === 'educativa' ? 'selected' : ''}>Educativa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fecha">Fecha:</label>
                        <input type="date" id="fecha" value="${formatDateForInput(card.querySelector('.fecha').textContent)}" required>
                    </div>
                    <div class="form-group">
                        <label for="descripcion">Descripción:</label>
                        <textarea id="descripcion" rows="4">${card.querySelector('.descripcion-tarjeta').textContent}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="imagen">Cambiar imagen:</label>
                        <input type="file" id="imagen" accept="image/*">
                        <div class="vista-previa-imagen" id="vista-previa-imagen">
                            <img src="${card.querySelector('.imagen-tarjeta img').src}" alt="Imagen actual" style="max-width: 100%; max-height: 150px;">
                        </div>
                    </div>
                    <div class="form-acciones">
                        <button type="button" class="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(formulario);
        formulario.style.display = 'flex';

        const inputImagen = formulario.querySelector('#imagen');
        const vistaPrevia = formulario.querySelector('#vista-previa-imagen');

        inputImagen.addEventListener('change', function() {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = function(e) {
                    vistaPrevia.innerHTML = `<img src="${e.target.result}" alt="Nueva imagen" style="max-width: 100%; max-height: 150px;">`;
                }
                lector.readAsDataURL(archivo);
            }
        });

        formulario.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const titulo = formulario.querySelector('#titulo').value;
            const categoria = formulario.querySelector('#categoria').value;
            const fechaInput = formulario.querySelector('#fecha').value;
            const descripcion = formulario.querySelector('#descripcion').value;
            
            let imagenSrc = card.querySelector('.imagen-tarjeta img').src;
            if (inputImagen.files && inputImagen.files[0]) {
                imagenSrc = URL.createObjectURL(inputImagen.files[0]);
            }

            // Formatear fecha
            const fechaFormateada = formatDateFromInput(fechaInput);

            // Actualizar tarjeta
            card.querySelector('h4').textContent = titulo;
            card.querySelector('.fecha').textContent = fechaFormateada;
            card.dataset.categoria = categoria.toLowerCase();
            card.querySelector('.info-tarjeta p:first-child').textContent = `Categoría: ${categoria}`;
            card.querySelector('.descripcion-tarjeta').textContent = descripcion;
            card.querySelector('.imagen-tarjeta img').src = imagenSrc;
            card.querySelector('.imagen-tarjeta img').alt = titulo;
            
            document.body.removeChild(formulario);
            mostrarNotificacion('Actividad actualizada correctamente', 'exito');
        });

        formulario.querySelector('.btn-cancelar').addEventListener('click', function() {
            document.body.removeChild(formulario);
        });
    }

    function eliminarContenido(id, tipo) {
        if (!confirm(`¿Está seguro de eliminar esta ${tipo}? Esta acción no se puede deshacer.`)) return;
        
        const card = document.querySelector(`.tarjeta-${tipo === 'noticia' || tipo === 'transporte' || tipo === 'actividad' ? 'simple' : 'emprendimiento'}[data-id="${id}"]`);
        if (!card) return;
        
        card.style.opacity = '0.5';
        card.style.pointerEvents = 'none';
        
        setTimeout(() => {
            card.remove();
            mostrarNotificacion(`${tipo} eliminada correctamente`, 'exito');
        }, 300);
    }

    function verDetalles(id, tipo) {
        const card = document.querySelector(`.tarjeta-${tipo === 'noticia' || tipo === 'transporte' || tipo === 'actividad' ? 'simple' : 'emprendimiento'}[data-id="${id}"]`);
        if (!card) return;

        const modal = document.createElement('div');
        modal.className = 'modal-detalles';
        modal.innerHTML = `
            <div class="modal-contenido">
                <h3>Detalles de ${tipo}</h3>
                <div class="detalles-imagen">
                    <img src="${card.querySelector('.imagen-tarjeta img').src}" alt="${card.querySelector('h4').textContent}">
                </div>
                <div class="detalles-info">
                    <h4>${card.querySelector('h4').textContent}</h4>
                    ${Array.from(card.querySelectorAll('.info-tarjeta p')).map(p => `<p>${p.textContent}</p>`).join('')}
                    ${card.querySelector('.motivo-rechazo') ? `<p class="motivo-rechazo">${card.querySelector('.motivo-rechazo').textContent}</p>` : ''}
                </div>
                <div class="detalles-acciones">
                    <button class="btn-cerrar">Cerrar</button>
                    ${tipo === 'emprendimiento' && card.dataset.estado === 'pendiente' ? `
                    <button class="btn-editar-modal" data-id="${id}">Editar</button>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'flex';

        modal.querySelector('.btn-cerrar').addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        const btnEditar = modal.querySelector('.btn-editar-modal');
        if (btnEditar) {
            btnEditar.addEventListener('click', function() {
                document.body.removeChild(modal);
                editarContenido(id, tipo);
            });
        }
    }

    function mostrarFormularioNoticia() {

        window.location.href = 'Admin_panel/formulario_noticias';

        // const formulario = document.createElement('div');
        // formulario.className = 'modal-nuevo';
        // formulario.innerHTML = `
        //     <div class="modal-contenido">
        //         <h3>Crear Nueva Noticia</h3>
        //         <form id="form-nueva-noticia">
        //             <div class="form-group">
        //                 <label for="nuevo-titulo">Título:</label>
        //                 <input type="text" id="nuevo-titulo" required>
        //             </div>
        //             <div class="form-group">
        //                 <label for="nuevo-autor">Autor:</label>
        //                 <input type="text" id="nuevo-autor" required>
        //             </div>
        //             <div class="form-group">
        //                 <label for="nuevo-categoria">Categoría:</label>
        //                 <select id="nuevo-categoria" required>
        //                     <option value="Noticias">Noticias</option>
        //                     <option value="Anuncios">Anuncios</option>
        //                     <option value="Eventos">Eventos</option>
        //                 </select>
        //             </div>
        //             <div class="form-group">
        //                 <label for="nuevo-descripcion">Descripción:</label>
        //                 <textarea id="nuevo-descripcion" rows="4" required></textarea>
        //             </div>
        //             <div class="form-group">
        //                 <label for="nuevo-imagen">Imagen:</label>
        //                 <input type="file" id="nuevo-imagen" accept="image/*" required>
        //                 <div class="vista-previa-imagen" id="vista-previa-imagen"></div>
        //             </div>
        //             <div class="form-acciones">
        //                 <button type="button" class="btn-cancelar">Cancelar</button>
        //                 <button type="submit" class="btn-guardar">Publicar Noticia</button>
        //             </div>
        //         </form>
        //     </div>
        // `;

        // document.body.appendChild(formulario);
        // formulario.style.display = 'flex';

        // const inputImagen = formulario.querySelector('#nuevo-imagen');
        // const vistaPrevia = formulario.querySelector('#vista-previa-imagen');

        // inputImagen.addEventListener('change', function() {
        //     const archivo = this.files[0];
        //     if (archivo) {
        //         const lector = new FileReader();
        //         lector.onload = function(e) {
        //             vistaPrevia.innerHTML = `<img src="${e.target.result}" alt="Vista previa" style="max-width: 100%; max-height: 150px;">`;
        //         }
        //         lector.readAsDataURL(archivo);
        //     }
        // });

        // formulario.querySelector('form').addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     let imagenSrc = '/img/NoticiaEjm.png';
        //     if (inputImagen.files && inputImagen.files[0]) {
        //         imagenSrc = URL.createObjectURL(inputImagen.files[0]);
        //     }

        //     const nuevaNoticia = {
        //         id: Date.now(),
        //         titulo: formulario.querySelector('#nuevo-titulo').value,
        //         autor: formulario.querySelector('#nuevo-autor').value,
        //         fecha: new Date().toLocaleDateString('es-ES'),
        //         estado: 'publicado',
        //         categoria: formulario.querySelector('#nuevo-categoria').value,
        //         descripcion: formulario.querySelector('#nuevo-descripcion').value,
        //         imagen: imagenSrc
        //     };

        //     const card = crearTarjetaNoticia(nuevaNoticia);
        //     document.querySelector('#noticias .cuadricula-contenido').prepend(card);
            
        //     document.body.removeChild(formulario);
        //     mostrarNotificacion('Noticia creada correctamente', 'exito');
        // });

        // formulario.querySelector('.btn-cancelar').addEventListener('click', function() {
        //     document.body.removeChild(formulario);
        // });
    }

    function mostrarFormularioTransporte() {
        const formulario = document.createElement('div');
        formulario.className = 'modal-nuevo';
        formulario.innerHTML = `
            <div class="modal-contenido">
                <h3>Agregar Nuevo Transporte</h3>
                <form id="form-nuevo-transporte">
                    <div class="form-group">
                        <label for="transporte-nombre">Nombre:</label>
                        <input type="text" id="transporte-nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="transporte-tipo">Tipo:</label>
                        <select id="transporte-tipo" required>
                            <option value="Bus">Bus</option>
                            <option value="Taxi">Taxi</option>
                            <option value="Colectivo">Colectivo</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="transporte-horarios">Horarios:</label>
                        <input type="text" id="transporte-horarios" placeholder="Ej: Lunes a Viernes 6am-10pm o 24/7" required>
                    </div>
                    <div class="form-group">
                        <label for="transporte-tarifa">Tarifa:</label>
                        <input type="text" id="transporte-tarifa" placeholder="Ej: $2.50 o $3.50 base + $1.50/km" required>
                    </div>
                    <div class="form-group">
                        <label for="transporte-contacto">Contacto:</label>
                        <input type="text" id="transporte-contacto" placeholder="Ej: 2222-2222" required>
                    </div>
                    <div class="form-group">
                        <label for="transporte-imagen">Imagen del transporte:</label>
                        <input type="file" id="transporte-imagen" accept="image/*" required>
                        <div class="vista-previa-imagen" id="vista-previa-imagen"></div>
                    </div>
                    <div class="form-acciones">
                        <button type="button" class="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Guardar Transporte</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(formulario);
        formulario.style.display = 'flex';

        const inputImagen = formulario.querySelector('#transporte-imagen');
        const vistaPrevia = formulario.querySelector('#vista-previa-imagen');

        inputImagen.addEventListener('change', function() {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = function(e) {
                    vistaPrevia.innerHTML = `<img src="${e.target.result}" alt="Vista previa" style="max-width: 100%; max-height: 150px;">`;
                }
                lector.readAsDataURL(archivo);
            }
        });

        formulario.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let imagenSrc = '/img/transporte-ejemplo.jpg';
            if (inputImagen.files && inputImagen.files[0]) {
                imagenSrc = URL.createObjectURL(inputImagen.files[0]);
            }

            const nuevoTransporte = {
                id: Date.now(),
                nombre: formulario.querySelector('#transporte-nombre').value,
                tipo: formulario.querySelector('#transporte-tipo').value,
                horarios: formulario.querySelector('#transporte-horarios').value,
                tarifa: formulario.querySelector('#transporte-tarifa').value,
                contacto: formulario.querySelector('#transporte-contacto').value,
                imagen: imagenSrc
            };

            const card = crearTarjetaTransporte(nuevoTransporte);
            document.querySelector('#transporte .cuadricula-contenido').prepend(card);
            
            document.body.removeChild(formulario);
            mostrarNotificacion('Transporte creado correctamente', 'exito');
        });

        formulario.querySelector('.btn-cancelar').addEventListener('click', function() {
            document.body.removeChild(formulario);
        });
    }

    function mostrarFormularioActividad() {
        const formulario = document.createElement('div');
        formulario.className = 'modal-nuevo';
        formulario.innerHTML = `
            <div class="modal-contenido">
                <h3>Agregar Nueva Actividad</h3>
                <form id="form-nueva-actividad">
                    <div class="form-group">
                        <label for="actividad-titulo">Título:</label>
                        <input type="text" id="actividad-titulo" required>
                    </div>
                    <div class="form-group">
                        <label for="actividad-categoria">Categoría:</label>
                        <select id="actividad-categoria" required>
                            <option value="Cultural">Cultural</option>
                            <option value="Deportiva">Deportiva</option>
                            <option value="Educativa">Educativa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="actividad-fecha">Fecha:</label>
                        <input type="date" id="actividad-fecha" required>
                    </div>
                    <div class="form-group">
                        <label for="actividad-descripcion">Descripción:</label>
                        <textarea id="actividad-descripcion" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="actividad-imagen">Imagen:</label>
                        <input type="file" id="actividad-imagen" accept="image/*" required>
                        <div class="vista-previa-imagen" id="vista-previa-imagen"></div>
                    </div>
                    <div class="form-acciones">
                        <button type="button" class="btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-guardar">Publicar Actividad</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(formulario);
        formulario.style.display = 'flex';

        const inputImagen = formulario.querySelector('#actividad-imagen');
        const vistaPrevia = formulario.querySelector('#vista-previa-imagen');

        inputImagen.addEventListener('change', function() {
            const archivo = this.files[0];
            if (archivo) {
                const lector = new FileReader();
                lector.onload = function(e) {
                    vistaPrevia.innerHTML = `<img src="${e.target.result}" alt="Vista previa" style="max-width: 100%; max-height: 150px;">`;
                }
                lector.readAsDataURL(archivo);
            }
        });

        formulario.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let imagenSrc = '/img/actividad-ejemplo.jpg';
            if (inputImagen.files && inputImagen.files[0]) {
                imagenSrc = URL.createObjectURL(inputImagen.files[0]);
            }

            const fechaInput = formulario.querySelector('#actividad-fecha').value;
            const fechaFormateada = formatDateFromInput(fechaInput);

            const nuevaActividad = {
                id: Date.now(),
                titulo: formulario.querySelector('#actividad-titulo').value,
                categoria: formulario.querySelector('#actividad-categoria').value,
                fecha: fechaFormateada,
                descripcion: formulario.querySelector('#actividad-descripcion').value,
                imagen: imagenSrc
            };

            const card = crearTarjetaActividad(nuevaActividad);
            document.querySelector('#actividades .cuadricula-contenido').prepend(card);
            
            document.body.removeChild(formulario);
            mostrarNotificacion('Actividad creada correctamente', 'exito');
        });

        formulario.querySelector('.btn-cancelar').addEventListener('click', function() {
            document.body.removeChild(formulario);
        });
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
});