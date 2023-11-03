const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    img: String,
    titulo: String,
    precio: Number,
    talla: Number,
    cantidad: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

carritoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;