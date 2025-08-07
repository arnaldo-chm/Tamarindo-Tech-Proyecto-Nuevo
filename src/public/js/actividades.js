document.addEventListener('DOMContentLoaded', () => {
    const dias = document.querySelectorAll('.dia');

    dias.forEach(dia => {
        dia.addEventListener('click', async function () {
            const fecha = this.dataset.dia;

            try {
                const respuesta = await fetch(`/api/actividades/${fecha}`);
                const actividades = await respuesta.json();


                const lista = document.getElementById('lista-actividades');
                lista.innerHTML = '';

                if (actividades.length > 0) {
                    actividades.forEach(act => {
                        const li = document.createElement('li');
                        li.textContent = `${act.titulo} - ${act.hora}`;
                        lista.appendChild(li);
                    });
                } else {
                    lista.innerHTML = '<li>No hay actividades para este día.</li>';
                }

            } catch (error) {
                console.error('Error al cargar actividades:', error);
                document.getElementById('lista-actividades').innerHTML =
                    '<li>Error al obtener actividades.</li>';
            }
        });
    });
});
