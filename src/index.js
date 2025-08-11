// Variables Globales
const express = require('express');
const path = require('path');
const app = express();

// Se Agrega la validacion de usuarios
const session = require('express-session')
//Configuracion de Session
app.use(session({
    secret: 'ASHSDYUDUDUSDISDSQWDWSDDW',
    resave: false,
    saveUninitialized: false
}))

function isAuthenticated(req, res, next) {

    // Se verifica que la sesion del usuario existe 
    if (req.session && req.session.user) {
        return next();
    } else {
        console.log('El usuario no está autenticado');
        return res.redirect('/login');
    }
}

function isAdmin(req, res, next) {

    // Se verifica que la sesion del usuario existe y es admin
    if (req.session && req.session.user && req.session.user.tipoUsuario === 2) {
        return next();
    } else {
        console.log('El usuario no está autenticado o no es admin');
        return res.redirect('/');
    }
}


//Configuración de vistas
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
app.get('/', isAuthenticated, async (req, res) => {

    // Verifica si el usuario es administrador
    const usuarioAdministrador = req.session.user && req.session.user.tipoUsuario === 2;
    try {
        
        const noticias = await Noticia.find();

        const noticiasRecientes = noticias
            .sort((a, b) => b.fecha.localeCompare(a.fecha))
            .slice(0, 3);

        const actividades = await Actividad.find();

        const actividadesRecientes = actividades
            .sort((a, b) => b.fecha.localeCompare(a.fecha))
            .slice(0, 3);

        res.render("inicio.ejs", { usuarioAdministrador, noticiasRecientes, actividadesRecientes });//Renderiza la vista con el motor de plantillas
    }catch{
        console.log("Error al cargar la página de inicio");
        res.render("inicio.ejs", { usuarioAdministrador, noticiasRecientes: [], actividadesRecientes: [] });//Renderiza la vista con el motor de plantillas
    }
    
});

app.get('/Logon', (req, res) => {
    res.render("index.html");
});

app.get('/login', (req, res) => {
    res.render("login.html");
});

app.get('/crear_emprendimiento', isAuthenticated, (req, res) => {

    const correoUsuario = req.session.user ? req.session.user.correo : '';

    res.render('crear_emprendimiento.ejs', { correoUsuario });
});

app.get('/noticias', isAuthenticated, async (req, res) => {
    try {
        const noticias = await Noticia.find().lean();

        const noticiasPorCategoria = {};

        noticias.forEach(noticia => {
            if (!noticiasPorCategoria[noticia.categoria]) {
                noticiasPorCategoria[noticia.categoria] = [];
            }
            noticiasPorCategoria[noticia.categoria].push(noticia);
        });

        const noticiasRecientes = noticias
            .sort((a, b) => b.fecha.localeCompare(a.fecha))
            .slice(0, 4);

        res.render('noticias.ejs', { noticiasPorCategoria, noticiasRecientes });

    } catch (error) {
    console.error("Error al cargar noticias:", error);
    res.render('noticias.ejs', { noticiasPorCategoria: {}, noticiasRecientes: [] });
    }
});


app.get('/reportes', isAuthenticated, (req, res) => {
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

                // Se Guarda la información del usuario en la sesión
                // para validar al usuario validado
                req.session.user = {
                    id: usuario._id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    tipoUsuario: usuario.tipoUsuario
                };

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

})
//#endregion

//#region Logout
// Middleware utilizado para verificar si el usuario está autenticado


app.get('/logout', (req, res) => {

    console.log("Cerrando sesión...");
    // Se destruye la sesion para evitar que el usuario pueda
    // acceder al dashboard despues de cerrar la sesion.
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/login');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});
//#endregion

//#region Emprendimientos
//Emprendimientos
const Emprendimiento = require('../models/emprendimientos.js');
const EmprendimientoPendiente = require('../models/emprendimientosPendientes.js');

app.get('/emprendimientos', isAuthenticated, async (req, res) => {
    const emprendimientos = await Emprendimiento.find({ estadoEmprendimiento: "Aprobado" });

    let emprendimientosUsuario = [];
    let emprendimientosPendientesUsuario = [];

    if (req.session.user) {
        // Emprendimientos aprobados del usuario
        if (req.session.user.tipoUsuario > 0) {
            emprendimientosUsuario = await Emprendimiento.find({ correoUsuario: req.session.user.correo });
        }
        // Emprendimientos pendientes del usuario
        emprendimientosPendientesUsuario = await EmprendimientoPendiente.find({ correoUsuario: req.session.user.correo });
    }

    res.render('emprendimientos.ejs', {
        emprendimientos: emprendimientos,
        emprendimientosUsuario: emprendimientosUsuario,
        emprendimientosPendientesUsuario: emprendimientosPendientesUsuario
    });
});

// REGISTRO DE EMPRENDIMIENTO
app.post('/api/registrarEmprendimiento', isAuthenticated, async (req, res) => {
    if (req.session && req.session.user) {
        // Ahora tanto tipoUsuario 0 como 1 deben pasar por aprobación
        if (req.session.user.tipoUsuario === 0 || req.session.user.tipoUsuario === 1) {
            // Guardar en pendientes
            let data = new EmprendimientoPendiente({
                correoUsuario: req.body.correoUsuario,
                nombreEmprendimiento: req.body.nombreEmprendimiento,
                descripcionEmprendimiento: req.body.descripcionEmprendimiento,
                categoria: req.body.categoria,
                telefono: req.body.telefono,
                precio: req.body.precio,
                nombreImagen: path.basename(req.body.archivo)
            });

            try {
                await data.save();
                res.json({
                    resultado: true,
                    mensaje: "Gracias por subir tu emprendimiento, nuestros administradores revisarán la información. Si tienes dudas no dudes en crear un reporte."
                });
            } catch (err) {
                res.json({
                    resultado: false,
                    mensaje: `Error al guardar Emprendimiento Pendiente: ${err}`
                });
            }
        } else if (req.session.user.tipoUsuario === 2) {
            // Admin: guardar directamente
            let data = new Emprendimiento({
                correoUsuario: req.body.correoUsuario,
                nombreEmprendimiento: req.body.nombreEmprendimiento,
                descripcionEmprendimiento: req.body.descripcionEmprendimiento,
                categoria: req.body.categoria,
                telefono: req.body.telefono,
                precio: req.body.precio,
                nombreImagen: path.basename(req.body.archivo),
                estadoEmprendimiento: "Aprobado"
            });

            try {
                await data.save();
                res.json({
                    resultado: true,
                    mensaje: "Emprendimiento registrado con éxito"
                });
            } catch (err) {
                res.json({
                    resultado: false,
                    mensaje: `Error al guardar Emprendimiento: ${err}`
                });
            }
        } else {
            res.json({
                resultado: false,
                mensaje: "No tiene permisos para registrar emprendimientos."
            });
        }
    } else {
        res.json({
            resultado: false,
            mensaje: "Debe iniciar sesión para registrar emprendimientos."
        });
    }
});

// ADMIN: APROBAR EMPRENDIMIENTO PENDIENTE
app.post('/api/aprobarEmprendimiento', isAdmin, async (req, res) => {
    try {
        const pendiente = await EmprendimientoPendiente.findById(req.body.id);
        if (!pendiente) return res.json({ resultado: false, mensaje: "Emprendimiento pendiente no encontrado" });

        // Guardar en principal
        let data = new Emprendimiento({
            correoUsuario: pendiente.correoUsuario,
            nombreEmprendimiento: pendiente.nombreEmprendimiento,
            descripcionEmprendimiento: pendiente.descripcionEmprendimiento,
            categoria: pendiente.categoria,
            telefono: pendiente.telefono,
            precio: pendiente.precio,
            nombreImagen: pendiente.nombreImagen,
            estadoEmprendimiento: "Aprobado"
        });
        await data.save();

        // Cambiar usuario a tipo 1
        await User.findOneAndUpdate({ correo: pendiente.correoUsuario }, { tipoUsuario: 1 });

        // Eliminar de pendientes
        await EmprendimientoPendiente.findByIdAndDelete(req.body.id);

        res.json({ resultado: true, mensaje: "Emprendimiento aprobado y publicado" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al aprobar: ${err}` });
    }
});

// ADMIN: RECHAZAR EMPRENDIMIENTO PENDIENTE (con motivo)
app.post('/api/rechazarEmprendimiento', isAdmin, async (req, res) => {
    try {
        const { id, motivo } = req.body;
        // Actualiza el estado y guarda el motivo de rechazo
        await EmprendimientoPendiente.findByIdAndUpdate(id, {
            estadoEmprendimiento: "Rechazado",
            motivoRechazo: motivo
        });
        res.json({ resultado: true, mensaje: "Emprendimiento rechazado y motivo guardado" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al rechazar: ${err}` });
    }
});

// Eliminar Emprendimiento aprobado
app.post('/api/eliminarEmprendimiento', isAdmin, async (req, res) => {
    try {
        await Emprendimiento.findByIdAndDelete(req.body.id);
        res.json({ resultado: true, mensaje: "Emprendimiento eliminado con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al eliminar Emprendimiento: ${err}` });
    }
});

// Mostrar formulario de edición de emprendimiento (usuario)
app.get('/emprendimiento/:id/editar', isAuthenticated, async (req, res) => {
    const emprendimiento = await Emprendimiento.findById(req.params.id);
    if (!emprendimiento) {
        return res.status(404).send('Emprendimiento no encontrado');
    }
    // Solo el dueño puede editar
    if (req.session.user.correo !== emprendimiento.correoUsuario) {
        return res.status(403).send('No tienes permisos para editar este emprendimiento');
    }
    res.render('editar_emprendimiento.ejs', { emprendimiento });
});

// Mostrar formulario de edición de emprendimiento pendiente (rechazado)
app.get('/emprendimientoPendiente/:id/editar', isAuthenticated, async (req, res) => {
    const pendiente = await EmprendimientoPendiente.findById(req.params.id);
    if (!pendiente) {
        return res.status(404).send('Emprendimiento pendiente no encontrado');
    }
    if (req.session.user.correo !== pendiente.correoUsuario) {
        return res.status(403).send('No tienes permisos para editar este emprendimiento');
    }
    res.render('editar_emprendimiento_pendiente.ejs', { emprendimiento: pendiente });
});

// Editar y reenviar emprendimiento pendiente (emprendedor)
app.post('/api/editarEmprendimientoPendiente', isAuthenticated, async (req, res) => {
    try {
        const pendiente = await EmprendimientoPendiente.findById(req.body.id);
        if (!pendiente) {
            return res.json({ resultado: false, mensaje: 'Emprendimiento pendiente no encontrado' });
        }
        if (req.session.user.correo !== pendiente.correoUsuario) {
            return res.json({ resultado: false, mensaje: 'No tienes permisos para editar este emprendimiento' });
        }
        await EmprendimientoPendiente.findByIdAndUpdate(req.body.id, {
            nombreEmprendimiento: req.body.nombreEmprendimiento,
            descripcionEmprendimiento: req.body.descripcionEmprendimiento,
            categoria: req.body.categoria,
            telefono: req.body.telefono,
            precio: req.body.precio,
            nombreImagen: req.body.archivo ? path.basename(req.body.archivo) : pendiente.nombreImagen,
            estadoEmprendimiento: "Pendiente",
            motivoRechazo: ""
        });
        res.json({ resultado: true, mensaje: 'Emprendimiento editado y reenviado para aprobación' });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al editar y reenviar: ${err}` });
    }
});

// Eliminar emprendimiento pendiente (emprendedor)
app.post('/emprendimientoPendiente/:id/eliminar', isAuthenticated, async (req, res) => {
    const pendiente = await EmprendimientoPendiente.findById(req.params.id);
    if (!pendiente) {
        return res.status(404).send('Emprendimiento pendiente no encontrado');
    }
    if (req.session.user.correo !== pendiente.correoUsuario) {
        return res.status(403).send('No tienes permisos para eliminar este emprendimiento');
    }
    await EmprendimientoPendiente.findByIdAndDelete(req.params.id);
    res.redirect('/emprendimientos');
});

// Eliminar emprendimiento (usuario)
app.post('/emprendimiento/:id/eliminar', isAuthenticated, async (req, res) => {
    try {
        const emprendimiento = await Emprendimiento.findById(req.params.id);
        if (!emprendimiento) {
            return res.status(404).send('Emprendimiento no encontrado');
        }
        if (req.session.user.correo !== emprendimiento.correoUsuario) {
            return res.status(403).send('No tienes permisos para eliminar este emprendimiento');
        }
        await Emprendimiento.findByIdAndDelete(req.params.id);
        res.redirect('/emprendimientos');
    } catch (err) {
        res.status(500).send('Error al eliminar el emprendimiento');
    }
});

// Editar emprendimiento aprobado (usuario) - ahora también pasa por aprobación
app.post('/api/editarEmprendimiento', isAuthenticated, async (req, res) => {
    try {
        const emprendimiento = await Emprendimiento.findById(req.body.id);
        if (!emprendimiento) {
            return res.json({ resultado: false, mensaje: 'Emprendimiento no encontrado' });
        }
        if (req.session.user.correo !== emprendimiento.correoUsuario) {
            return res.json({ resultado: false, mensaje: 'No tienes permisos para editar este emprendimiento' });
        }
        // Al editar, se elimina el aprobado y se crea un pendiente para aprobación
        await Emprendimiento.findByIdAndDelete(req.body.id);
        let data = new EmprendimientoPendiente({
            correoUsuario: req.session.user.correo,
            nombreEmprendimiento: req.body.nombreEmprendimiento,
            descripcionEmprendimiento: req.body.descripcionEmprendimiento,
            categoria: req.body.categoria,
            telefono: req.body.telefono,
            precio: req.body.precio,
            nombreImagen: req.body.archivo ? path.basename(req.body.archivo) : emprendimiento.nombreImagen,
            estadoEmprendimiento: "Pendiente"
        });
        await data.save();
        res.json({ resultado: true, mensaje: 'Emprendimiento editado y enviado para aprobación' });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al editar y enviar para aprobación: ${err}` });
    }
});

//#endregion

//#region Noticias
// NOTICIAS

const Noticia = require('../models/noticias.js');

app.post('/api/registrarNoticia', isAdmin, (req, res) => {

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

app.post('/api/editarNoticia', isAdmin, async (req, res) => {

    console.log(req.body);
    let fecha = new Date()
    const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`

    const noticia = await Noticia.findById(req.body.id);

    await Noticia.findByIdAndUpdate(req.body.id, {
        titulo: req.body.titulo,
        autor: req.body.autor,
        descripcionNoticia: req.body.descripcionNoticia,
        categoria: req.body.categoria,
        telefono: req.body.telefono,
        fecha: formatoFecha,
        nombreImagen: req.body.archivo ? path.basename(req.body.archivo) : noticia.nombreImagen // Mantener la imagen actual si no se proporciona una nueva
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
app.get('/noticias/:id/editar', isAdmin, async (req, res) => {

    const noticia = await Noticia.findById(req.params.id);
    // console.log(noticia);

    if (!noticia) {
        return res.status(404).send('Noticia no encontrada');
    }
    res.render('editar_notica.ejs', { noticia: noticia });
});

// Eliminar Noticia
app.post('/api/eliminarNoticia', isAdmin, async (req, res) => {
    try {
        await Noticia.findByIdAndDelete(req.body.id);
        res.json({ resultado: true, mensaje: "Noticia eliminada con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al eliminar Noticia: ${err}` });
    }
});

// Eliminar Queja
app.post('/api/eliminarQueja', isAdmin, async (req, res) => {
    try {
        await Queja.findByIdAndDelete(req.body.id);
        res.json({ resultado: true, mensaje: "Queja eliminada con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al eliminar Queja: ${err}` });
    }
});

// Eliminar Miembro (Usuario)
app.post('/api/eliminarUsuario', isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.id);
        res.json({ resultado: true, mensaje: "Usuario eliminado con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al eliminar Usuario: ${err}` });
    }
});


//#endregion

//#region TRANSPORTE
const Transporte = require('../models/transportes.js');

app.get('/Transportes', isAuthenticated, async (req, res) => {

    const transportes = await Transporte.find();

    res.render('Transportes.ejs', { transportes: transportes });
});


app.post('/api/registrarTransporte', isAdmin, (req, res) => {

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

app.post('/api/editarTransporte', isAdmin, async (req, res) => {
    try {
        let fecha = new Date();
        const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        // Busca el transporte por ID
        const transporte = await Transporte.findById(req.body.id);

        // Busca el transporte por ID y actualiza los campos
        await Transporte.findByIdAndUpdate(req.body.id, {
            ruta: req.body.ruta,
            tarifa: req.body.tarifa,
            telefono: req.body.telefono,
            fecha: formatoFecha,
            nombreImagen: req.body.archivo ? path.basename(req.body.archivo) : transporte.nombreImagen // Mantener la imagen actual si no se proporciona una nueva
        });
        res.json({ resultado: true, mensaje: 'Transporte editado con exito' });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al editar Transporte: ${err}` });
    }
});

// Mostrar formulario de edición
app.get('/Transportes/:id/editar', isAdmin, async (req, res) => {

    const transporte = await Transporte.findById(req.params.id);
    // console.log(transporte);

    if (!transporte) {
        return res.status(404).send('Transporte no encontrado');
    }
    res.render('editar_transporte.ejs', { transporte: transporte });
});

// Eliminar Transporte
app.post('/api/eliminarTransporte', isAdmin, async (req, res) => {
    try {
        await Transporte.findByIdAndDelete(req.body.id);
        res.json({ resultado: true, mensaje: "Transporte eliminado con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al eliminar Transporte: ${err}` });
    }
});

//#endregion

//#region ACTIVIDADES


const Actividad = require('../models/actividades.js');

// Renderiza la vista con todas las actividades
app.get('/actividades', isAuthenticated, async (req, res) => {
    try {
        const actividades = await Actividad.find();
        // res.render('actividades.ejs', { actividades: actividades });
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const hoy = new Date();
        res.render('actividades', {
            actividades,
            mesActual: hoy.getMonth() + 1,
            anioActual: hoy.getFullYear(),
            nombreMesActual: meses[hoy.getMonth()]
        });

    } catch (err) {
        console.error("Error al cargar actividades:", err);
        res.status(500).send("Error al cargar actividades");
    }
});

// Devuelve actividades por fecha (usado por el frontend)
app.get('/api/actividades/:fecha', isAuthenticated, async (req, res) => {
    try {
        const fecha = req.params.fecha;
        const actividades = await Actividad.find({ fecha: fecha });
        res.json(actividades);
    } catch (err) {
        console.error("Error al buscar actividades:", err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post('/api/registrarActividad', isAuthenticated, (req, res) => {

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

// Mostrar formulario de edición
app.post('/api/editarActividad', isAuthenticated, async (req, res) => {
    try {
        let fecha = new Date();
        const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        // Busca la actividad por ID
        const actividad = await Actividad.findById(req.body.id);
        // Busca el transporte por ID y actualiza los campos
        await Actividad.findByIdAndUpdate(req.body.id, {
            titulo: req.body.titulo,
            descripcion_actividad: req.body.descripcion_actividad,
            recomendaciones_actividad: req.body.recomendaciones_actividad,
            duracion: req.body.duracion,
            fecha: formatoFecha,
            nombreImagen: req.body.archivo ? path.basename(req.body.archivo) : actividad.nombreImagen // Mantener la imagen actual si no se proporciona una nueva
        });
        res.json({ resultado: true, mensaje: 'Actividad editada con exito' });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al editar Actividad: ${err}` });
    }
});

// Mostrar formulario de edición
app.get('/Actividades/:id/editar', isAuthenticated, async (req, res) => {

    const actividad = await Actividad.findById(req.params.id);
    // console.log(actividad);

    if (!actividad) {
        return res.status(404).send('Actividad no encontrada');
    }
    res.render('editar_actividad.ejs', { actividad: actividad });
});

// Eliminar Actividad
app.post('/api/eliminarActividad', isAuthenticated, async (req, res) => {
    try {
        await Actividad.findByIdAndDelete(req.body.id);
        res.json({ resultado: true, mensaje: "Actividad eliminada con éxito" });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al eliminar Actividad: ${err}` });
    }
});

//#endregion ACTIVIDADES

//#region QUEJAS
const Queja = require('../models/quejas.js');

// Guardar una queja
app.post('/api/registrarQueja', isAuthenticated, async (req, res) => {
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
app.get('/Admin_panel', isAdmin, async (req, res) => {

    if (!req.session.user || req.session.user.tipoUsuario !== 2) {
        return res.redirect('/');
    }

    const noticias = await Noticia.find();
    const emprendimientos = await Emprendimiento.find();
    const transportes = await Transporte.find();
    const actividades = await Actividad.find();
    const quejas = await Queja.find();
    const usuarios = await User.find();
    const emprendimientosPendientes = await EmprendimientoPendiente.find();
    res.render('contenido-admin', {
        noticias: noticias,
        emprendimientos: emprendimientos,
        emprendimientosPendientes: emprendimientosPendientes,
        transportes: transportes,
        actividades: actividades,
        quejas: quejas,
        usuarios: usuarios
    });
});

app.get('/Admin_panel/crear_noticia', isAdmin, (req, res) => {
    res.render('crear_noticia.html');
});


app.get('/Admin_panel/crear_transporte', isAdmin, (req, res) => {
    res.render('crear_transporte.html');
});

app.get('/Admin_panel/crear_actividad', isAdmin, (req, res) => {
    res.render('crear_actividad.html');
});

// Mostrar formulario de edición
app.get('/usuario/:id/editar', isAdmin, async (req, res) => {

    const usuario = await User.findById(req.params.id);
    // console.log(usuario);

    if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.render('editar_usuario.ejs', { usuario: usuario });
});

app.post('/api/editarUsuario', isAdmin, async (req, res) => {
    
     try {
        // Busca el transporte por ID y actualiza los campos
        await User.findByIdAndUpdate(req.body.id, {
            nombre: req.body.nombre,
            correo: req.body.correo,
            password: req.body.password,
            telefono: req.body.telefono,
            tipoUsuario: req.body.tipoUsuario
        });
        res.json({ resultado: true, mensaje: 'Usuario editado con exito' });
    } catch (err) {
        res.json({ resultado: false, mensaje: `Error al editar Usuario: ${err}` });
    }

});

//#endregion

//Encender el server
app.listen(3000, () => {
    console.log("El server se conecto");
})

//#region CARGAR DATOS INICIALES

// Cargar datos iniciales en la base de datos
async function cargarDatosIniciales() {
    try {
        // Crear un usuario administrador por default
        const adminExistente = await User.findOne({ correo: 'admin@tamarindo.com' });
        if (!adminExistente) {
            const admin = new User({
                nombre: 'Admin',
                correo: 'admin@tamarindo.com',
                password: 'admin123',
                telefono: '+50612345678',
                tipoUsuario: 2 // 2 = Admin
            });
            await admin.save();
            console.log('Usuario administrador creado');
        }

        // Crear Noticias
        
        const fecha = new Date();
        const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
        let noticiaExistente = await Noticia.findOne({ titulo: 'Feria de Vacunación' });
        if (!noticiaExistente) {
            const noticia = new Noticia({
                titulo: 'Feria de Vacunación',
                autor: 'Equipo Tamarindo',
                descripcionNoticia: 'Feria de Vacunación en el Parque Metropolitano la Sabana',
                categoria: 'Eventos',
                telefono: '+50612345679',
                fecha: formatoFecha,
                nombreImagen: 'noticias_7.jpg'
            });
            await noticia.save();
            console.log('Noticia de bienvenida creada');
        }

        noticiaExistente = await Noticia.findOne({ titulo: 'Fuerte Terremoto' });
        if (!noticiaExistente) {
            const noticia = new Noticia({
                titulo: 'Fuerte Terremoto',
                autor: 'Equipo Tamarindo',
                descripcionNoticia: 'Fuerte Terremoto sacude la región',
                categoria: 'General',
                telefono: '+50612345678',
                fecha: formatoFecha,
                nombreImagen: 'noticias_3.jpg'
            });
            await noticia.save();
            console.log('Noticia de bienvenida creada');
        }

        noticiaExistente = await Noticia.findOne({ titulo: 'Camaras de Seguridad Instaladas' });
        if (!noticiaExistente) {
            const noticia = new Noticia({
                titulo: 'Camaras de Seguridad Instaladas',
                autor: 'Equipo Tamarindo',
                descripcionNoticia: 'Se han instalado nuevas cámaras de seguridad en la zona',
                categoria: 'General',
                telefono: '89808070',
                fecha: formatoFecha,
                nombreImagen: 'camaras_de_seguridad.png'
            });
            await noticia.save();
            console.log('Noticia de bienvenida creada');
        }

        // Cargar Actividades
        const actividadExistente = await Actividad.findOne({ titulo: 'Taller de Alfatería' });
        if (!actividadExistente) {
            const actividad = new Actividad({
                titulo: "Taller de Alfatería",
                descripcion_actividad: "Únete a nuestro Taller de Alfarería",
                recomendaciones_actividad: "Todos los materiales están incluidos en la actividad",
                duracion: 1.5,
                nombreImagen: "Actividades_TrabajoEnBarro.png",
                fecha: "2025-08-22",
                hora: "09:30"
            });
            await actividad.save();
            console.log('Actividad inicial creada');
            
        }

        // Cargar Transportes
        const transporteExistente = await Transporte.findOne({ ruta: 'Nunciatura - San Pedro' });
        if (!transporteExistente) {
            const transporte = new Transporte({
                ruta: "Nunciatura - San Pedro",
                tarifa: 700,
                telefono: "601456797",
                nombreImagen: "ruta1.png"
            });
            await transporte.save();
            console.log('Transporte inicial creado');
        }

        // Cargar Emprendimiento
        const emprendimientoExistente = await Emprendimiento.findOne({ nombreEmprendimiento: 'Taller Tamarindo' });
        if (!emprendimientoExistente) {
            const emprendimiento = new Emprendimiento({
                "correoUsuario": "admin@tamarindo.com",
                "nombreEmprendimiento": "Taller Tamarindo",
                "descripcionEmprendimiento": "Taller de Electrónicos Tamarindo. Nos especializamos en Dispositivos móviles y Electrodomésticos",
                "categoria": "Electronica",
                "telefono": "84345267",
                "nombreImagen": "empredimientos9.jpg",
                "precio": 500,
                "estadoEmprendimiento": "Aprobado"
            });
            await emprendimiento.save();
            console.log('Emprendimiento inicial creado');
        }

    } catch (error) {
        console.error('Error al cargar datos iniciales:', error);
    }
}

// Llamar a la función para cargar datos iniciales
cargarDatosIniciales();

//#endregion

console.log(__dirname);