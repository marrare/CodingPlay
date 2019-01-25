module.exports = (app) => {
    const { aluno } = app.controllers;
    app.get('/verComoAluno', aluno.verComoAluno);
};