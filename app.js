const express = require('express');
const path = require('path');
const consign = require('consign');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('req-flash');
const app = express();



app.set('views', path.join(__dirname, 'views')); //middlewares pasta views
app.set('view engine', 'ejs');   //middlewares template engine ejs
app.use(cookieParser('codingplay'));
app.use(expressSession({
  secret: 'blocos', 
  resave: false, 
  saveUninitialized: false,
  cookie:{
      tipo: undefined
  }
}));
app.use(flash());

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use(bodyParser.json()); //middlewares cria objeto JSON vindo de form HTML
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); //middlewares arquivos estáticos(imagens,css,js)

consign({})
    .include('src/models')
    .then('config')
    .then('src/controllers')
    .then('src/routes')
    .into(app)
;

var pusher = new Pusher({
  appId: '730978',
  key: '58026cd0bcc122dade8b',
  secret: '66b576388ace13633d8a',
  cluster: 'us2',
  encrypted: true
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: req.body.userId,
    user_info: {
      name: req.body.nome
    }
  };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

app.listen(3000, () => {
    console.log('CodingPlay no ar.');
});