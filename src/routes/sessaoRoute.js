const autenticadorLogado = require('../../middlewares/autenticadorLogado');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { sessaoController } = app.src.controllers;
    app.get('/sessoes/list', autenticadorLogado, sessaoController.paginaListarSessoes);
    app.get('/sessao/add', autenticadorProfessor, sessaoController.paginaNovaSessao);
};