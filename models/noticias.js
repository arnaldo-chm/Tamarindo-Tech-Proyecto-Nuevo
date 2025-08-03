const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech'; 

mongoose.connect(DB_URI,{})

    .then(() => console.log("DB CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

//Modelo de usuario

//Schema
const noticiaSchema = new mongoose.Schema({
    titulo:{type:String, required:true, unique:true},
    autor:{type:String, required:true},
    descripcionNoticia:{type:String, required:true},
    categoria:{type:String, required:true},    
    telefono:{type:String, required:true},
    fecha: {type:String, required:true},
    nombreImagen:{type:String, required:true}
},{versionKey:false}) 


let noticia = new mongoose.model('Noticia', noticiaSchema);

module.exports = noticia;