const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech'; 

mongoose.connect(DB_URI,{})

    .then(() => console.log("DB TRANSPORTES CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

//Modelo de usuario

//Schema
const transporteSchema = new mongoose.Schema({
    ruta:{type:String, required:true, unique:true},
    tarifa:{type:Number, required:true},
    telefono:{type:String, required:true},
    nombreImagen:{type:String, required:true}
},{versionKey:false}) 


let transporte = new mongoose.model('Transporte', transporteSchema);

module.exports = transporte;