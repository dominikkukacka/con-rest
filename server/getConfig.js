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

  // Return config of mongo connection
  // Default: Environment variable
  // Fallback: config.json
  function getMongoConfig() {
    var connection = {};
    if (process.env.MONGO_CONNECTION) {
      connection.uri = process.env.MONGO_CONNECTION;
    } else {
      connection = config.mongoDb;
    }
    return connection;
  }

  // Return server configuration
  // Default: App port in environment variable + config.json
  // Fallback: config.json
  function getServerConfig() {
    if (process.env.CON_REST_PORT) {
      config.server.port = process.env.CON_REST_PORT;
    }
    return config.server;
  }

  // Returns an array of certificates,
  // If no certificate could be loaded it returns null
  function getCertificates() {
    if(!!certificates[0]) {
      return certificates;
    }
    return null;
  }

  // Returns value for strictSSL from config.json.
  // Should be set to false if insecure connections are allowed
  function getSSLConfig() {
    return config.server.strictSSL;
  }

  module.exports = {
    getMongoConfig: getMongoConfig,
    getServerConfig: getServerConfig,
    getCertificates: getCertificates,
    getSSLConfig: getSSLConfig
  };
}(require('fs')));
