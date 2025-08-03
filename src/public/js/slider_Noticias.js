document.addEventListener('DOMContentLoaded', function () {
    const sliderNoticias = document.getElementById('slider-noticias');
    const diapositivas = sliderNoticias.getElementsByClassName('diapositiva-noticias');
    const flechaAnterior = document.querySelector('.flecha-anterior');
    const flechaSiguiente = document.querySelector('.flecha-siguiente');
    const contenedorPuntos = document.querySelector('.contenedor-puntos');
    const tituloSeccion = document.querySelector('.seccion-noticias h2');

    let indiceActual = 0;
    let inicioX;
    let estaDeslizando = false;

    // Definir las categorías para cada diapositiva
    const categorias = [
        'Seguridad',
        'Salud y Bienestar'
        // Aquí podemos agregar más categorías en el futuro dependiendo de los datos en la base de datos
        // Por ejemplo:
        // 'Eventos Comunitarios',
        // 'Medio Ambiente'
    ];

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
        actualizarTitulo();
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

    function actualizarTitulo() {
        const nuevaCategoria = categorias[indiceActual];
        
        if (tituloSeccion.textContent !== nuevaCategoria) {
            // efecto de desvanecimiento
            tituloSeccion.style.opacity = '0';
            tituloSeccion.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                tituloSeccion.textContent = nuevaCategoria;
                tituloSeccion.style.opacity = '1';
                tituloSeccion.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    // Eventos de las flechas
    flechaAnterior.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + diapositivas.length) % diapositivas.length;
        actualizarSlider();
        actualizarTitulo();
    });

    flechaSiguiente.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % diapositivas.length;
        actualizarSlider();
        actualizarTitulo();
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
        actualizarTitulo();
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
        actualizarTitulo();
        mousePresionado = false;
        sliderNoticias.style.cursor = 'grab';
    });

    sliderNoticias.addEventListener('mouseleave', () => {
        if (mousePresionado) {
            actualizarSlider();
            actualizarTitulo();
            mousePresionado = false;
            sliderNoticias.style.cursor = 'grab';
        }
    });

    // Estilo inicial del cursor
    sliderNoticias.style.cursor = 'grab';
});


//slider noticias 01

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del slider
    const contenedorSlider = document.querySelector('.ultima-noticia');
    const imagenSlider = contenedorSlider.querySelector('img');
    const botonIzquierdo = contenedorSlider.querySelector('.izquierda');
    const botonDerecho = contenedorSlider.querySelector('.derecha');
    const tituloNoticia = contenedorSlider.querySelector('h2');
    const descripcionNoticia = contenedorSlider.querySelector('p');
    const contenedorIndicadores = contenedorSlider.querySelector('.indicadores-noticias');
    
    // Crear array de noticias desde el HTML existente
    const noticias = [
        {
            imagen: '/img/Feria_Agricultor.jpeg',
            titulo: '¡Vení a la Feria del Agricultor y apoyá lo nuestro!',
            descripcion: 'Te invitamos a disfrutar de la auténtica frescura del campo en la Feria del Agricultor, donde encontrarás productos cultivados con esmero por manos costarricenses.'
        },
        {
            imagen: '/img/noticias_1.jpg',
            titulo: 'Empresa local de turismo ofrece tours guiados',
            descripcion: 'Empresa local de turismo ofrece tours guiados a diferentes playas de pais'
        },
        {
            imagen: '/img/noticias_2.jpg',
            titulo: 'Club de Exploradores de Nunciatura pide apoyo',
            descripcion: 'Club de Exploradores de Nunciatura pide apoyo para refugio de aves'
        },
        {
            imagen: '/img/noticias_3.jpg',
            titulo: 'Temblor en Parrita provocó más de 10 réplicas',
            descripcion: 'Temblor en Parrita provocó más de 10 réplicas, según Ovsicori'
        },
        {
            imagen: '/img/noticias_4.jpg',
            titulo: '¡Nunciatura se sacude!',
            descripcion: 'CNE reporta los puntos donde se sintió más fuerte el temblor.'
        },
        {
            imagen: '/img/noticias_5.jpg',
            titulo: 'Riña en Nunciatura termina en dos heridos',
            descripcion: 'Riña en Nunciatura termina en dos heridos y la captura del agresor'
        }
    ];

    let indiceActual = 0;
    let intervaloSlider;
    const duracionTransicion = 5000; // 5 segundos
    
    // Crear barra de progreso
    const barraProgreso = document.createElement('div');
    barraProgreso.className = 'barra-progreso';
    contenedorSlider.appendChild(barraProgreso);
    
    // Crear indicadores
    function crearIndicadores() {
        contenedorIndicadores.innerHTML = '';
        noticias.forEach((_, index) => {
            const indicador = document.createElement('div');
            indicador.className = 'indicador-noticia';
            if (index === indiceActual) indicador.classList.add('activo');
            indicador.addEventListener('click', () => {
                irANoticia(index);
            });
            contenedorIndicadores.appendChild(indicador);
        });
    }
    
    // Función para actualizar el slider
    function actualizarSlider() {
        const noticiaActual = noticias[indiceActual];
        imagenSlider.src = noticiaActual.imagen;
        tituloNoticia.textContent = noticiaActual.titulo;
        descripcionNoticia.textContent = noticiaActual.descripcion;
        
        // Actualizar indicadores
        document.querySelectorAll('.indicador-noticia').forEach((indicador, index) => {
            indicador.classList.toggle('activo', index === indiceActual);
        });
        
        // Reiniciar barra de progreso
        barraProgreso.style.width = '0%';
        clearInterval(intervaloSlider);
        iniciarAutoPlay();
    }
    
    // Función para ir a una noticia específica
    function irANoticia(index) {
        indiceActual = index;
        actualizarSlider();
    }
    
    // Función para siguiente noticia
    function siguienteNoticia() {
        indiceActual = (indiceActual + 1) % noticias.length;
        actualizarSlider();
    }
    
    // Función para noticia anterior
    function anteriorNoticia() {
        indiceActual = (indiceActual - 1 + noticias.length) % noticias.length;
        actualizarSlider();
    }
    
    // Event listeners
    botonDerecho.addEventListener('click', () => {
        siguienteNoticia();
    });
    
    botonIzquierdo.addEventListener('click', () => {
        anteriorNoticia();
    });
    
    // Pausar auto-play al interactuar
    contenedorSlider.addEventListener('mouseenter', () => {
        clearInterval(intervaloSlider);
        barraProgreso.style.width = '0%';
    });
    
    contenedorSlider.addEventListener('mouseleave', iniciarAutoPlay);
    
    // Inicializar
    crearIndicadores();
    actualizarSlider();
});