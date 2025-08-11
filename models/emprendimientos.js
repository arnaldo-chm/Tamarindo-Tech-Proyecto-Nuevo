const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech'; 

mongoose.connect(DB_URI,{})

    .then(() => console.log("DB EMPRENDIMIENTOS CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

//Modelo de usuario

//Schema
const emprendimientoSchema = new mongoose.Schema({
    correoUsuario:{type:String, required:true},
    nombreEmprendimiento:{type:String, required:true, unique:true},
    descripcionEmprendimiento:{type:String, required:true},
    categoria:{type:String, required:true},    
    telefono:{type:String, required:true},
    nombreImagen:{type:String, required:true},
    precio:{type:Number, required:true},
    estadoEmprendimiento:{type:String, default:"Pendiente"}, // 0: En Revision, 1: Aprobado, 2: Rechazado/Eliminado
    motivoRechazo:{type:String, required:false} // <-- Cambia a String para guardar texto
},{versionKey:false}) 


let emprendimiento = new mongoose.model('Emprendimiento',emprendimientoSchema);

module.exports = emprendimiento;