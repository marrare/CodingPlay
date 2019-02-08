const autenticadorOff = require('../../middlewares/autenticadorOff');

module.exports = (app) => {
    const { alunoController } = app.src.controllers;
    app.get('/aluno/add', autenticadorOff, alunoController.paginaCadastro);
    app.post('/aluno/save', autenticadorOff, alunoController.novoAluno);
    
};