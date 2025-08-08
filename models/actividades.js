const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech'; 

mongoose.connect(DB_URI,{})

    .then(() => console.log("DB CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

//Modelo de usuario

//Schema
const actividadesSchema = new mongoose.Schema({
    titulo:{type:String, required:true, unique:true},    
    descripcion_actividad:{type:String, required:true},
    recomendaciones_actividad:{type:String, required:true},
    costo:{type:Number, required:true},  
    nombreImagen:{type:String, required:true},
    fecha:{type:String, required:true},
    hora:{type:String, required:true},
},{versionKey:false}) 


let actividad = new mongoose.model('Actividades',actividadesSchema);

module.exports = actividad;

