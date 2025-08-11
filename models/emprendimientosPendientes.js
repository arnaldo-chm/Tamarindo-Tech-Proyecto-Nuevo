const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/TamarindoTech';

mongoose.connect(DB_URI, {})
    .then(() => console.log("DB EMPRENDIMIENTOS PENDIENTES CONECTADA"))
    .catch(err => console.log("Error de conexión:", err));

const emprendimientoPendienteSchema = new mongoose.Schema({
    correoUsuario: { type: String, required: true },
    nombreEmprendimiento: { type: String, required: true, unique: true },
    descripcionEmprendimiento: { type: String, required: true },
    categoria: { type: String, required: true },
    telefono: { type: String, required: true },
    nombreImagen: { type: String, required: true },
    precio: { type: Number, required: true },
    estadoEmprendimiento: { type: String, enum: ["Pendiente", "Rechazado"], default: "Pendiente" },
    motivoRechazo: { type: String, required: false }
}, { versionKey: false });

module.exports = mongoose.model('EmprendimientoPendiente', emprendimientoPendienteSchema);
