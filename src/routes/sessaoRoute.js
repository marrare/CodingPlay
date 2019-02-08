module.exports = (app) => {
    const { sessaoController } = app.src.controllers;
    app.get('/sessoes/list', sessaoController.paginaListarSessoes);
    app.get('/sessao/add', sessaoController.paginaNovaSessao);
};