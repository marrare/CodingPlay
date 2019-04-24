const autenticadorLogado = require('../../middlewares/autenticadorLogado');
const autenticadorProfessor = require('../../middlewares/autenticadorProfessor');

module.exports = (app) => {
    const { questionarioController } = app.src.controllers;
    app.post('/questionario/save', autenticadorLogado, questionarioController.novoQuestionario);

};