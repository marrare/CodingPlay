module.exports = (app) => {
    const { alunoController } = app.src.controllers;
    app.get('/aluno/add',alunoController.paginaCadastro);
    app.post('/aluno/save', alunoController.novoAluno);
    
};