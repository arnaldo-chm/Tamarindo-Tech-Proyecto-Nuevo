document.addEventListener('DOMContentLoaded', () => {
    const dias = document.querySelectorAll('.dia');
    const modal = document.getElementById('modal-actividades');
    const cerrarBtn = document.getElementById('cerrar-modal');
    const contenedor = document.getElementById('contenido-modal');

    dias.forEach(dia => {
        dia.addEventListener('click', async function () {
            const fecha = this.dataset.dia;

            try {
                const respuesta = await fetch(`/api/actividades/${fecha}`);
                const actividades = await respuesta.json();

                contenedor.innerHTML = '';

                if (actividades.length > 0) {
                    actividades.forEach(act => {
                        const tarjeta = document.createElement('div');
                        tarjeta.classList.add('tarjeta-actividad');
                        tarjeta.style.cursor = 'pointer';

                        tarjeta.innerHTML = `
                            <img src="/img/${act.nombreImagen || 'actividad.jpg'}" alt="Imagen de actividad">
                            <h3>${act.titulo}</h3>
                            <p><strong>Fecha:</strong> ${act.fecha}</p>
                        `;


                        tarjeta.addEventListener('click', () => {
                            const tarjetasGenerales = document.querySelectorAll('.tarjeta[data-titulo]');
                            const tituloBuscado = act.titulo.trim().toLowerCase();

                            tarjetasGenerales.forEach(tarjetaGeneral => {
                                const tituloGeneral = tarjetaGeneral.dataset.titulo?.trim().toLowerCase();
                                if (tituloGeneral === tituloBuscado) {
                                    setTimeout(() => {
                                        tarjetaGeneral.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 100);
                                    modal.style.display = 'none';
                                    tarjetaGeneral.classList.add('tarjeta-destacada');

                                    setTimeout(() => {
                                        tarjetaGeneral.classList.remove('tarjeta-destacada');
                                    }, 1500);
                                }
                            });
                        });

                        contenedor.appendChild(tarjeta);
                    });
                } else {
                    contenedor.innerHTML = '<p>No hay actividades disponibles.</p>';
                }

                modal.style.display = 'flex';

            } catch (error) {
                console.error('Error al cargar actividades:', error);
                contenedor.innerHTML = '<p>Error al obtener actividades.</p>';
                modal.style.display = 'flex';
            }
        });
    });

    cerrarBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });


    const botonesInformacion = document.querySelectorAll('.boton-informacion');
    const modalesGenerales = document.querySelectorAll('.modal-general');

    botonesInformacion.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const idModal = boton.getAttribute('data-modal-id');
            const modal = document.getElementById(idModal);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    const botonesCerrarGeneral = document.querySelectorAll('.cerrar-modal-general');

    botonesCerrarGeneral.forEach(cerrar => {
        cerrar.addEventListener('click', () => {
            const modal = cerrar.closest('.modal-general');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.cerrar').forEach(cerrar => {
        cerrar.addEventListener('click', () => {
            const modalId = cerrar.dataset.modalId;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
});
