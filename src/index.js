// Variables Globales
const express = require('express');
const path = require('path');
const app = express();

//Configuración de vsitas
app.set('views', path.join(__dirname, 'views')); //donde se encuentran las vistas
app.engine('html', require('ejs').renderFile);//Utilizamos la plantilla para los archivos html
app.set('view engine', 'ejs');//Motor de plantillas predeterminado

//Archivos staticos
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//#region Rutas principales
//nombre ruta, accion
app.get('/', (req, res) => {
    res.render("inicio.html");//Renderiza la vista con el motor de plantillas
});

app.get('/Logon', (req, res) => {
    res.render("index.html");
});

app.get('/login', (req, res) => {
    res.render("login.html");
});

app.get('/crear_emprendimiento', (req, res) => {
    res.render('crear_emprendimiento.html');
});

app.get('/noticias', (req, res) => {
    res.render('noticias.html');
});


app.get('/reportes', (req, res) => {
    res.render('reportes.html');
});

app.get('/Landing_page', (req, res) => {
    res.render('landingpage.html');
});

//#endregion

//#region Login
//Login
const User = require('../models/users.js');

app.post('/api/registrarse', (req, res) => {

    let data = new User({
        nombre: req.body.nombre,
        correo: req.body.correo,
        password: req.body.password,
        telefono: req.body.telefono,
        tipoUsuario: 0
    })

    data.save()
        .then(() => {
            console.log("Usuario registrado");
            const resultado = {
                resultado: true,
                mensaje: `usuario registrado con exito`
            }
            res.json(resultado);
        })

        .catch(err => {
            console.log("Error al guardar usuario:", err);
            const resultado = {
                resultado: false,
                mensaje: `Error al guardar usuario ${err}`
            }
            res.json(resultado);
        });

})

app.post('/api/iniciarsesion', (req, res) => {
    //paso 1: extarer la info de los usuarios
    let data = {
        correo: req.body.correo,
        password: req.body.password
    }

    const existeUser = async () => {
        //paso 2: buscar el usuario en la base de datos
        const usuario = await User.findOne({ correo: data.correo });
        //usuario {info usuario} si lo encuentra
        //usuario null si no lo encuentra

        if (usuario != null) {
            if (data.password == usuario.password) {
                console.log("Usuario autenticado");
                const resultado = {
                    resultado: true,
                    mensaje: `usuario autenticado con exito`
                }
                res.json(resultado);
            } else {
                console.log("Contraseña incorrecta");
                const resultado = {
                    resultado: false,
                    mensaje: `contraseña incorrecta`
                }
                res.json(resultado);
            }
        } else {
            console.log("No existe el usuario");
            const resultado = {
                resultado: false,
                mensaje: `usuario no existe`
            }
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

app.get('/emprendimientos', async (req, res) => {

    const emprendimientos = await Emprendimiento.find();

    res.render('emprendimientos.ejs', { emprendimientos: emprendimientos });
});

app.post('/api/registrarEmprendimiento', (req, res) => {

    let data = new Emprendimiento({
        correoUsuario: req.body.correoUsuario,
        nombreEmprendimiento: req.body.nombreEmprendimiento,
        descripcionEmprendimiento: req.body.descripcionEmprendimiento,
        categoria: req.body.categoria,
        telefono: req.body.telefono,
        precio: req.body.precio,
        nombreImagen: path.basename(req.body.archivo)
    })

    data.save()
        .then(() => {
            console.log("Emprendimiento registrado");
            const resultado = {
                resultado: true,
                mensaje: `Emprendimiento registrado con exito`
            }
            res.json(resultado);
        })

        .catch(err => {
            console.log("Error al guardar Emprendimiento:", err);
            const resultado = {
                resultado: false,
                mensaje: `Error al guardar Emprendimiento ${err}`
            }
            res.json(resultado);
        });

})

//#endregion

//#region Noticias
// NOTICIAS

const Noticia = require('../models/noticias.js');

app.post('/api/registrarNoticia', (req, res) => {

    console.log(req.body);
    let fecha = new Date()
    const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`

    let data = new Noticia({
        titulo: req.body.titulo,
        autor: req.body.autor,
        descripcionNoticia: req.body.descripcionNoticia,
        categoria: req.body.categoria,
        telefono: req.body.telefono,
        fecha: formatoFecha,
        nombreImagen: path.basename(req.body.archivo),
    })

    console.log(data);

    data.save()
        .then(() => {
            console.log("Noticia registrada");
            const resultado = {
                resultado: true,
                mensaje: `Noticia registrada con exito`
            }
            res.json(resultado);
        })

        .catch(err => {
            console.log("Error al guardar Noticia:", err);
            const resultado = {
                resultado: false,
                mensaje: `Error al guardar Noticia ${err}`
            }
            res.json(resultado);
        });

})

app.post('/api/editarNoticia', async(req, res) => {

    console.log(req.body);
    let fecha = new Date()
    const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`

    const noticia = await Noticia.findOne({ titulo: req.body.titulo });



    await Noticia.findByIdAndUpdate(noticia.id, {
        titulo: req.body.titulo,
        autor: req.body.autor,
        descripcionNoticia: req.body.descripcionNoticia,
        categoria: req.body.categoria,
        telefono: req.body.telefono,
        fecha: formatoFecha,
        nombreImagen: req.body.archivo,
})
    .then(() => {
        console.log("Noticia editada");
        const resultado = {
            resultado: true,
            mensaje: `Noticia editada con exito`
        }
        res.json(resultado);
    })

    .catch(err => {
        console.log("Error al editar Noticia:", err);
        const resultado = {
            resultado: false,
            mensaje: `Error al editar Noticia ${err}`
        }
        res.json(resultado);
    });

})

// Mostrar formulario de edición
app.get('/noticias/:id/editar', async (req, res) => {
    
    const noticia = await Noticia.findById(req.params.id);
    // console.log(noticia);

    if (!noticia) {
        return res.status(404).send('Noticia no encontrada');
    }
    res.render('editar_notica.ejs', { noticia:noticia });
});

//#endregion

//#region TRANSPORTE
const Transporte = require('../models/transportes.js');

app.get('/Transportes', async (req, res) => {

    const transportes = await Transporte.find();

    res.render('Transportes.ejs', { transportes: transportes });
});


app.post('/api/registrarTransporte', (req, res) => {

    console.log(req.body);

    let data = new Transporte({
        ruta: req.body.ruta,
        tarifa: req.body.tarifa,
        telefono: req.body.telefono,
        nombreImagen: path.basename(req.body.archivo),
    })

    console.log(data);

    data.save()
        .then(() => {
            console.log("Transporte registrado");
            const resultado = {
                resultado: true,
                mensaje: `Transporte registrado con exito`
            }
            res.json(resultado);
        })

        .catch(err => {
            console.log("Error al guardar Transporte:", err);
            const resultado = {
                resultado: false,
                mensaje: `Error al guardar Transporte ${err}`
            }
            res.json(resultado);
        });

})

app.post('/api/editarTransporte', async (req, res) => {
    try {
        let fecha = new Date();
        const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        // Busca el transporte por ID y actualiza los campos
        await Transporte.findByIdAndUpdate(req.body.id, {
            ruta: req.body.ruta,
            tarifa: req.body.tarifa,
            telefono: req.body.telefono,
            fecha: formatoFecha,
            nombreImagen: req.body.archivo,
        });
        res.json({ resultado: true, mensaje: 'Transporte editado con exito' });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al editar Transporte: ${err}` });
    }
});

// Mostrar formulario de edición
app.get('/Transportes/:id/editar', async (req, res) => {

    const transporte = await Transporte.findById(req.params.id);
    // console.log(transporte);

    if (!transporte) {
        return res.status(404).send('Transporte no encontrado');
    }
    res.render('editar_transporte.ejs', { transporte:transporte });
});

//#endregion

//#region ACTIVIDADES

const Actividad = require('../models/actividades.js');

app.get('/actividades', async (req, res) => {

    const actividades = await Actividad.find();

    res.render('actividades.ejs', { actividades: actividades });
});

app.post('/api/registrarActividad', (req, res) => {

    let data = new Actividad({
        titulo: req.body.titulo,
        descripcion_actividad: req.body.descripcion_actividad,
        recomendaciones_actividad: req.body.recomendaciones_actividad,
        duracion: req.body.duracion,
        nombreImagen: path.basename(req.body.archivo),
        fecha: req.body.fecha,
        hora: req.body.hora
    })

    console.log(data);

    data.save()
        .then(() => {
            console.log("Actividad registrada");
            const resultado = {
                resultado: true,
                mensaje: `Actividad registrada con exito`
            }
            res.json(resultado);
        })

        .catch(err => {
            console.log("Error al guardar Actividad:", err);
            const resultado = {
                resultado: false,
                mensaje: `Error al guardar Actividad ${err}`
            }
            res.json(resultado);
        });

})
//#region QUEJAS
const Queja = require('../models/quejas.js');

// Guardar una queja
app.post('/api/registrarQueja', async (req, res) => {
    try {
        const { nombre, reporte, archivo } = req.body;
        const fecha = new Date().toLocaleDateString('es-CR');
        const nuevaQueja = new Queja({ nombre, reporte, archivo: path.basename(req.body.archivo), fecha });
        await nuevaQueja.save();
        res.json({ resultado: true, mensaje: "Queja registrada con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al guardar Queja: ${err}` });
    }
});


//#endregion

//#region Admin Panel
app.get('/Admin_panel', async (req, res) => {

    const noticias = await Noticia.find();
    const emprendimientos = await Emprendimiento.find();
    const transportes = await Transporte.find();
    const actividades = await Actividad.find();
    const quejas = await Queja.find();
    const usuarios = await User.find(); 
    res.render('contenido-admin', { noticias: noticias, emprendimientos: emprendimientos, transportes: transportes, actividades: actividades, quejas: quejas, usuarios: usuarios });
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

app.get('/Admin_panel/crear_actividad', (req, res) => {
    res.render('crear_actividad.html');
});


//#endregion

//Encender el server
app.listen(3000, () => {
    console.log("El server se conecto");
})


console.log(__dirname);