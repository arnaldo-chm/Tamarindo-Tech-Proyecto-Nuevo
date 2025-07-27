const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech'; 

mongoose.connect(DB_URI,{})

    .then(() => console.log("DB CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

//Modelo de usuario

//Schema
const emprendimientoSchema = new mongoose.Schema({
    nombreUsuario:{type:String, required:true},
    nombreEmprendimiento:{type:String, required:true},
    categoria:{type:String, required:true, unique:true},    
    telefono:{type:String, required:true},
    nombreImagen:{type:String, required:true}, // Usuario 0 es comun, 1 es emprendedor, 2 es admin
},{versionKey:false}) 


let emprendimiento = new mongoose.model('Emprendimiento',emprendimientoSchema);

module.exports = emprendimiento;