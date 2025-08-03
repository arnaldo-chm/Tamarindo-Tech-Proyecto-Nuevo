// Variables Globales
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
app.use(bodyParser.urlencoded({extended:false}));

//#region Rutas principales
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

//#endregion
//Rutas principales

//#region Login
//Login
const User = require('../models/users.js');

app.post('/api/registrarse',(req,res)=>{
    
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

})

app.post('/api/iniciarsesion',(req,res)=>{
//paso 1: extarer la info de los usuarios
    let data = {
        correo:req.body.correo,
        password:req.body.password
    }

    const existeUser = async()=>{
        //paso 2: buscar el usuario en la base de datos
        const usuario = await User.findOne({correo:data.correo});
        //usuario {info usuario} si lo encuentra
        //usuario null si no lo encuentra

        if(usuario !=null){
            if (data.password == usuario.password){
                console.log("Usuario autenticado");
                const resultado = { 
                resultado: true,
                mensaje: `usuario autenticado con exito`}
                res.json(resultado);
            } else {
                console.log("Contraseña incorrecta");
                const resultado = { 
                resultado: false,
                mensaje: `contraseña incorrecta`}
                res.json(resultado);
            }
        }else{
            console.log("No existe el usuario");
            const resultado = { 
            resultado: false,
            mensaje: `usuario no existe`}
            res.json(resultado);
        }
    }

existeUser();
console.log("llamada desde post iniciarsesion")

})
//#endregion


//#region Emprendimientos
//Emprendimientos
const Emprendimiento = require('../models/emprendimientos.js');

app.post('/api/registrarEmprendimiento',(req,res)=>{
    
    let data = new Emprendimiento({
        correoUsuario:req.body.correoUsuario,
        nombreEmprendimiento:req.body.nombreEmprendimiento,
        descripcionEmprendimiento:req.body.descripcionEmprendimiento,
        categoria:req.body.categoria,
        telefono:req.body.telefono,
        precio:req.body.precio,
        nombreImagen:path.basename(req.body.archivo)
    })
    
    data.save()
    .then(()=>{
        console.log("Emprendimiento registrado");
        const resultado = { 
            resultado: true,
            mensaje: `Emprendimiento registrado con exito`}
        res.json(resultado);
    })

    .catch(err => {
        console.log("Error al guardar Emprendimiento:", err);
        const resultado = { 
            resultado: false,
            mensaje: `Error al guardar Emprendimiento ${err}`}
        res.json(resultado);
    });

})

app.get('/api/emprendimientos',(req,res)=>{

    const obtenerEmprendimientos = async()=>{

        try {
            const emprendimientos = await Emprendimiento.find();

            const resultado = { 
                resultado: true,
                mensaje: emprendimientos}
            res.json(resultado);

        } catch (error) {
            const resultado = { 
                resultado: false,
                mensaje: `Error al obtener emprendimientos ${error}`
            }
            res.json(resultado);
        }

    }


    obtenerEmprendimientos();
})
//#endregion

//#region Noticias
// NOTICIAS

const Noticia = require('../models/noticias.js');

app.post('/api/registrarNoticia',(req,res)=>{

    console.log(req.body);
    let fecha = new Date()
    const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
    
    let data = new Noticia({
        titulo:req.body.titulo,
        autor:req.body.autor,
        descripcionNoticia:req.body.descripcionNoticia,
        categoria:req.body.categoria,
        telefono:req.body.telefono,
        fecha: formatoFecha,
        nombreImagen:path.basename(req.body.archivo),
    })

    console.log(data);
    
    data.save()
    .then(()=>{
        console.log("Noticia registrada");
        const resultado = { 
            resultado: true,
            mensaje: `Noticia registrada con exito`}
        res.json(resultado);
    })

    .catch(err => {
        console.log("Error al guardar Noticia:", err);
        const resultado = { 
            resultado: false,
            mensaje: `Error al guardar Noticia ${err}`}
        res.json(resultado);
    });

})
//#endregion

//#region 
//TRANSPORTE

const Transporte = require('../models/transportes.js');
app.post('/api/registrarTransporte',(req,res)=>{

    console.log(req.body);
    
    let data = new Transporte({
        ruta:req.body.ruta,
        tarifa:req.body.tarifa,
        telefono:req.body.telefono,
        nombreImagen:path.basename(req.body.archivo),
    })

    console.log(data);
    
    data.save()
    .then(()=>{
        console.log("Transporte registrado");
        const resultado = { 
            resultado: true,
            mensaje: `Transporte registrado con exito`}
        res.json(resultado);
    })

    .catch(err => {
        console.log("Error al guardar Transporte:", err);
        const resultado = { 
            resultado: false,
            mensaje: `Error al guardar Transporte ${err}`}
        res.json(resultado);
    });

})

//#endregion


//#region Admin Panel
app.get('/Admin_panel', async(req, res) => {
    
    const noticias = await Noticia.find();
    const emprendimientos = await Emprendimiento.find();
    const transportes = await Transporte.find();

    res.render('contenido-admin',{noticias:noticias,emprendimientos:emprendimientos,transportes:transportes});
});

app.get('/Admin_panel/crear_noticia', (req, res) => {
    res.render('crear_noticia.html');
});

// app.get('/Admin_panel/editar_noticia',async(req,res)=>{

//     const noticaTitulo = req.query.titulo; 

//     if (noticaTitulo) {
//         const noticia = await user.findOne({titulo:noticaTitulo});
//         //paso 2: enviar por parametros
//         console.log(noticia);
//         res.render("/Admin_panel/editar_noticia",{noticia:noticia});
//     } else {
//         console.log("Usario no pasa el valor de noticia");
//         // res.send('No user ID provided in query.');
//     }

// })

app.get('/Admin_panel/crear_transporte', (req, res) => {
    res.render('crear_transporte.html');
});

//#endregion

//Encender el server
app.listen(3000,()=>{
    console.log("El server se conecto");
})

 
console.log(__dirname);