exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'mocha',
  specs: ['e2e/testRunner.js'],
  baseUrl: 'http://localhost:9000',
  multiCapabilities: [{
    'browserName': 'firefox'
  }],
  mochaOpts: {
    format: 'spec',
    timeout: 4000
  }
};
