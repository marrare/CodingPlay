const autenticadorOff = require('../../middlewares/autenticadorOff');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { alunoController } = app.src.controllers;
    app.get('/aluno/add', autenticadorOff, alunoController.paginaCadastro);
    app.post('/aluno/save', autenticadorOff, alunoController.novoAluno);
    app.get('/aluno/active', autenticadorProfessor, alunoController.paginaAlunosPendentes);
    app.post('/aluno/activeConfirm', autenticadorProfessor, alunoController.confirmAlunos);
    
};