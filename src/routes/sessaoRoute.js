const autenticadorLogado = require('../../middlewares/autenticadorLogado');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { sessaoController } = app.src.controllers;
    app.get('/sessoes/list', autenticadorLogado, sessaoController.paginaListarSessoes);
    app.get('/sessoes/filtro', autenticadorLogado, sessaoController.paginaListarSessoesFiltro);
    app.get('/sessao/add', autenticadorProfessor, sessaoController.paginaNovaSessao);    
    app.get('/sessao/filtro', autenticadorProfessor, sessaoController.paginaNovaSessaoFiltro);
    app.get('/sessao/save', autenticadorProfessor, sessaoController.novaSessao);
};