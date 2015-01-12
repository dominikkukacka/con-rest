/**
 * Created by Stefan Schacherl on 12.01.2015.
 */
(function getMongooseConfigScope(fs){
    'use strict';

    function readConfigFile () {
        return fs.readFileSync('./mongooseConfig.json');
    }


    function getConfig () {
        var connection = {};

        if(!process.env.MONGO_CONNECTION) {
            connection = JSON.parse(readConfigFile());
        } else {
            connection.uri = process.env.MONGO_CONNECTION;
        }
        return connection;
    }

    module.exports = {
        getConfig: getConfig
    };
}(require('fs')));