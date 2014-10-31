// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

'use strict';

module.exports = function (grunt) {
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
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= app.tmp %>',
                            '<%= app.dist %>'
                        ]
                    }
                ]
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
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= app.tmp %>/styles',
                        dest: '<%= app.dist %>/styles',
                        src: [
                            '*.css'
                        ]
                    }
                ]
            }
        },
        express: {
            dev: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    bases: [
                        '<%= app.app %>',
                        '<%= app.tmp %>'
                    ],
                    server: '<%= app.server %>/server.js',
                    livereload: true
                }
            }
        },
        groc: {
            options: {
                out: '<%= app.tmp %>/docs'
            },
            javascript: [
                '<%= app.app %>/viewModels/*.js',
                '<%= app.app %>/models/*.js',
                'README.md'
            ]
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
                '<%= app.app %>/widgets/**/{,*/}*.js'
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
                dest: '<%= app.tmp %>/scripts/templates.js',
                options: {
                    module: 'con-rest',
                    url: function (url) {
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
                    url: function (url) {
                        return url.replace(/(app\/widgets\/([\s\S]*?)\/)/, '').replace(/.html/, '');
                    }
                }
            }
        },
        simplemocha: {
            all: { src: ['test/unit/server/**/*.js'] }
        },
        uglify: {
            options: {
                mangle: {
                    except: [
                    ]
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
                tasks: ['less:main']
            },
            ngTemplates: {
                files: ['<%= app.app %>/widgets/**/*.html'],
                tasks: ['ngtemplates']
            },
            testsApp: {
                files: [
                    '<%= app.app %>/**/*.js',
                    '<%= app.test %>/unit/app/**/*.js'
                ],
                tasks: ['karma:unitAuto:run']
            },
            testsServer: {
                files: [
                    '<%= app.server %>/**/*.js',
                    '<%= app.test %>/unit/server/**/*.js'
                ],
                tasks: ['simplemocha']
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'less',
        'ngtemplates:dev'
    ]);

    grunt.registerTask('setupEnv', [
        'build',
        'express'
    ]);

    grunt.registerTask('test', [
        'setupEnv',
        'karma:unit'
    ]);

    grunt.registerTask('server', function serverMode(target) {
        var tasks = [
            'setupEnv',
            'groc',
            'karma:unitAuto',
            'watch'
        ];
        if (target === 'e2e') {
            tasks.push('karma:e2eAuto');
        }
        grunt.task.run(tasks);
    });

    grunt.registerTask('package', [
        'version',
        'test',
        'ngtemplates:dist',
        'ngAnnotate',
        'uglify',
        'copy',
        'concat'
    ]);

    grunt.registerTask('default', [
        'bower',
        'package'
    ]);
};
