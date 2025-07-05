//Se crea una constante con todas las entradas del formulario
const inputs = document.querySelectorAll('#formulario input');

// Se crea un elemento formulario para manipular el evento Submit.
const formulario = document.getElementById("formulario");

// Se creta un Objeto expresiones que contiene todas las Expresiones
const expresiones ={
    //El nombre admite un primer elemento (nombre) con letras mayúsculas, minúsculas 
    nombre : /^[a-zA-ZÀ-ÿ]{3,10}\s[a-zA-ZÀ-ÿ]{2,10}(?:\s[a-zA-ZÀ-ÿ]{2,10})?$/, 
    password:/^.{4,12}$/, //Acepta todo Rango de 4 a 12
    correo :/^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/ , //Estructura dato1@dato2.dato3 dato1:acepta letras minusculas y mayusculas, numeros, y acepta guion bajo  dato2 y 3 : Aceptan solo letras mayusculas y minusculas
    telefono :/^\+?\d{8,15}$/ //Acepta digitos Rango es de 8 a 15. Permite ingresar un + al inicio para código de paisa.
}

// Se crea un objeto para mapear la validación de cada campo del formulario al momento de validar el formulario completo.
// Cada propiedad de este objeto será actualizada en las función de validación respectiva a la propiedad.
const campos={
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e)=>{
    switch(e.target.name){ //
        case "nombre":
            validarCampo(expresiones.nombre,e.target,"nombre");
        break;
        case "password":
            validarCampo(expresiones.password,e.target,"password");
            validarPassword2();
        break;
        case "password2":
            validarPassword2();
        break;
        case "correo":
            validarCampo(expresiones.correo,e.target,"correo")
        break;
        case "telefono":
            validarCampo(expresiones.telefono,e.target,"telefono")
        break;
    }
}

const validarCampo= (expresion,input,campo)=>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__${campo} i`).classList.remove("bxs-x-circle");
        document.querySelector(`#grupo__${campo} i`).classList.add("bxs-check-circle");
        campos[campo]=true;
    }else{        
        document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__${campo} i`).classList.add("bxs-x-circle");
        document.querySelector(`#grupo__${campo} i`).classList.remove("bxs-check-circle");
        campos[campo]=false;
    }
}

const validarPassword2=()=>{
    let inputPassword1= document.getElementById("password");
    let inputPassword2= document.getElementById("password2");

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
        document.querySelector(`#grupo__password2 i`).classList.add("bxs-x-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("bxs-check-circle");
        campos[password]=false;
    }else{
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
        document.querySelector(`#grupo__password2 i`).classList.remove("bxs-x-circle");
        document.querySelector(`#grupo__password2 i`).classList.add("bxs-check-circle");
        campos[password]=true;
    }

}


inputs.forEach((input)=>{
    input.addEventListener("keyup",validarFormulario)
    input.addEventListener("blur",validarFormulario)
})


formulario.addEventListener("submit",(e) =>{
    e.preventDefault();

    const terminos = document.getElementById("terminos");
    if(campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked){
        document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
        document.getElementById("formulario__mensaje-exito").classList.add("formulario__mensaje-exito-activo");

        setTimeout(()=>{
           location.reload(); 
        },4000)

    }else{
        document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");
    }

})