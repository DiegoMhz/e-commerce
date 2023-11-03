const carritoRouter = require('express').Router();
const User = require('../models/user');
const Carrito = require('../models/carrito');

carritoRouter.post('/', async (request, response) => {
    const { user } = request;
    console.log(user);
    if (!user) {
        return response.sendStatus(401);
    }
    const { img, precio, titulo, talla, cantidad } = request.body;
    
    const newCarrito = new Carrito({
        cantidad,
        talla,
        img,
        precio,
        titulo,
        user: user._id
    });

    const savedCarrito = await newCarrito.save();
    response.status(201).json(savedCarrito);
});

carritoRouter.get('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    const carrito = await Carrito.find({ user: user._id });
    response.status(200).json(carrito);
});

carritoRouter.delete('/:id', async (request, response) => {
    const { user } = request;
    const id = request.params.id
    if (!user) {
        return response.sendStatus(401);
    }
    await Carrito.findByIdAndDelete(id);
    response.status(204);
});

carritoRouter.patch('/:id', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    console.log(request.body);
    const { telefono } = request.body;
    const { text } = request.body;
    await Carrito.findByIdAndUpdate(request.params.id, {
        text: text,
        telefono: telefono
    });
    response.sendStatus(200);
    console.log(telefono, text);

});

module.exports = carritoRouter;
