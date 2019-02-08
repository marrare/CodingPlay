const autenticadorOff = require('../../middlewares/autenticadorOff');
const autenticadorLogado = require('../../middlewares/autenticadorLogado');

module.exports = (app) => {
    const { homeController } = app.src.controllers;
    app.get('/', homeController.paginaIndex);
    app.post('/entrar', autenticadorOff, homeController.login);
    app.get('/sair', autenticadorLogado, homeController.logout);
    app.get('/login', autenticadorOff, homeController.paginaLogin);
};