const autenticadorLogado = require('../../middlewares/autenticadorLogado');

module.exports = (app) => {
    const { sessaoController } = app.src.controllers;
    app.get('/sessoes/list', autenticadorLogado, sessaoController.paginaListarSessoes);
    app.get('/sessao/add', autenticadorLogado, sessaoController.paginaNovaSessao);
};