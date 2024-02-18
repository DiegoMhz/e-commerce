const zapatosRouter = require('express').Router();
const Zapatos = require('../models/zapatos');
const mongoose = require('mongoose');


zapatosRouter.get('/', async (request, response) => {
    const zapatos = await Zapatos.find();
    response.status(200).json(zapatos);
    return;
});

zapatosRouter.post('/', async (request, response) => {
    try {
        const nuevoZapato  = request.body;
        const existingDocument = await Zapatos.findOne()
        nuevoZapato._id = new mongoose.Types.ObjectId();
        existingDocument.zapatos.push(nuevoZapato);
        const documentoActualizado = await existingDocument.save();
        response.status(201).json(documentoActualizado);        
    } catch (error) {
        console.error(error);
        response.status(500).json({error: 'error al registrar datos'})
    }

});

zapatosRouter.delete('/:id', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    const documentoId = '65030ef41e52b935d702e7dc';
    const zapatoIdAEliminar = request.params.id;
    console.log(request.params);
    

    Zapatos.findById(documentoId).then( documento => {
        if (!documento) {
            console.log('documento no encontrado');
            return
        }
        console.log('si se encuntra el documento');
        const index = documento.zapatos.findIndex( zapato => zapato._id.toString() === zapatoIdAEliminar);


        if (index !== -1) {
            documento.zapatos.splice(index, 1);
            documento.save()
                .then(() => {
                    console.log('Zapato eliminado con éxito del array.');
                })
                .catch((error) => {
                    console.error('Error al guardar el documento actualizado:', error);
                });
        }
        else {
            console.log('Zapato no encontrado en el array.');
        }
    })

    response.status(204);
    return
});

// zapatosRouter.patch('/:id', async (request, response) => {
//     const { user } = request;
//     if (!user) {
//         return response.sendStatus(401);
//     }
//     console.log(request.body);
//     const { telefono } = request.body;
//     const { text } = request.body;
//     await Zapatos.findByIdAndUpdate(request.params.id, {
//         text: text,
//         telefono: telefono
//     });
//     response.sendStatus(200);
//     console.log(telefono, text);

// });



module.exports = zapatosRouter;