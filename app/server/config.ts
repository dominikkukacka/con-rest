import fs = require('fs');

module config {
  var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  var certificates = config.certificates.map(function(item) {
    var ca = '';
    try {
      ca = fs.readFileSync(item, 'utf8');
    } catch (e) {
      console.log('no certificates found');
    }
    return ca;
  });

  // Return config of mongo connection
  // Default: Environment variable
  // Fallback: config.json
  export function getMongoConfig() {
    if (process.env.MONGO_CONNECTION) {
      return {
        uri: process.env.MONGO_CONNECTION
      };
    }
    return config.mongoDb;
  }

  // Return server configuration
  // Default: App port in environment variable + config.json
  // Fallback: config.json
  export function getServerConfig() {
    if (process.env.CON_REST_PORT) {
      config.server.port = process.env.CON_REST_PORT;
    }
    return config.server;
  }

  // Returns an array of certificates,
  // If no certificate could be loaded it returns null
  export function getCertificates() {
    if (!!certificates[0]) {
      return certificates;
    }
    return null;
  }

  // Returns value for strictSSL from config.json.
  // Should be set to false if insecure connections are allowed
  export function getSSLConfig() {
    return config.server.strictSSL;
  }
}

export = config;
