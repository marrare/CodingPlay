const autenticadorOff = require('../../middlewares/autenticadorOff');
const autenticadorLogado = require('../../middlewares/autenticadorLogado');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { professorController } = app.src.controllers;
    app.get('/professor/add', autenticadorProfessor, professorController.paginaNovoProfessor);
    app.post('/professor/save', autenticadorProfessor, professorController.novoProfessor);
    app.get('/professor/senha/change', autenticadorOff, professorController.paginaTrocarSenha);
    app.post('/professor/senha/save', autenticadorOff, professorController.trocarSenha);

};