// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var fs = require('fs');

  function addFeatures(baseFolder, features) {
    try {
      var featureFiles = fs.readdirSync(baseFolder + '/test/features/');
      featureFiles.forEach(function(feature) {
        this.push(fs.readFileSync(baseFolder +
          '/test/features/' + feature, {
            encoding: 'utf8'
          }));
      }, features);
    } catch (e) {
      console.warn(baseFolder + ' does not contain any tests');
    }
  }

  function addWidgetFeatures(baseFolder, features) {
    try {
      var widgets = fs.readdirSync(baseFolder);
      widgets.forEach(function(widget) {
        addFeatures(baseFolder + widget, features);
      });
    } catch (e) {
      console.warn(baseFolder + ' does not exist');
    }
  }

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    app: {
      app: 'app',
      server: 'server',
      test: 'test',
      tmp: '.tmp',
      dist: 'dist'
    },
    bower: {
      install: {
        options: {
          copy: false,
          install: true,
          verbose: true
        }
      }
    },
    clean: {
      all: {
        files: [{
          dot: true,
          src: [
            '<%= app.tmp %>',
            '<%= app.dist %>'
          ]
        }]
      }
    },
    compress: {
      main: {
        options: {
          archive: 'conrest.tar'
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*'],
          dest: '/'
        }]
      }
    },
    concat: {
      dist: {
        files: {
          '<%= app.dist %>/js/con-rest.min.js': [
            '.tmp/js/angular.min.js',
            'app/bower_components/ace-builds/src-min-noconflict/ace.js',
            'app/bower_components/ace-builds/src-min-noconflict/mode-json.js',
            'app/bower_components/angular-ui-ace/ui-ace.min.js',
            '.tmp/js/build.min.js',
            '.tmp/js/templates.min.js'
          ]
        }
      },
      less: {
        files: {
          '<%= app.tmp %>/less/styles.less': [
            '<%= app.app %>/widgets/**/*.less'
          ]
        }
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= app.app %>/bower_components/bootstrap-material-design/fonts/',
          dest: '<%= app.tmp %>/fonts/',
          src: [
            '*.eot',
            '*.svg',
            '*.ttf',
            '*.woff',
            '*.woff2'
          ]
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.tmp %>/styles',
          dest: '<%= app.dist %>/styles',
          src: [
            '*.css'
          ]
        }, {
          expand: true,
          cwd: '<%= app.app %>/bower_components/bootstrap-material-design/fonts/',
          dest: '<%= app.dist %>/fonts/',
          src: [
            '*.eot',
            '*.svg',
            '*.ttf',
            '*.woff',
            '*.woff2'
          ]
        }, {
          src: 'app/dist.html',
          dest: 'dist/index.html'
        }, {
          expand: true,
          cwd: 'server',
          src: [
            '**/*.js'
          ],
          dest: 'dist/server'
        }, {
          src: 'config.json',
          dest: 'dist/config.json'
        }]
      }
    },
    express: {
      dev: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          server: 'server/server',
          bases: ['app', '.tmp'],
          middleware: [function(req, res, next) {
            req.url = req.url.replace(/\/app\//, '/');
            next();
          }]
        }
      },
      dist: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          server: 'server/server',
          bases: ['dist'],
        }
      }
    },
    groc: {
      dev: {
        options: {
          out: '<%= app.tmp %>/docs'
        },
        src: [
          '<%= app.app %>/viewModels/*.js',
          '<%= app.app %>/models/*.js',
          '<%= app.server %>/{,*/}*.js',
          'README.md'
        ]
      },
      dist: {
        options: {
          out: './'
        },
        src: [
          '<%= app.app %>/viewModels/*.js',
          '<%= app.app %>/models/*.js',
          '<%= app.server %>/{,*/}*.js',
          'README.md'
        ]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= app.app %>/modules/{,*/}*.js',
        '<%= app.app %>/models/{,*/}*.js',
        '<%= app.app %>/directives/{,*/}*.js',
        '<%= app.app %>/viewModels/{,*/}*.js',
        '<%= app.app %>/widgets/**/{,*/}*.js',
        '<%= app.server %>/{,*/}*.js',
        '!<%= app.app %>/modules/mdTextFloat.js'
      ]
    },
    karma: {
      unit: {
        configFile: '<%= app.test %>/karma.conf.js',
        singleRun: true
      },
      unitAuto: {
        configFile: '<%= app.test %>/karma.conf.js',
        background: true
      },
      e2e: {
        configFile: '<%= app.test %>/e2e-karma.conf.js',
        singleRun: true
      },
      e2eAuto: {
        configFile: '<%= app.test %>/e2e-karma.conf.js',
        background: true
      }
    },
    less: {
      main: {
        opions: {
          paths: [
            '<%= app.app %>'
          ]
        },
        files: {
          '.tmp/styles/main.css': '<%= app.app %>/styles/main.less'
        }
      }
    },
    ngAnnotate: {
      dist: {
        expand: true,
        cwd: '<%= app.app %>',
        src: [
          'app.js',
          'widgets/**/*.js',
          'viewModels/*.js',
          'modules/*.js',
          'directives/*.js',
          'models/**/*.js'
        ],
        dest: '<%= app.tmp %>/ngmin'
      },
      template: {
        src: '<%= app.tmp %>/scripts/templates.js',
        dest: '<%= app.tmp %>/scripts/ngtemplates.js'
      }
    },
    ngtemplates: {
      dev: {
        src: '<%= app.app %>/widgets/**/*.html',
        dest: '<%= app.tmp %>/js/templates.js',
        options: {
          module: 'con-rest.templates',
          url: function(url) {
            return url.replace(/(([\s\S]*?)\/widgets\/([\s\S]*?)\/src\/)|.html/g, '').replace(/.html/, '');
          }
        }
      },
      dist: {
        src: '<%= app.app %>/widgets/**/*.html',
        dest: '<%= app.tmp %>/js/templates.min.js',
        options: {
          module: 'con-rest',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          url: function(url) {
            return url.replace(/(([\s\S]*?)\/widgets\/([\s\S]*?)\/src\/)|.html/g, '').replace(/.html/, '');
          }
        }
      }
    },
    packageModules: {
      dist: {
        src: 'package.json',
        dest: 'dist'
      }
    },
    'protractor_webdriver': {
      options: {
        keepAlive: true
      },
      test: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start --standalone'
        }
      }
    },
    protractor: {
      ci: {
        options: {
          configFile: 'test/ci.conf.js',
          keepAlive: true,
          noColor: false
        },
        args: {
          multiCapabilities: [{
            'browserName': 'firefox'
          }]
        }
      },
      all: {
        options: {
          configFile: 'test/e2e.conf.js',
          keepAlive: true,
          noColor: false
        }
      }
    },
    simplemocha: {
      all: {
        src: ['test/unit/server/**/*.js']
      }
    },
    template: {
      options: {
        data: function() {
          var features = [];
          addWidgetFeatures('app/widgets/', features);
          addWidgetFeatures('app/core/widgets/', features);
          return {
            features: features,
            module: 'con-rest'
          };
        }
      },
      template: {
        src: 'test/unit/test.spec.template',
        dest: '.tmp/test.spec.js'
      }
    },
    ts: {
      all: {
        src: [
          'app/bower_components/type-def/angularjs/angular.d.ts',
          'app/bower_components/type-def/angular-material/angular-material.d.ts',
          'app/core/models/serializable.ts',
          'app/core/models/**/*.ts',
          'app/core/dao/dao.ts',
          'app/core/dao/**/*.ts',
          'app/core/modules/**/*.ts',
          'app/core/widgets/**/src/**/*.ts',
          'app/core/widgets/**/*.ts',
          '!app/core/widgets/**/test/**',
          'app/widgets/**/src/**/*.ts',
          'app/widgets/**/*.ts',
          '!app/widgets/**/test/**',
          'app/app.ts'
        ],
        reference: 'app/reference.ts',
        out: '.tmp/js/build.js'
      },
      seperate: {
        src: [
          'app/bower_components/type-def/angularjs/angular.d.ts',
          'app/bower_components/type-def/angular-material/angular-material.d.ts',
          'app/bower_components/type-def/node/node.d.ts',
          'app/bower_components/type-def/mocha/mocha.d.ts',
          'app/bower_components/type-def/sinon-chai/sinon-chai.d.ts',
          'test/angular-mocks.d.ts',
          'test/**/*.ts',
          'app/core/models/**/*.ts',
          'app/core/dao/**/*.ts',
          'app/core/modules/**/*.ts',
          'app/core/widgets/**/src/**/*.ts',
          'app/core/widgets/**/*.ts',
          'app/widgets/**/src/**/*.ts',
          'app/widgets/**/*.ts',
          'app/app.ts'
        ],
        reference: 'app/reference.ts',
        outDir: '.tmp/js'
      }
    },
    uglify: {
      conrest: {
        options: {
          wrap: 'exports'
        },
        files: [{
          src: ['app/styles/themes/theme-con-rest.js', '.tmp/js/build.js'],
          dest: '.tmp/js/build.min.js'
        }]
      },
      angular: {
        files: [{
          src: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-messages/angular-messages.js'
          ],
          dest: '.tmp/js/angular.min.js'
        }]
      }
    },
    version: {
      options: {
        prefix: 'Version: |\"version\": \"'
      },
      defaults: {
        src: [
          '*.js',
          'bower.json',
          '<%= app.app %>/**/*.js',
          '<%= app.app %>/**/*.html',
          '<%= app.test %>/**/*.js',
          '!**/lib/**',
          '!**/bower_components/**'
        ]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      less: {
        files: [
          '<%= app.app %>/styles/*.less',
          '<%= app.app %>/widgets/**/*.less'
        ],
        tasks: ['concat:less', 'less:main']
      },
      ngTemplates: {
        files: ['<%= app.app %>/widgets/**/*.html'],
        tasks: ['ngtemplates']
      },
      ts: {
        files: [
          'app/core/**/*.ts',
          'app/widgets/**/*.ts',
          'test/**/*.ts',
          'app/app.ts'
        ],
        tasks: ['ts', 'karma:unitAuto:run']
      },
      features: {
        files: [
          'app/**/widgets/**/*.feature'
        ],
        tasks: ['template', 'karma:unitAuto:run']
      },
      testsServer: {
        files: [
          '<%= app.server %>/**/*.js',
          '<%= app.test %>/unit/server/**/*.js'
        ],
        tasks: ['simplemocha']
      },
      serverReload: {
        files: [
          '<%= app.server %>/**/*.js',
          '<%= app.test %>/unit/server/**/*.js'
        ],
        tasks: ['express:dev']
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'concat:less',
    'less',
    'copy:dev',
    'ngtemplates:dev',
    'template',
    'ts'
  ]);

  grunt.registerTask('setupEnv', function env(target) {
    if (target === 'e2e') {
      process.env.MONGO_CONNECTION = 'mongodb://127.0.0.1:27017/test';
    }
    grunt.task.run([
      'build',
      'express:dev'
    ]);
  });

  grunt.registerTask('test', function test(target) {
    grunt.task.run([
      'setupEnv:' + target,
      'karma:unit',
      'simplemocha'
    ]);
  });

  grunt.registerTask('e2e', function testMode(target) {
    grunt.task.run([
      'protractor_webdriver:test',
      'protractor:' + (target || 'all')
    ]);
  });

  grunt.registerTask('server', function serverMode(target) {
    var tasks = [
      'setupEnv:' + target,
      'karma:unitAuto',
      'watch'
    ];
    grunt.task.run(tasks);
  });

  grunt.registerTask('package', [
    'test',
    'ngtemplates:dist',
    'ngAnnotate',
    'uglify',
    'copy',
    'concat',
    'packageModules',
    'compress'
  ]);

  var seleniumChildProcesses = {};
  grunt.event.on('selenium.start', function(target, process) {
    grunt.log.ok('Saw process for target: ' + target);
    seleniumChildProcesses[target] = process;
  });

  grunt.util.hooker.hook(grunt.fail, function() {
    // Clean up selenium if we left it running after a failure.
    grunt.log.writeln('Attempting to clean up running selenium server.');
    for (var target in seleniumChildProcesses) {
      grunt.log.ok('Killing selenium target: ' + target);
      try {
        seleniumChildProcesses[target].kill('SIGTERM');
      } catch (e) {
        grunt.log.warn('Unable to stop selenium target: ' + target);
      }
    }
  });

  grunt.registerTask('default', [
    'bower',
    'package'
  ]);
};
