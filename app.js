const express = require('express');
const path = require('path');
const consign = require('consign');
var bodyParser = require('body-parser');
const app = express();



app.set('views', path.join(__dirname, 'views')); //middlewares pasta views
app.set('view engine', 'ejs');                   //middlewares template engine ejs
app.use(express.static(path.join(__dirname, 'public'))); //middlewares arquivos estáticos(imagens,css,js)
app.use(bodyParser.json()); //middlewares cria objeto JSON vindo de form HTML
app.use(bodyParser.urlencoded({extended: true}));

consign({})
    .include('models')
    .then('config')
    .then('controllers')
    .then('routes')
    .into(app)
;

app.listen(3000, () => {
    console.log('CodingPlay no ar.');
});