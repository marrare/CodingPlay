const autenticadorLogado = require('../../middlewares/autenticadorLogado');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { sessaoController } = app.src.controllers;
    app.get('/sessoes/list', autenticadorLogado, sessaoController.paginaListarSessoes);
    app.get('/sessoes/filtro', autenticadorLogado, sessaoController.paginaListarSessoesFiltro);
    app.get('/sessao/add', autenticadorProfessor, sessaoController.paginaNovaSessao);    
    app.get('/sessao/filtro', autenticadorProfessor, sessaoController.paginaNovaSessaoFiltro);
    app.post('/sessao/save', autenticadorProfessor, sessaoController.novaSessao);
    app.get('/sessao/info', autenticadorLogado, sessaoController.paginaSessaoDetalhada);
    app.get('/sessao/active', autenticadorLogado, sessaoController.paginaSessaoAtiva);
    app.get('/sessao/start', autenticadorLogado, sessaoController.iniciarSessao);
    app.post('/sessao/confirm', autenticadorLogado, sessaoController.finalizarSessao);
    app.get('/sessao/delete', autenticadorProfessor, sessaoController.deletarSessao);
    app.post('/sessao/feedback/save', autenticadorProfessor, sessaoController.feedbackSave);
    app.get('/sessao/activate', autenticadorProfessor, sessaoController.ativarSessaoProfessor);
};