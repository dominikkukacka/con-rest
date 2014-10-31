// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest
(function serverIndex(server, express) {
    'use strict';

    server.use(express.static(__dirname + '/app'));
    server.listen(3000);

}(require('server'), require('express')));