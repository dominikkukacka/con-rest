module.exports = (grunt, config) ->
  clean__all:
    files: [
      dot: true
      src: [
        '.tmp'
        'dist'
      ]
    ]
  compress:
    options:
      archive: 'conrest.tar'
    files: [
      expand: true
      cwd: 'dist'
      src: ['**/*']
      dest: '/'
    ]
  concat__js:
    dest: 'dist/js/con-rest.min.js'
    src: [
      '.tmp/js/angular.min.js'
      'app/bower_components/ace-builds/src-min-noconflict/ace.js'
      'app/bower_components/ace-builds/src-min-noconflict/mode-json.js'
      'app/bower_components/angular-ui-ace/ui-ace.min.js'
      '.tmp/js/build.min.js'
      '.tmp/js/templates.min.js'
    ]
  concat__less:
    dest: '.tmp/less/styles.less'
    src: [
      'app/widgets/**/*.less'
    ]
  copy__dev:
    files: [
      expand: true
      cwd: 'app/bower_components/bootstrap-material-design/fonts/'
      dest: '.tmp/fonts/'
      src: [
        '*.eot'
        '*.svg'
        '*.ttf'
        '*.woff'
        '*.woff2'
      ]
    ]
  copy__dist:
    files: [
      expand: true
      cwd: '.tmp/styles'
      dest: 'dist/styles'
      src: [
        '*.css'
      ]
    ,
      expand: true
      cwd: 'app/bower_components/bootstrap-material-design/fonts/'
      dest: 'dist/fonts/'
      src: [
        '*.eot'
        '*.svg'
        '*.ttf'
        '*.woff'
        '*.woff2'
      ]
    ,
      src: 'app/dist.html'
      dest: 'dist/index.html'
    ,
      expand: true
      cwd: 'server'
      src: [
        '**/*.js'
      ]
      dest: 'dist/server'
    ,
      src: 'config.json'
      dest: 'dist/config.json'
    ]
  packageModules:
    dist:
      src: 'package.json'
      dest: 'dist'
