// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverIndex(server, express, config) {
    'use strict';

    var serverConfig = config.getServerConfig();

    server.use(express.static(__dirname + '/app'));
    server.use(express.static(__dirname + '/.tmp'));
    server.listen(serverConfig.port, function notify() {
        console.log('Server listening on port ', serverConfig.port);
    });
}(require('./server/server.js'), require('express'), require('./server/getConfig.js')));