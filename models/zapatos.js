const mongoose = require('mongoose');

const zapatosSchema = new mongoose.Schema({
    zapatos: Array,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

zapatosSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Zapatos = mongoose.model('Zapatos', zapatosSchema);

module.exports = Zapatos;
