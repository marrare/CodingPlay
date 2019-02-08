module.exports = (app) => {
    const { homeController } = app.src.controllers;
    app.get('/', homeController.paginaIndex);
    app.post('/entrar', homeController.login);
    app.get('/sair',homeController.logout);
    app.get('/login',homeController.paginaLogin);
};