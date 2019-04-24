const autenticadorLogado = require('../../middlewares/autenticadorLogado');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { problemaController } = app.src.controllers;
    app.get('/problema/list', autenticadorProfessor, problemaController.paginaListarProblemas);
    app.get('/problema/add', autenticadorProfessor, problemaController.paginaNovoProblema);
    app.post('/problema/save', autenticadorProfessor, problemaController.NovoProblema);
    app.get('/problema/delete', autenticadorProfessor, problemaController.deletarProblema);

};