require('dotenv').config();
const express = require('express')
const app = express();
const multer = require('multer');
const sharp = require('sharp');
const mongoose = require('mongoose');
const patch = require('path');
const cors = require('cors');
const fs = require('node:fs')
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const carritoRouter = require('./controllers/carrito');
const zapatosRouter = require('./controllers/zapatos');
const cookiesRouter = require('./controllers/cookies');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const logoutRouter = require('./controllers/logout');
const morgan = require('morgan');
const { request } = require('http');
(async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }

})();

app.use('/img', express.static(patch.join(__dirname, 'img')));

const upload = multer({dest: 'img/'})

app.post('/api/imagenes/single', upload.single('imagen'),(request, response) => {
    response.send('Termina')
    guardarImagen(request.file)
})

app.post('api/imagenes/multi', upload.array('imagen', 10),(request, response) => {
    response.send('Termina')
    request.files.map(guardarImagen)
    console.log(request.files);
})

const guardarImagen = (imagen) => {
    const newPath = `./img/${imagen.originalname}`
    fs.renameSync(imagen.path, newPath)
    return newPath;
}


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
app.use('/admin', express.static(patch.join(__dirname, 'views', 'admin')));
app.use('*', express.static(patch.join(__dirname, 'views', '404')));





module.exports = app;
