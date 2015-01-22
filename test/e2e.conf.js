exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'cucumber',
  specs: ['e2e/*.feature'],
  baseUrl: 'http://localhost:9000',
  cucumberOpts: {
    require: 'cucumber/stepDefinitions.js',
    tags: '@dev',
    format: 'summary'
  }
};
