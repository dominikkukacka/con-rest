/**
 * Created by Stefan Schacherl on 12.01.2015.
 */
(function getConfigScope(fs) {
  'use strict';

  var config = JSON.parse(fs.readFileSync('./config.json'));
  var certificates = config.certificates.map(function(item) {
    var ca = '';
    try {
      ca = fs.readFileSync(item);
    } catch(e) {

    }
    return ca;
  });

  function getMongoConfig() {
    var connection = {};
    if (process.env.MONGO_CONNECTION) {
      connection.uri = process.env.MONGO_CONNECTION;
    } else {
      connection = config.mongoDb;
    }
    return connection;
  }

  function getServerConfig() {
    if (process.env.CON_REST_PORT) {
      config.server.port = process.env.CON_REST_PORT;
    }
    return config.server;
  }

  function getCertificates() {
    return certificates;
  }

  module.exports = {
    getMongoConfig: getMongoConfig,
    getServerConfig: getServerConfig,
    getCertificates: getCertificates
  };
}(require('fs')));
