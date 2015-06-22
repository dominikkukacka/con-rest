import express = require('express');
import mongoose = require('mongoose');
import config = require('./config');
var restIO = require('rest-io');
var multer = require('multer');
var app = express();
var port = 3000;
restIO(app, {
  resources: __dirname + '/resources'
});

var connect = config.getMongoConfig();
var serverConfig = config.getServerConfig();

app.use(multer({
  inMemory: true
}));

mongoose.connect(connect.uri, connect.options);

app.listen(port, () => {
  console.log('Server has started under port: ' + port);
});

export = app;
