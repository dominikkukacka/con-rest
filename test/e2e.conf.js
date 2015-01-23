exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'cucumber',
  specs: ['e2e/**/*.feature'],
  baseUrl: 'http://localhost:9000',
  cucumberOpts: {
    require: 'e2e/definitions/*.js',
    format: 'progress'
  }
};
