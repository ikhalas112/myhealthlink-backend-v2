const Parse = require('parse/node');
const config = require('../config');

const { parse } = config;

const parseInitialize = () => {
  Parse.initialize(parse.appId);
  Parse.masterKey = parse.appId;
  Parse.serverURL = parse.serverURL;
};

module.exports = parseInitialize;
