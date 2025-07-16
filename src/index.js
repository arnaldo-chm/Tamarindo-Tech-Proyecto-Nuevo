const express = require('express');
const path = require('path');

const app = express();

//Configuración de vsitas
app.set('views',path.join(__dirname,'views')); //donde se encuentran las vistas
app.engine('html',require('ejs').renderFile);//Utilizamos la plantilla para los archivos html
app.set('view engine','ejs');//Motor de plantillas predeterminado


//Archivos staticos
app.use(express.static(path.join(__dirname,'public')));


//Rutas principales
//nombre ruta, accion
app.get('/',(req,res)=>{
    res.render("inicio.html");//Renderiza la vista con el motor de plantillas
});

app.get('/LogOn',(req,res)=>{
    res.render("index.html");
});

app.get('/login',(req,res)=>{
    res.render("login.html");
});

app.get('/emprendimientos', (req, res) => {
    res.render('emprendimientos.html');
});

app.get('/crear_emprendimiento', (req, res) => {
    res.render('crear_emprendimiento.html');
});

app.get('/noticias', (req, res) => {
    res.render('noticias.html');
});

app.get('/Transportes',(req,res)=>{
    res.render("Transportes.html");
});

app.get('/actividades', (req, res) => {
    res.render('actividades.html');
});

app.get('/reportes', (req, res) => {
    res.render('reportes.html');
});

app.get('/Landing_page', (req, res) => {
    res.render('landingpage.html');
});

app.get('/Admin_panel', (req, res) => {
    res.render('Admin_panel.html');
});



//Encender el server
app.listen(3000,()=>{
    console.log("El server se conecto");
})

 
console.log(__dirname);