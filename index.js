const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');
const parseInitialize = require('./src/service/parse.service');
const config = require('./src/config');

const { parse } = config;

const parseConfig = {
  databaseURI: parse.databaseUri,
  appId: parse.appId,
  masterKey: parse.masterKey,
  serverURL: parse.serverURL,
};

parseInitialize();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Authorization');
  next();
});

app.use('/public', express.static(path.join(__dirname, '/public')));

const api = new ParseServer(parseConfig);
app.use(parse.mountPath, api);

app.get('/', (req, res) => res.status(200).send(`Greetings, I'am work`));
app.post('/bill-pdf', require('./src/api/bill-pdf'));
app.get('/download-bill/:path', require('./src/api/download-bill'));
app.post('/sendmail-bill', require('./src/api/sendmail-bill'));

app.post('/nurse-note-pdf', require('./src/api/nurse-note-pdf'));
app.get('/dowmload-nurse-note/:path', require('./src/api/dowmload-nurse-note'));

var options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: parse.serverURL,
        appId: parse.appId,
        masterKey: parse.masterKey,
        appName: 'mhl',
      },
    ],
    users: [
      {
        user: 'admin',
        pass: 'admin@1234',
      },
    ],
  },
  options
);

app.use('/dashboard', dashboard);

const httpServer = require('http').createServer(app);
httpServer.listen(parse.port, function () {
  console.log('parse-server running on port ' + parse.port + '.');
});
// ParseServer.createLiveQueryServer(httpServer);

module.exports = {
  app,
  parseConfig,
};
