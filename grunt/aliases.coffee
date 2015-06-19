module.exports = (grunt, options) ->
  build: [
    'clean'
    'tslint'
    'concat:build_less'
    'less'
    'copy:build_dev'
    'ngtemplates:html_dev'
    'template'
    'ts'
  ]
  setupEnv: (target) ->
    if target is 'e2e'
      process.env.MONGO_CONNECTION = 'mongodb://127.0.0.1:27017/test'
    grunt.task.run [
      'build'
      'express:server_dev'
    ]
  test: (target) ->
    grunt.task.run [
      'setupEnv:' + target
      'karma:test_unit'
      'mochacli'
    ]
  e2e: (target) ->
    grunt.task.run [
      'protractor_webdriver'
      'protractor:test_' + (target || 'all')
    ]
  server: (target) ->
    tasks = [
      'setupEnv:' + target
      'karma:test_unitAuto'
      'watch'
    ]
    grunt.task.run tasks
  package: [
    'test'
    'ngtemplates:html_dist'
    'uglify'
    'copy'
    'concat'
    'packageModules'
    'compress'
  ]
  default: ['package']
