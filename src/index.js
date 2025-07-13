const express = require('express');

const app = express();
const path = require('path');

app.set('views',path.join(__dirname,'views')); //donde se encuentran las vistas
app.engine('html',require('ejs').renderFile);//Utilizamos la plantilla para los archivos html
app.set('view engine','ejs');//Motor de plantillas predeterminado

//Archivos staticos
app.use(express.static(path.join(__dirname,'public')));

//Encender el server
app.listen(3000,()=>{
    console.log("El server se conecto");
})

//Rutas
//    nombre ruta, accion
app.get('/',(req,res)=>{
    //direción, string
    //res.sendFile(path.join(__dirname,'views/paginaInicio.html'));
    res.render("inicio.html");//Renderiza la vista con el motor de plantillas
})

app.get('/login',(req,res)=>{
    res.render("login.html");
})

app.get('/Transportes',(req,res)=>{
    res.render("Transportes.html");
})


console.log(__dirname);