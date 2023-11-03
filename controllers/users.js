const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
    const { user } = request;
    if (!user) {
        return response.sendStatus(401);
    }
    const usuario = await User.find({ _id: user.id });
    response.status(200).json(usuario);
});

usersRouter.post('/', async (request, response) => {
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
    const { name, email, password } = request.body;
    const userExist = await User.findOne({ email });
    console.log(User.findOne);

    if (userExist) {
        return response.status(400).json({ error: 'El email ya existe' });
    } else if (!PASSWORD_REGEX.test(password)) {
        return response.status(400).json({ error: 'La contraseña es erronea' })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        name,
        email,
        passwordHash
    });
    await user.save();

    response.sendStatus(201);
});

module.exports = usersRouter;
