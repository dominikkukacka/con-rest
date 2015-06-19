// con-rest
// Version: 0.0.1
//
// Author: Andy Tang
// Fork me on Github: https://github.com/EnoF/con-rest

'use strict';

module.exports = function(grunt) {
  require('load-grunt-config')(grunt);
}

function deprecated(){

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    bower: {
      install: {
        options: {
          copy: false,
          install: true,
          verbose: true
        }
      }
    }
  });

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
