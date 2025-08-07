//Se crea una constante con todas las entradas del formulario
// Se excluye de la validación los inputs tipo file, submit y checkbox.
const inputs = document.querySelectorAll('#formulario input:not([type="submit"]):not([type="file"]):not([type="checkbox"]), #formulario textarea');
const inputDropdown = document.querySelector('#dropdown');
const inputFecha = document.querySelector('#fecha');

// Se crea un elemento formulario para manipular el evento Submit.
const formulario = document.getElementById("formulario");

// Se crea un Objeto expresiones que contiene todas las Expresiones regulares que se serán empleadas en validar
// que el usuario ingresa los datos con el patrón esperado en los formularios.
let expresiones = {};
if (formulario.name === "registrarse") {
    expresiones = {
        //El nombre admite 3 elementos separados por coma. Todos ellos admiten mayúsculas, minúsculas y signos de puntuación.
        // El patrón esperado es "Nombre PrimerApellido SegundoApellido(Opcional)". Si el usuario ingresa un espacio después del primer apellido, el segundo apellido es obligatorio
        // Nombre 3 a 10 letras, Primer Apellido 2 a 10 Letras, Segundo Apellido 2 a 10 letras.
        nombre: /^[a-zA-ZÀ-ÿ]{3,10}\s[a-zA-ZÀ-ÿ]{2,10}(?:\s[a-zA-ZÀ-ÿ]{2,10})?$/,
        password: /^.{4,12}$/, //Acepta todo caracter Rango de 4 a 12
        correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/, //Estructura dato1@dato2.dato3 dato1:acepta letras minusculas y mayusculas, numeros, y acepta guion bajo  dato2 y 3 : Aceptan solo letras mayusculas y minusculas
        telefono: /^\+?\d{8,11}$/ //Acepta de 8 a 15 digitos. Permite ingresar un + al inicio para código de pais.
    }
} else if (formulario.name === "iniciarsesion") {
    // Esta validación es temporal, mientras se implementa la validación de usuario y contraseña contra la base de datos.
    expresiones = {
        correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/, // Misma expresion regular usada para el correo en Registrarse.
        password: /^.{4,12}$/, //Misma expresion regular usada en la contraseña para Registrarse.      
    }
} else if (formulario.name === "registrar_emprendimiento") {
    expresiones = {
        // nombre : /^[a-zA-ZÀ-ÿ]{3,10}\s[a-zA-ZÀ-ÿ]{2,10}(?:\s[a-zA-ZÀ-ÿ]{2,10})?$/,  // Misma expresion regular usada para el nombre en Registrarse.
        correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/, // Misma expresion regular usada para el correo en Registrarse.
        nombre_emprendimiento: /^[a-zA-Z0-9À-ÿ\s\_\-]{5,20}$/, // Nombre Emprendimiento acepta un rango de 5 a 15 caracteres, incluyendo una combinación de letras minúsculas, mayúsculas, guión, guión bajo, espacios y acentos.
        descripcion_emprendimiento: /^.{10,}$/, // Descripcion Emprendimiento Acepta 10 o más caracteres de cualquier tipo        
        telefono: /^\+?\d{8,11}$/, // Misma expresion regular usada para el nombre en Registrarse.
        precio: /^\d{1,5}$/ //El precio acepta entre 1 y 5 digitos
    }
} else if (formulario.name === "crear_reporte") {
    expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ]{3,10}\s[a-zA-ZÀ-ÿ]{2,10}(?:\s[a-zA-ZÀ-ÿ]{2,10})?$/,  // Misma expresion regular usada para el nombre en Registrarse.
        reporte: /^.{10,}$/, // Reporte Acepta 10 o más caracteres de cualquier tipo        
    }
} else if (formulario.name === "registrar_noticia" || formulario.name === "editar_noticia") {
    expresiones = {
        titulo: /^[a-zA-Z0-9À-ÿ\s]{5,50}$/, // Titulo Noticia acepta un rango de 5 a 50 caracteres, incluyendo una combinación de letras minúsculas, mayúsculas, números, espacios y acentos.
        autor: /^[a-zA-ZÀ-ÿ]{3,10}\s[a-zA-ZÀ-ÿ]{2,10}(?:\s[a-zA-ZÀ-ÿ]{2,10})?$/,  // Misma expresion regular usada para el nombre en Registrarse.
        descripcion_noticia: /^.{10,}$/, // Descripcion Emprendimiento Acepta 10 o más caracteres de cualquier tipo   
        telefono: /^\+?\d{8,11}$/, // Misma expresion regular usada para el nombre en Registrarse.  
    }
}
else if (formulario.name === "registrar_transporte" || formulario.name === "editar_transporte") {
    expresiones = {
        ruta: /^[a-zA-Z0-9À-ÿ\s\_\-]{5,50}$/, // Ruta Transporte acepta un rango de 5 a 50 caracteres, incluyendo una combinación de letras minúsculas, mayúsculas, números, espacios, acentos y guiones.        
        telefono: /^\+?\d{8,11}$/, // Misma expresion regular usada para el nombre en Registrarse. 
        tarifa: /^\d{1,5}$/ //El precio acepta entre 1 y 5 digitos 
    }
}
else if (formulario.name === "registrar_actividad" || formulario.name === "editar_actividad") {
    expresiones = {
        titulo: /^[a-zA-Z0-9À-ÿ\s\_\-]{5,50}$/, // Ruta Transporte acepta un rango de 5 a 50 caracteres, incluyendo una combinación de letras minúsculas, mayúsculas, números, espacios, acentos y guiones.        
        descripcion_actividad: /^.{10,}$/, // Descripcion Acepta 10 o más caracteres de cualquier tipo   
        recomendaciones_actividad: /^.{10,}$/ // Recomendaciones Acepta 10 o más caracteres de cualquier tipo
    }
}


// Se crea un objeto para mapear la validación de cada campo del formulario al momento de validar el formulario completo.
// Cada propiedad de este objeto será actualizada en las función de validación respectiva a la propiedad.
// Para crear un archivo de Javascript Dinámico, se crea un objeto de campos específico para cada formulario.
let campos = {};
if (formulario.name === "registrarse") {
    campos = {
        nombre: false,
        password: false,
        correo: false,
        telefono: false
    }
} else if (formulario.name === "iniciarsesion") {
    campos = {
        correo: false,
        password: false
    }
} else if (formulario.name === "registrar_emprendimiento") {
    campos = {
        // nombre: false,
        correo: false,
        nombre_emprendimiento: false,
        descripcion_emprendimiento: false,
        telefono: false,
        precio: false
    }
} else if (formulario.name === "crear_reporte") {
    campos = {
        nombre: false,
        reporte: false
    }
} else if (formulario.name === "registrar_noticia") {
    campos = {
        titulo: false,
        autor: false,
        descripcion_noticia: false,
        dropdown: false,
        telefono: false
    }

}
else if (formulario.name === "editar_noticia") {
    campos = {
        titulo: true,
        autor: true,
        descripcion_noticia: true,
        dropdown: true,
        telefono: true
    }

}
else if (formulario.name === "editar_transporte") {
    campos = {
        ruta: true,
        tarifa: true,
        telefono: true,
        archivo: true
    }
} else if (formulario.name === "editar_actividad") {
    campos = {
        titulo: true,
        descripcion_actividad: true,
        recomendaciones_actividad: true,
        duracion: true,
        fecha: true,
        hora: true
    }
}
else if (formulario.name === "registrar_transporte") {
    campos = {
        ruta: false,
        telefono: false,
        tarifa: false,
    }
}
else if (formulario.name === "registrar_actividad") {
    campos = {
        titulo: false,
        descripcion_actividad: false,
        recomendaciones_actividad: false,
        duracion: false,
        fecha: false,
        hora: false
    }
}

// Función validarFormulario
// Esta Función se encarga de dirigir la validación de cada campo a la función de validación correspondiente.
// Recibe el evento, y basado en el Nombre del Target del evento, define la función.
const validarFormulario = (e) => {
    switch (e.target.name) { //
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            if (formulario.name === "registrarse") {
                validarPassword2();
            }
            break;
        case "password2":
            validarPassword2();
            break;
        case "dropdown":
            validarDropdown();
            break;
        case "fecha":
            validarFecha();
            break;
        case "duracion":
            validarDuracion();
            break;
        default:
            validarCampo(expresiones[e.target.name], e.target, e.target.name)
            break;
    }
}

// Función Validar Campo
// Esta Función se encarga de validar cada campo en el formulario acorde a la expresión regular que se ha definido para cada campo.
// Recibe como parámetro la expresión regular, el target del evento, y el nombre del input o campo.
// Se encarga de comprobar si el valor ingresado por el usuario cumple con la expresión regular, y actualiza el estilo del input/campo
// según el resultado de esa validación.
const validarCampo = (expresion, input, campo) => {
    try {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
            document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
            document.querySelector(`#grupo__${campo} i`).classList.remove("bxs-x-circle");
            document.querySelector(`#grupo__${campo} i`).classList.add("bxs-check-circle");
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
            document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
            document.querySelector(`#grupo__${campo} i`).classList.add("bxs-x-circle");
            document.querySelector(`#grupo__${campo} i`).classList.remove("bxs-check-circle");
            campos[campo] = false;
        }
    } catch (error) {
        window.alert(error)
    }

}

// Función validarPassword2
// Esta función se encarga de validar que el Password Ingresado por el usuario, coincide con el Password2 ingresado por el usuario.
// Actualiza el estilo del input/campo password2 según el resultado de esa validación.
const validarPassword2 = () => {
    let inputPassword1 = document.getElementById("password");
    let inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__password2 i`).classList.add("bxs-x-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("bxs-check-circle");
        campos["password"] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__password2 i`).classList.remove("bxs-x-circle");
        document.querySelector(`#grupo__password2 i`).classList.add("bxs-check-circle");
        campos["password"] = true;
    }

}

const validarDropdown = () => {
    let inputDropdown = document.getElementById("dropdown");

    if (inputDropdown.value == "default") {
        document.getElementById(`grupo__dropdown`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__dropdown`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__dropdown .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__dropdown i`).classList.add("bxs-x-circle");
        document.querySelector(`#grupo__dropdown i`).classList.remove("bxs-check-circle");
        campos["dropdown"] = false;
    } else {
        document.getElementById(`grupo__dropdown`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__dropdown`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__dropdown .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__dropdown i`).classList.remove("bxs-x-circle");
        document.querySelector(`#grupo__dropdown i`).classList.add("bxs-check-circle");
        campos["dropdown"] = true;
    }
}

const validarFecha = () => {
    console.log("Validando Fecha");

    const fechaHora = document.getElementById('fecha');
    const valor = fechaHora.value;

    console.log(fechaHora);
    console.log(valor);

    if (!valor) {
        document.getElementById(`grupo__fecha`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__fecha`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__fecha .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__fecha i`).classList.add("bxs-x-circle");
        document.querySelector(`#grupo__fecha i`).classList.remove("bxs-check-circle");
        campos["fecha"] = false;
        campos["hora"] = false;
    } else {
        const fechaSeleccionada = new Date(valor);
        const ahora = new Date();

        if (fechaSeleccionada > ahora) {
            document.getElementById(`grupo__fecha`).classList.remove("formulario__grupo-incorrecto");
            document.getElementById(`grupo__fecha`).classList.add("formulario__grupo-correcto");
            document.querySelector(`#grupo__fecha .formulario__input-error`).classList.remove("formulario__input-error-activo");
            document.querySelector(`#grupo__fecha i`).classList.remove("bxs-x-circle");
            document.querySelector(`#grupo__fecha i`).classList.add("bxs-check-circle");
            campos["fecha"] = true;
            campos["hora"] = true;
        } else {
            document.getElementById(`grupo__fecha`).classList.add("formulario__grupo-incorrecto");
            document.getElementById(`grupo__fecha`).classList.remove("formulario__grupo-correcto");
            document.querySelector(`#grupo__fecha .formulario__input-error`).classList.add("formulario__input-error-activo");
            document.querySelector(`#grupo__fecha i`).classList.add("bxs-x-circle");
            document.querySelector(`#grupo__fecha i`).classList.remove("bxs-check-circle");
            campos["fecha"] = false;
            campos["hora"] = false;
        }

    }

}

const validarDuracion = () => {
    console.log("Validando Duracion");
    let duracion = document.getElementById("duracion");

    if (duracion.value <= 0) {
        document.getElementById(`grupo__duracion`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__duracion`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__duracion .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__duracion i`).classList.add("bxs-x-circle");
        document.querySelector(`#grupo__duracion i`).classList.remove("bxs-check-circle");
        campos["duracion"] = false;
    } else {
        document.getElementById(`grupo__duracion`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__duracion`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__duracion .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__duracion i`).classList.remove("bxs-x-circle");
        document.querySelector(`#grupo__duracion i`).classList.add("bxs-check-circle");
        campos["duracion"] = true;
    }

}

// Para cada input seleccionado para validar, se crean los EventListeners para llamar a la función validarFormulario 
// cada vez que el usuario ingrese un caracter, o bien elimine el foco de un input.
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario)
    input.addEventListener("blur", validarFormulario)
})

if (inputDropdown != null) {
    inputDropdown.addEventListener("change", validarFormulario);
}

if (inputFecha != null) {
    inputFecha.addEventListener("input", validarFormulario);
    inputFecha.addEventListener("change", validarFormulario);
}


async function registrarUsuario() {
    let datos = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        password: document.getElementById("password").value,
        telefono: document.getElementById("telefono").value
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/registrarse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "login";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
        //    console.log('Respuesta del backend:', datosRespuesta);
        //    // Actualizar la interfaz con los datos recibidos
        //    document.getElementById('resultado').textContent = datosRespuesta.mensaje;

    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function iniciarsesion() {
    let datos = {
        correo: document.getElementById("correo").value,
        password: document.getElementById("password").value
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/iniciarsesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }

    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function registrarEmprendimiento() {
    let datos = {
        // nombre:document.getElementById("nombre").value,
        correoUsuario: document.getElementById("correo").value,
        nombreEmprendimiento: document.getElementById("nombre_emprendimiento").value,
        descripcionEmprendimiento: document.getElementById("descripcion_emprendimiento").value,
        categoria: document.getElementById("dropdown").value,
        telefono: document.getElementById("telefono").value,
        precio: document.getElementById("precio").value,
        archivo: document.getElementById("archivo").value
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/registrarEmprendimiento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "crear_emprendimiento";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function registrarNoticia() {

    console.log("Funcion registrarNoticia");
    let datos = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        descripcionNoticia: document.getElementById("descripcion_noticia").value,
        categoria: document.getElementById("dropdown").value,
        archivo: document.getElementById("archivo").value,
        telefono: document.getElementById("telefono").value,
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/registrarNoticia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/Admin_panel";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function editarNoticia() {

    console.log("Funcion editarNoticia");
    let datos = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        descripcionNoticia: document.getElementById("descripcion_noticia").value,
        categoria: document.getElementById("dropdown").value,
        archivo: document.getElementById("archivo").value,
        telefono: document.getElementById("telefono").value,
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/editarNoticia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/Admin_panel";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function registrarTransporte() {

    console.log("Funcion registrarTransporte");
    let datos = {
        ruta: document.getElementById("ruta").value,
        tarifa: document.getElementById("tarifa").value,
        archivo: document.getElementById("archivo").value,
        telefono: document.getElementById("telefono").value,
    }

    console.log(datos);

    try {
        const respuesta = await fetch('http://localhost:3000/api/registrarTransporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/Admin_panel";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function editarTransporte() {

    console.log("Funcion editarTransporte");
    let datos = {
        id: document.querySelector('input[name="id"]').value,
        ruta: document.getElementById("ruta").value,
        tarifa: document.getElementById("tarifa").value,
        archivo: document.getElementById("archivo").value,
        telefono: document.getElementById("telefono").value,
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/editarTransporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/Admin_panel";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function registrarActividad() {

    console.log("Funcion registrarActividad");

    const duracion = document.getElementById("fecha");
    const valorfecha = duracion.value; // ejemplo: "2025-08-03T14:30"
    const [fecha, hora] = valorfecha.split("T");

    let datos = {
        titulo: document.getElementById("titulo").value,
        descripcion_actividad: document.getElementById("descripcion_actividad").value,
        recomendaciones_actividad: document.getElementById("recomendaciones_actividad").value,
        duracion: document.getElementById("duracion").value,
        archivo: document.getElementById("archivo").value,
        fecha: fecha,
        hora: hora,
    }

    console.log(datos);

    try {
        const respuesta = await fetch('http://localhost:3000/api/registrarActividad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/Admin_panel";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}

async function editarActividad() {

    console.log("Funcion editarActividad");
    const valorFecha = document.getElementById("fecha").value; // ejemplo: "2025-08-03T14:30"
    let fecha = "";
    let hora = "";
    if (valorFecha && valorFecha.includes("T")) {
        [fecha, hora] = valorFecha.split("T");
    }
    let datos = {
        id: document.querySelector('input[name="id"]').value,
        titulo: document.getElementById("titulo").value,
        descripcion_actividad: document.getElementById("descripcion_actividad").value,
        recomendaciones_actividad: document.getElementById("recomendaciones_actividad").value,
        fecha: fecha,
        hora: hora,
        archivo: document.getElementById("archivo").value,
        duracion: document.getElementById("duracion").value
    }

    try {
        const respuesta = await fetch('http://localhost:3000/api/editarActividad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            // Se muestra el mensaje de aprobación en función de la validación.
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

            setTimeout(() => {
                window.location.href = "/Admin_panel";
            }, 4000)

        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}


async function registrarQueja() {
    let datos = {
        nombre: document.getElementById("nombre").value,
        reporte: document.getElementById("reporte").value,
        archivo: document.getElementById("archivo").value
    };

    try {
        const respuesta = await fetch('http://localhost:3000/api/registrarQueja', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) throw new Error(`Error en la solicitud: ${respuesta.status}`);

        const datosRespuesta = await respuesta.json();
        if (datosRespuesta.resultado) {
            document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
            document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");
            setTimeout(() => { window.location.href = "/"; }, 4000);
        } else {
            alert(datosRespuesta.mensaje);
        }
    } catch (error) {
        console.error('Error al llamar al backend:', error);
        document.getElementById('resultado').textContent = 'Error al obtener datos';
    }
}


// Se crea un EventListener para el evento submit del Formulario.
formulario.addEventListener("submit", (e) => {

    // Se elimina el comportamiento por defecto para que no recargue la página y el usuario no pierda la información ingresada.
    e.preventDefault();
    const terminos = document.getElementById("terminos");
    let validacion = true;

    console.log(campos);
    // Se valida que cada campo está completo y validado.
    for (const key in campos) {
        if (campos[key] === false) {
            validacion = false;
        }
    }

    // Se valida que si el checkbox de terminos y condiciones existe, este esté debidamente seleccionado.
    if (terminos !== null && !terminos.checked) {
        validacion = false;
    }

    // Se valida que cada campo está completo y validado.
    if (validacion === true) {

        if (formulario.name === "iniciarsesion") {
            iniciarsesion();
        } else if (formulario.name === "registrarse") {
            registrarUsuario();
        } else if (formulario.name == "registrar_emprendimiento") {
            console.log("Llamando a Registrar Emprendimiento")
            registrarEmprendimiento();
        }
        else if (formulario.name == "registrar_noticia") {
            console.log("Llamando a Registrar Noticia")
            registrarNoticia();
        }
        else if (formulario.name == "registrar_transporte") {
            console.log("Llamando a Registrar Transporte")
            registrarTransporte();
        }
        else if (formulario.name == "registrar_actividad") {
            console.log("Llamando a Registrar Actividad")
            registrarActividad();
        }
        else if (formulario.name == "crear_reporte") {
            registrarQueja();
        }
        else if (formulario.name === "editar_noticia") {
            console.log("Llamando a Editar Noticia")
            editarNoticia();
        } else if (formulario.name === "editar_transporte") {
            console.log("Llamando a Editar Transporte")
            editarTransporte();
        } else if (formulario.name === "editar_actividad") {
            console.log("Llamando a Editar Actividad")
            editarActividad();
        }


    } else {

        // Se muestra el mensaje de error en función de la validación.
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }

})