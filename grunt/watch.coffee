module.exports = (grunt, config) ->
  options:
    livereload: true
  less:
    files: [
      'app/styles/*.less'
      'app/widgets/**/*.less'
    ]
    tasks: ['concat:build_less', 'less']
  ngTemplates:
    files: ['app/widgets/**/*.html']
    tasks: ['ngtemplates']
  ts:
    files: [
      'app/core/**/*.ts'
      'app/widgets/**/*.ts'
      'test/**/*.ts'
      'app/app.ts'
    ]
    tasks: ['ts:ts_all', 'ts:ts_seperate']
  tsServer:
    files: [
      'app/server/**/*.ts'
    ]
    tasks: ['ts:ts_server', 'mochacli']
  testApp:
    files: [
      '.tmp/js/app/core/**/*.js'
      '.tmp/js/app/widgets/**/*.js'
    ]
    tasks: ['karma:test_unitAuto:run']
  features:
    files: [
      'app/**/widgets/**/*.feature'
    ]
    tasks: ['template', 'karma:test_unitAuto:run']
  testsServer:
    files: [
      'app/server/**/*.feature'
    ]
    tasks: ['mochacli']
  serverReload:
    files: [
      'server/**/*.js'
      'test/unit/server/**/*.js'
    ]
    tasks: ['express:server_dev']
