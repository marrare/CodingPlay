const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const app = express();



app.set('views', path.join(__dirname, 'views')); //middlewares pasta views
app.set('view engine', 'ejs');   //middlewares template engine ejs
app.use(cookieParser('codingplay'));
app.use(expressSession({
  secret: 'blocos', 
  resave: false, 
  saveUninitialized: false,
  cookie:{
      expires: 600000,
      tipo: undefined
  }
}));

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use(bodyParser.json()); //middlewares cria objeto JSON vindo de form HTML
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); //middlewares arquivos estáticos(imagens,css,js)

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