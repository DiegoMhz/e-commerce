const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    const token = request.cookies.acessToken;
    if (!token) {
        // Si no hay token, simplemente pasa al siguiente middleware sin responder con un estado 401.
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        const user = await User.findById(decodedToken.id);
        if (!user) {
            // Si no se encuentra un usuario válido, puedes responder con un estado 401 o manejarlo de otra manera.
            return response.sendStatus(401);
        }
        request.user = user;
        next();
    } catch (error) {
        // Si hay un error al verificar el token, puedes responder con un estado 401 o manejarlo de otra manera.
        return response.sendStatus(401);
    }
}

module.exports = auth;

// const auth = async (request, response, next) => {
//     const token = request.cookies.acessToken;
//     if (!token) {
//         response.sendStatus(401);
//         return next();
//     }
//     const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN);
//     const user = await User.findById(decodedToken.id);
//     request.user = user;
//     next();
// }


