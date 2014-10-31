// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '..',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // Angular dependencies
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            // App wiring
            'app/app.js',
            // Models
            'app/models/**/*.js',
            // Modules
            'app/modules/*.js',
            // Directives
            'app/directives/*.js',
            // View Models
            'app/viewModels/**/*.js',
            // Views encapsuled in widgets
            'app/widgets/**/*.js',
            // Templates for the widgets
            '.tmp/scripts/templates.js',
            // The specs for unit testing
            'test/unit/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: ['test/unit/server/**/*.js'],

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
        reporters: ['progress', 'coverage'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/models/**/*.js': ['coverage'],
            'app/modules/**/*.js': ['coverage'],
            'app/directives/**/*.js': ['coverage'],
            'app/viewModels/**/*.js': ['coverage']
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
