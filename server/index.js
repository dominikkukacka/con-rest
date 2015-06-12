// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverIndex(server, express, config) {
  'use strict';

  var serverConfig = config.getServerConfig();

  server.use(express.static(__dirname + '/../'));
  server.use(express.static(__dirname + '/../../app/bower_components/'));
  server.listen(serverConfig.port, function notify() {
    console.log('Server listening on port ', serverConfig.port);
  });
}(require('./server'), require('express'), require('./getConfig')));
