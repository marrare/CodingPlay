module.exports = (app) => {
    const { professor } = app.controllers;
    app.get('/verComoProfessor', professor.verComoProfessor);
};