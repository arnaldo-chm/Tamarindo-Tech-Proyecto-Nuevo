document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('contenedor-emprendimientos');

  try {

    
    const respuesta = await fetch('http://localhost:3000/api/emprendimientos');

    if (!respuesta.ok) {
        throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }


    const datosRespuesta = await respuesta.json();

    if (datosRespuesta.resultado){
        // Se muestra el mensaje de aprobación en función de la validación.
        
        const emprendimientos = datosRespuesta.mensaje;

        emprendimientos.forEach(emprendimiento => {

            const a = document.createElement('a');
            a.innerHTML = `
                <div class="card" id="emprendimiento">
                    <img src="/img/${emprendimiento.nombreImagen}" class="img_emprendimiento" id="emprendimiento"
                        alt="" />
                    <h3 class="producto" id="producto">${emprendimiento.nombreEmprendimiento}</h3>
                    <p class="descripcion_emprendimiento" id="descripcion_emprendimiento">${emprendimiento.descripcionEmprendimiento}</p>
                    <p class="precio_emprendimiento" id="precio_emprendimiento">$${emprendimiento.precio}</p>
                    <p class="numero_emprendimiento" id="numero_emprendimiento">${emprendimiento.telefono}</p>
                    <!-- <p class="categoria_emprendimiento" id="categoria_emprendimiento">Salud</p> -->
                </div>
            `
            
            container.appendChild(a);

        })

    }else{
        alert(datosRespuesta.mensaje);
    }

  } catch (error) {
    alert(error);
  }
});