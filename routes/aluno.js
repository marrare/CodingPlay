module.exports = (app) => {
    const { aluno } = app.controllers;
    app.post('/novoAluno', aluno.novoAluno);
    
};