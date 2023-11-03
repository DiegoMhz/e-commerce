const cookiesRouter = require('express').Router();
cookiesRouter.get('/', async (request, response) => {
    const cookies = request.cookies;
    response.status(200).json(cookies);
    return;
});

module.exports = cookiesRouter;