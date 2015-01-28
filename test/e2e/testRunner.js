var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

new Yadda.FeatureFileSearch('./test/e2e/features').each(function foundFeatureFiles(file) {
  featureFile(file, function test(feature) {
    var definitions = require('./definitions/definitions');
    var yadda = Yadda.createInstance(definitions);

    scenarios(feature.scenarios, function execute(scenario) {
      steps(scenario.steps, function executeStep(step) {
        yadda.run(step);
      });
    });
  });
});
