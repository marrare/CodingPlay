module.exports = (app) => {
    const { home } = app.controllers;
    app.get('/', home.index);
    app.post('/entrar', home.login);
    app.get('/sair',home.logout);
    app.get('/login',home.paginaLogin);
    app.get('/novaConta',home.cadastro);
};