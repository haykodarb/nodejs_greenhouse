//Modules
const express = require('express');
const app = express();
const ejs = require('ejs');
const cors = require('cors');
const chalk = require('chalk');
const http = require('http').createServer(app);

//Routes
const api = require('./routes/api');
const dashboard = require('./routes/dashboard');
const login = require('./routes/login');
const register = require('./routes/register');
const verify = require('./tools/tokenVerify');

//Middleware
app.use(cors());
app.use('/', express.static('/public'));
app.use('/views', express.static(__dirname + '/public'));
app.use('/scripts', express.static('/public/scripts'));
app.use('/styles', express.static('/public/styles'));
app.use('/api', api);
app.use('/dashboard', dashboard);
app.use('/login', login);
app.use('/register', register);

//Views config
app.set('views', './public/views');
app.set('view engine', 'ejs');

http.listen(3000, () => {
    console.log(chalk.green('Listening on port: 3000'));
  });

app.get('/', verify, (req, res) => {
    res.redirect('./dashboard');
});
