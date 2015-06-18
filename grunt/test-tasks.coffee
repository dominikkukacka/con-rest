module.exports = (grunt, config) ->
  karma__unit:
    configFile: 'test/karma.conf.js'
    singleRun: true
  karma__unitAuto:
    configFile: 'test/karma.conf.js'
    background: true
  karma__e2e:
    configFile: 'test/e2e-karma.conf.js'
    singleRun: true
  karma__e2eAuto:
    configFile: 'test/e2e-karma.conf.js'
    background: true
  'protractor_webdriver':
    options:
      keepAlive: true
      path: 'node_modules/protractor/bin/',
      command: 'webdriver-manager start --standalone'
  protractor__ci:
    options:
      configFile: 'test/ci.conf.js'
      keepAlive: true
      noColor: false
    args:
      multiCapabilities: [
        'browserName': 'firefox'
      ]
  protractor__all:
    options:
      configFile: 'test/e2e.conf.js'
      keepAlive: true
      noColor: false
  simplemocha:
    options:
      reporter: 'mocha-better-spec-reporter'
    src: [
      '.tmp/js/app/server/test/server.specs.js'
    ]
