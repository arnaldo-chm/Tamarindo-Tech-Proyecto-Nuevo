document.addEventListener('DOMContentLoaded', () => {

    // Como los datos se cargan desde la base de datos con EJS al renderizar el HTML. Se agrega lógica
    // para manejar de forma dinámica el slider. Y mostrar únicamente 1 elemento en celulares.
    // En Desktop se muestran 4 tarjetas.
     const ANCHO_MAXIMO_CELULAR = 600;

    // Función para saber cuantos elementos mostrar según el tamaño de pantalla
    // Además de implementar la lógica de responsive en el CSS, se debe implementar esta lógica
    // Para mostrar sólo una tarjeta
    function obtenerElementosPorDiapositiva() {
        return window.innerWidth <= ANCHO_MAXIMO_CELULAR ? 1 : 4;
    }

    // Selecciona todos los sliders que tengan el id "contenedor-slider-noticias"
    const contenedoresSliders = document.querySelectorAll('#contenedor-slider-noticias');

    contenedoresSliders.forEach((contenedor) => {
        const slider = contenedor.querySelector('#slider-noticias'); // Contenedor de las diapositivas
        const botonAnterior = contenedor.querySelector('.flecha-anterior'); // Flecha izquierda
        const botonSiguiente = contenedor.querySelector('.flecha-siguiente'); // Flecha derecha

        // Si falta alguno de estos elementos, no hacemos nada
        if (!slider || !botonAnterior || !botonSiguiente) return;

        let indiceActual = 0; // Punto actual en el slider
        let elementosPorDiapositiva = obtenerElementosPorDiapositiva(); // Cantidad de elementos por pantalla
        let listaDiapositivas = []; // Almacena las diapositivas generadas

        // Actualizar las diapositivas en el slider
        function crearDiapositivas({ mantenerIndice = false } = {}) {
            // Obtiene todas las tarjetas
            const tarjetas = Array.from(slider.querySelectorAll('.card'));

            // Limpia el contenedor
            slider.innerHTML = '';
            listaDiapositivas = [];

            // Agrupa las tarjetas en bloques
            for (let i = 0; i < tarjetas.length; i += elementosPorDiapositiva) {
                const divDiapositiva = document.createElement('div');
                divDiapositiva.className = 'diapositiva-noticias';
                tarjetas.slice(i, i + elementosPorDiapositiva).forEach((tarjeta) => divDiapositiva.appendChild(tarjeta));
                slider.appendChild(divDiapositiva);
                listaDiapositivas.push(divDiapositiva);
            }

            slider.style.display = 'flex';
            slider.style.transition = 'transform 0.3s ease';

            // Si no mantenemos el índice, volvemos al inicio
            if (!mantenerIndice) indiceActual = 0;
            indiceActual = Math.min(indiceActual, Math.max(0, listaDiapositivas.length - 1));

            actualizarSlider();
        }

        // Mueve el slider a la posición correcta
        function actualizarSlider() {
            const vista = contenedor.querySelector('.envoltorio-slider-noticias') || contenedor;
            const anchoVista = vista.clientWidth;

            // Mueve el slider usando transform
            slider.style.transform = `translateX(-${indiceActual * anchoVista}px)`;

            // Oculta las flechas cuando no hay más de 4 diapositivas.
            botonAnterior.style.visibility = indiceActual === 0 ? 'hidden' : 'visible';
            botonSiguiente.style.visibility = indiceActual >= listaDiapositivas.length - 1 ? 'hidden' : 'visible';
        }

        // Avanzar a la siguiente diapositiva
        botonSiguiente.addEventListener('click', () => {
            if (indiceActual < listaDiapositivas.length - 1) {
                indiceActual++;
                actualizarSlider();
            }
        });

        // Retroceder a la diapositiva anterior
        botonAnterior.addEventListener('click', () => {
            if (indiceActual > 0) {
                indiceActual--;
                actualizarSlider();
            }
        });

        // Ajustar el slider cuando cambia el tamaño de la ventana
        window.addEventListener('resize', () => {
            const siguienteCantidad = obtenerElementosPorDiapositiva();
            if (siguienteCantidad !== elementosPorDiapositiva) {
                elementosPorDiapositiva = siguienteCantidad;
                crearDiapositivas({ mantenerIndice: true }); // Se mantiene visible la noticia actual.
            } else {
                actualizarSlider();
            }
        });

        // Construir el slider por primera vez
        crearDiapositivas({ mantenerIndice: false });
    });

    // Slider de Ultimas noticias
    (function iniciarUltimasNoticias() {
        const diapositivas = document.querySelectorAll('.slide-item'); // Noticia pricipal en grande a la izquierda
        if (!diapositivas.length) return;

        const miniaturas = document.querySelectorAll('.contenedor-noticia-reciente'); // Noticias en pequeño a la derecha.
        const botonAnterior = document.getElementById('slider-prev');
        const botonSiguiente = document.getElementById('slider-next');

        let indiceActual = 0; // Indice de la noticia mostrada

        // Muestra una tarjeta al darle clic
        function mostrarDiapositiva(indice) {
            diapositivas.forEach((diapositiva, i) => {
                diapositiva.style.display = i === indice ? 'block' : 'none';
                if (miniaturas[i]) {
                    miniaturas[i].classList.toggle('activa', i === indice);
                }
            });
        }

        // Boton anterior
        if (botonAnterior) {
            botonAnterior.onclick = function () {
                indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
                mostrarDiapositiva(indiceActual);
            };
        }

        // Boton siguiente
        if (botonSiguiente) {
            botonSiguiente.onclick = function () {
                indiceActual = (indiceActual + 1) % diapositivas.length;
                mostrarDiapositiva(indiceActual);
            };
        }

        miniaturas.forEach((miniatura, i) => {
            miniatura.onclick = function () {
                indiceActual = i;
                mostrarDiapositiva(indiceActual);
            };
        });

        // Mostrar la primera noticia
        mostrarDiapositiva(indiceActual);
    })();
});
