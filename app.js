require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const patch = require('path');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const carritoRouter = require('./controllers/carrito');
const zapatosRouter = require('./controllers/zapatos');
const cookiesRouter = require('./controllers/cookies');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const logoutRouter = require('./controllers/logout');
const morgan = require('morgan');
(async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

// Routes backend
app.use('/api/users', auth, usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/carrito', auth, carritoRouter);
app.use('/api/zapatos', auth, zapatosRouter);
app.use('/api/cookies', auth, cookiesRouter);
app.use('/api/logout', logoutRouter);

// FRONT END
app.use('/', express.static(patch.join(__dirname, 'views', 'home')));
app.use('/signup', express.static(patch.join(__dirname, 'views', 'registro')));
app.use('/productos/hombres', express.static(patch.join(__dirname, 'views', 'hombre')));
app.use('/productos/mujeres', express.static(patch.join(__dirname, 'views', 'mujeres')));
app.use('/productos/all', express.static(patch.join(__dirname, 'views', 'all')));
app.use('/productos/hombres/:id', express.static(patch.join(__dirname, 'views', 'productosHombres')));
app.use('/productos/mujeres/:id', express.static(patch.join(__dirname, 'views', 'productosMujeres')));
app.use('/productos/all/:id', express.static(patch.join(__dirname, 'views', 'productosALL')));
app.use('/perfil', express.static(patch.join(__dirname, 'views', 'perfil')));
app.use('/login', express.static(patch.join(__dirname, 'views', 'login')));
app.use('*', express.static(patch.join(__dirname, 'views', '404')));





module.exports = app;
