// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

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
    concat: {
      dist: {
        files: {
          '<%= app.dist %>/js/con-rest.min.js': [
            '<%= app.app %>/bower_components/angular/angular.min.js',
            '.tmp/pre.con-rest.js'
          ]
        }
      },
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          '<%= app.tmp %>/js/con-rest.js': [
            '<%= app.app %>/dao/*.js',
            '<%= app.app %>/models/*.js',
            '<%= app.app %>/modules/*.js',
            '<%= app.app %>/viewModels/*.js',
            '<%= app.app %>/widgets/**/*.js'
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
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app.tmp %>/styles',
          dest: '<%= app.dist %>/styles',
          src: [
            '*.css'
          ]
        }]
      }
    },
    express: {
      dev: {
        options: {
          port: 9000,
          script: './devServer.js'
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
            return url.replace(/(app\/widgets\/([\s\S]*?)\/)/, '').replace(/.html/, '');
          }
        }
      },
      dist: {
        src: '<%= app.app %>/widgets/**/*.html',
        dest: '<%= app.tmp %>/scripts/templates.js',
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
            return url.replace(/(app\/widgets\/([\s\S]*?)\/)/, '').replace(/.html/, '');
          }
        }
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
    ts: {
      all: {
        src: [
          'app/bower_components/type-def/angularjs/angular.d.ts',
          'app/core/models/**/*.ts',
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
          'app/bower_components/type-def/node/node.d.ts',
          'app/bower_components/type-def/mocha/mocha.d.ts',
          'app/bower_components/type-def/sinon-chai/sinon-chai.d.ts',
          'test/angular-mocks.d.ts',
          'test/*.ts',
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
      options: {
        mangle: {
          except: []
        },
        compress: {
          /* jshint ignore:start */
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
            /* jshint ignore:end */
        },
        banner: '/* con-rest: v<%= pkg.version %> by EnoF */'
      },
      dist: {
        files: {
          '<%= app.tmp %>/pre.con-rest.js': [
            '.tmp/ngmin/app.js',
            '.tmp/scripts/ngtemplates.js',
            '.tmp/ngmin/widgets/**/*.js',
            '.tmp/ngmin/viewModels/*.js',
            '.tmp/ngmin/modules/*.js',
            '.tmp/ngmin/directives/*.js',
            '.tmp/ngmin/models/**/*.js'
          ]
        }
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
      less: {
        files: [
          '<%= app.app %>/styles/*.less',
          '<%= app.app %>/widgets/**/*.less'
        ],
        tasks: ['concat:less', 'less:main'],
        options: {
          // Start a live reload server on the default port 35729
          livereload: true
        }
      },
      ngTemplates: {
        files: ['<%= app.app %>/widgets/**/*.html'],
        tasks: ['ngtemplates'],
        options: {
          // Start a live reload server on the default port 35729
          livereload: true
        }
      },
      ts: {
        files: [
          'app/core/**/*.ts',
          'app/widgets/**/*.ts'
        ],
        tasks: ['ts', 'karma:unitAuto:run']
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
        tasks: ['express:dev'],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'concat:less',
    'less',
    'ngtemplates:dev',
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
      'groc:dev',
      'karma:unitAuto',
      'watch'
    ];
    grunt.task.run(tasks);
  });

  grunt.registerTask('package', [
    'version',
    'test:e2e',
    'e2e:ci',
    'ngtemplates:dist',
    'ngAnnotate',
    'uglify',
    'copy',
    'concat'
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
