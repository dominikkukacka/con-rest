var Yadda = require('yadda');
Yadda.plugins.mocha.ScenarioLevelPlugin.init();

import mongoose = require('mongoose');

process.env.MONGO_CONNECTION = 'mongodb://localhost:27017/testConrest';
process.env.CON_REST_PORT = 1111;

require('../app');
var library = require('./definitions/steps');
new Yadda.FeatureFileSearch('app/server/test').each(function(file) {
  featureFile(file, function(feature) {
    var yadda = Yadda.createInstance(library);

    afterEach((done) => {
      mongoose.connection.db.dropDatabase(function(err, result) {
        done();
      });
    });

    scenarios(feature.scenarios, function(scenario, done) {
      yadda.run(scenario.steps, done);
    });
  });
});
