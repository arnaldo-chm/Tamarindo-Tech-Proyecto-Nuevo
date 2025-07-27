const express = require('express');
const path = require('path');

const app = express();

//Configuración de vsitas
app.set('views',path.join(__dirname,'views')); //donde se encuentran las vistas
app.engine('html',require('ejs').renderFile);//Utilizamos la plantilla para los archivos html
app.set('view engine','ejs');//Motor de plantillas predeterminado


//Archivos staticos
app.use(express.static(path.join(__dirname,'public')));


const bodyParser = require('body-parser');
app.use(bodyParser.json());
//{"nombre": "steph","edad":25}
//req.body.nombre -----steph
//req.body.edad ---- 25
app.use(bodyParser.urlencoded({extended:false}));

//Rutas principales
//nombre ruta, accion
app.get('/',(req,res)=>{
    res.render("inicio.html");//Renderiza la vista con el motor de plantillas
});

app.get('/Logon',(req,res)=>{
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

//Login
const User = require('../models/users.js');

app.post('/registrarse',(req,res)=>{
    
     let data = new User({
        nombre:req.body.nombre,
        correo:req.body.correo,
        password:req.body.password,
        telefono:req.body.telefono,
        tipoUsuario:0
    })

    data.save()
    .then(()=>{
        console.log("Usuario registrado");
        const resultado = { 
            resultado: true,
            mensaje: `usuario registrado con exito`}
        res.json(resultado);
    })

    .catch(err => {
        console.log("Error al guardar usuario:", err);
        const resultado = { 
            resultado: false,
            mensaje: `Error al guardar usuario ${err}`}
        res.json(resultado);
    });

    // console.log(req.body)
    // console.log("llamada desde post logon")
    //  res.json(resultado);
})

app.post('/authenticate',(req,res)=>{
//paso 1: extarer la info de los usuarios
    let data = {
        correo:req.body.correo,
        password:req.body.password
    }

    const existeUser = async()=>{
        //paso 2: buscar el usuario en la base de datos
        const usuario = await user.findOne({correo:data.correo});
        //usuario {info usuario} si lo encuentra
        //usuario null si no lo encuentra

        if(usuario !=null){
            if (data.password == usuario.password){
                console.log("Usuario autenticado");
                res.redirect('/'); //Redirigir a la página de inicio
                
            } else {
                console.log("Contraseña incorrecta");
                res.redirect('/login');
            }
        }else{
            console.log("No existe el usuario");
            res.redirect('/login');
        }
    }

existeUser();

})

//Encender el server
app.listen(3000,()=>{
    console.log("El server se conecto");
})

 
console.log(__dirname);