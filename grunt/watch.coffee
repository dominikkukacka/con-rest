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
    tasks: ['ts', 'karma:test_unitAuto:run']
  features:
    files: [
      'app/**/widgets/**/*.feature'
    ]
    tasks: ['template', 'karma:test_unitAuto:run']
  testsServer:
    files: [
      'server/**/*.js'
      'test/unit/server/**/*.js'
    ]
    tasks: ['simplemocha']
  serverReload: 
    files: [
      'server/**/*.js'
      'test/unit/server/**/*.js'
    ]
    tasks: ['express:server_dev']
