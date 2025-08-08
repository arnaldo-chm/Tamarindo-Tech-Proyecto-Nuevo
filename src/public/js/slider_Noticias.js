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
});