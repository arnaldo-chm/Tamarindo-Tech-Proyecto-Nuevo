
document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Utilidades
    // =========================
    const MOBILE_BREAKPOINT = 600;

    function getItemsPerSlide() {
        return window.innerWidth <= MOBILE_BREAKPOINT ? 1 : 4;
    }

    function debounce(fn, wait) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    // =========================
    // Slider por categoría (dinámico)
    // =========================
    const sliders = document.querySelectorAll('#contenedor-slider-noticias');

    sliders.forEach((wrapper) => {
        const slider = wrapper.querySelector('#slider-noticias');
        const btnPrev = wrapper.querySelector('.flecha-anterior');
        const btnNext = wrapper.querySelector('.flecha-siguiente');

        // Si no hay slider o botones, salimos
        if (!slider || !btnPrev || !btnNext) return;

        let index = 0;
        let itemsPerSlide = getItemsPerSlide();
        let slides = [];

        function buildSlides({ preserveIndex = false } = {}) {
            // Tomamos todas las cards existentes (aunque ya estén dentro de otras diapositivas)
            const cards = Array.from(slider.querySelectorAll('.card'));

            // Limpiamos el contenedor (las cards se vuelven a insertar)
            slider.innerHTML = '';
            slides = [];

            for (let i = 0; i < cards.length; i += itemsPerSlide) {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'diapositiva-noticias';
                cards.slice(i, i + itemsPerSlide).forEach((card) => slideDiv.appendChild(card));
                slider.appendChild(slideDiv);
                slides.push(slideDiv);
            }

            slider.style.display = 'flex';
            slider.style.transition = 'transform 0.3s ease';

            // Mantener posición si se pidió, de lo contrario reiniciar
            if (!preserveIndex) index = 0;
            index = Math.min(index, Math.max(0, slides.length - 1));

            updateSlider();
        }

        function updateSlider() {
            // Cada .diapositiva-noticias ocupa 100% del ancho visible
            // Usamos el ancho del contenedor que encierra el carrusel
            const viewport = wrapper.querySelector('.envoltorio-slider-noticias') || wrapper;
            const viewportWidth = viewport.clientWidth;

            slider.style.transform = `translateX(-${index * viewportWidth}px)`;

            // Mostrar/Ocultar flechas sin cambiar layout
            btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';
            btnNext.style.visibility = index >= slides.length - 1 ? 'hidden' : 'visible';
        }

        // Controles
        btnNext.addEventListener('click', () => {
            if (index < slides.length - 1) {
                index++;
                updateSlider();
            }
        });

        btnPrev.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateSlider();
            }
        });

        // Para el responsive, reaccionar a cambios de tamaño (cambia 4  1 por slide)
        const onResize = debounce(() => {
            const nextItemsPerSlide = getItemsPerSlide();
            if (nextItemsPerSlide !== itemsPerSlide) {
                itemsPerSlide = nextItemsPerSlide;
                buildSlides({ preserveIndex: true });
            } else {
                updateSlider();
            }
        }, 150);

        window.addEventListener('resize', onResize);

        // Inicializar
        buildSlides({ preserveIndex: false });
    });

    // =========================
    // Slider "Lo más nuevo"
    // =========================
    (function initUltimasNoticias() {
        const slides = document.querySelectorAll('.slide-item');
        if (!slides.length) return;

        const miniaturas = document.querySelectorAll('.contenedor-noticia-reciente');
        const btnPrev = document.getElementById('slider-prev');
        const btnNext = document.getElementById('slider-next');

        let actual = 0;

        function mostrarSlide(idx) {
            slides.forEach((slide, i) => {
                slide.style.display = i === idx ? 'block' : 'none';
                if (miniaturas[i]) {
                    miniaturas[i].classList.toggle('activa', i === idx);
                }
            });
        }

        if (btnPrev) {
            btnPrev.onclick = function () {
                actual = (actual - 1 + slides.length) % slides.length;
                mostrarSlide(actual);
            };
        }

        if (btnNext) {
            btnNext.onclick = function () {
                actual = (actual + 1) % slides.length;
                mostrarSlide(actual);
            };
        }

        miniaturas.forEach((miniatura, i) => {
            miniatura.onclick = function () {
                actual = i;
                mostrarSlide(actual);
            };
        });

        mostrarSlide(actual);
    })();
});
