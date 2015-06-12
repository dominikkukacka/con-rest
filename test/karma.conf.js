// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '..',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['mocha', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files: [
      // Angular dependencies
      'node_modules/yadda/dist/yadda-0.11.4.js',
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-messages/angular-messages.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-aria/angular-aria.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-material/angular-material.js',
      'app/bower_components/ace-builds/src-min-noconflict/ace.js',
      'app/bower_components/angular-ui-ace/ui-ace.js',
      '.tmp/js/test/unit/*.js',
      '.tmp/js/app/core/models/serializable.js',
      '.tmp/js/app/core/models/**/*.js',
      '.tmp/js/app/core/dao/dao.js',
      '.tmp/js/app/core/dao/**/*.js',
      '.tmp/js/app/core/modules/**/*.js',
      '.tmp/js/app/core/widgets/**/src/**/*.js',
      '.tmp/js/app/core/widgets/**/*.js',
      '.tmp/js/app/widgets/**/src/**/*.js',
      '.tmp/js/app/widgets/**/*.js',
      '.tmp/js/app/app.js',
      '.tmp/js/templates.js',
      '.tmp/js/app/core/widgets/**/test/unit/*.js',
      '.tmp/js/app/widgets/**/test/unit/*.js',
      '.tmp/test.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 5050,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // coverage reporter generates the coverage
    reporters: ['mocha', 'coverage'],

    preprocessors: {
      '.tmp/js/widgets/**/*.js': ['coverage'],
      '.tmp/js/core/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
