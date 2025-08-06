const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech';

mongoose.connect(DB_URI, {})
    .then(() => console.log("DB QUEJAS CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

// Schema para Quejas
const quejaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    reporte: { type: String, required: true },
    archivo: { type: String }, // Opcional, si hay archivo adjunto
    fecha: { type: String, required: true }
}, { versionKey: false });

let Queja = new mongoose.model('Queja', quejaSchema);

module.exports = Queja;