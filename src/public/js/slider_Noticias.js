document.addEventListener('DOMContentLoaded', function () {
            const sliderNoticias = document.getElementById('slider-noticias');
            const diapositivas = sliderNoticias.getElementsByClassName('diapositiva-noticias');
            const flechaAnterior = document.querySelector('.flecha-anterior');
            const flechaSiguiente = document.querySelector('.flecha-siguiente');
            const contenedorPuntos = document.querySelector('.contenedor-puntos');

            let indiceActual = 0;
            let inicioX;
            let estaDeslizando = false;

            // Crear puntos indicadores
            for (let i = 0; i < diapositivas.length; i++) {
                const punto = document.createElement('div');
                punto.classList.add('punto-slider');
                if (i === 0) punto.classList.add('activo');
                punto.addEventListener('click', () => irADiapositiva(i));
                contenedorPuntos.appendChild(punto);
            }

            function irADiapositiva(indice) {
                indiceActual = indice;
                actualizarSlider();
            }

            function actualizarSlider() {
                sliderNoticias.style.transform = `translateX(-${indiceActual * 100}%)`;
                actualizarPuntos();
            }

            function actualizarPuntos() {
                const puntos = document.querySelectorAll('.punto-slider');
                puntos.forEach((punto, indice) => {
                    punto.classList.toggle('activo', indice === indiceActual);
                });
            }

            // Eventos de las flechas
            flechaAnterior.addEventListener('click', () => {
                indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
                actualizarSlider();
            });

            flechaSiguiente.addEventListener('click', () => {
                indiceActual = (indiceActual + 1) % diapositivas.length;
                actualizarSlider();
            });

            // Eventos táctiles para móviles
            sliderNoticias.addEventListener('touchstart', (e) => {
                inicioX = e.touches[0].clientX;
                estaDeslizando = true;
            });

            sliderNoticias.addEventListener('touchmove', (e) => {
                if (!estaDeslizando) return;
                const actualX = e.touches[0].clientX;
                const diferencia = inicioX - actualX;
                sliderNoticias.style.transform = `translateX(calc(-${indiceActual * 100}% - ${diferencia}px))`;
            });

            sliderNoticias.addEventListener('touchend', (e) => {
                if (!estaDeslizando) return;
                const diferencia = inicioX - e.changedTouches[0].clientX;
                if (Math.abs(diferencia) > 50) {
                    if (diferencia > 0) {
                        indiceActual = (indiceActual + 1) % diapositivas.length;
                    } else {
                        indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
                    }
                }
                actualizarSlider();
                estaDeslizando = false;
            });

            // Eventos del mouse para escritorio
            let mousePresionado = false;
            let inicioMouseX;

            sliderNoticias.addEventListener('mousedown', (e) => {
                mousePresionado = true;
                inicioMouseX = e.clientX;
                sliderNoticias.style.cursor = 'grabbing';
            });

            sliderNoticias.addEventListener('mousemove', (e) => {
                if (!mousePresionado) return;
                const diferencia = inicioMouseX - e.clientX;
                sliderNoticias.style.transform = `translateX(calc(-${indiceActual * 100}% - ${diferencia}px))`;
            });

            sliderNoticias.addEventListener('mouseup', (e) => {
                if (!mousePresionado) return;
                const diferencia = inicioMouseX - e.clientX;
                if (Math.abs(diferencia) > 50) {
                    if (diferencia > 0) {
                        indiceActual = (indiceActual + 1) % diapositivas.length;
                    } else {
                        indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
                    }
                }
                actualizarSlider();
                mousePresionado = false;
                sliderNoticias.style.cursor = 'grab';
            });

            sliderNoticias.addEventListener('mouseleave', () => {
                if (mousePresionado) {
                    actualizarSlider();
                    mousePresionado = false;
                    sliderNoticias.style.cursor = 'grab';
                }
            });

            // Estilo inicial del cursor
            sliderNoticias.style.cursor = 'grab';
        });