document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('#contenedor-slider-noticias');

    sliders.forEach(wrapper => {
        const slider = wrapper.querySelector('#slider-noticias');
        const slides = slider.querySelectorAll('.diapositiva-noticias');
        const btnPrev = wrapper.querySelector('.flecha-anterior');
        const btnNext = wrapper.querySelector('.flecha-siguiente');

        let index = 0;

        function updateSlider() {
            const slideWidth = slides[0].offsetWidth + 25; // ancho + gap
            slider.style.transform = `translateX(-${index * slideWidth}px)`;

            // Ocultar/mostrar flechas sin moverlas
            btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';
            btnNext.style.visibility = index >= slides.length - 1 ? 'hidden' : 'visible';
        }

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

        // Configuración inicial
        slider.style.display = 'flex';
        slider.style.transition = 'transform 0.3s ease';

        updateSlider();
    });

    // Slider de noticias recientes
    const slides = document.querySelectorAll('.slide-item');
    const miniaturas = document.querySelectorAll('.contenedor-noticia-reciente');
    let actual = 0;

    function mostrarSlide(idx) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === idx) ? 'block' : 'none';
            if (miniaturas[i]) {
                miniaturas[i].classList.toggle('activa', i === idx);
            }
        });
    }

    document.getElementById('slider-prev').onclick = function () {
        actual = (actual - 1 + slides.length) % slides.length;
        mostrarSlide(actual);
    };
    document.getElementById('slider-next').onclick = function () {
        actual = (actual + 1) % slides.length;
        mostrarSlide(actual);
    };

    miniaturas.forEach((miniatura, i) => {
        miniatura.onclick = function () {
            actual = i;
            mostrarSlide(actual);
        };
    });

    mostrarSlide(actual);

});