/**
 * Created by VVD at NorseDigital on 6/6/16.
 */

'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  //Project configuration
  grunt.initConfig({

    //Cleans the default folders
    clean: ['build/*'],

    copy: {
      files: {
        expand: true,
        cwd: 'src',
        src: [
          'images/**/*',
          'js/**/*',
          'vendor/jquery/dist/jquery.min.js'
        ],
        dest: 'build',
        file: 'isFile'
      }
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true
        },
        files: {
          'build/stylesheets/style.min.css': 'src/sass/main.scss'
        }
      }
    },

    includereplacemore: {
      dev: {
        options: {
          includeDir: 'src/html'
        },
        expand: true,
        cwd: 'src/html',
        src: '*.html',
        dest: 'build/'
      }
    },

    express: {
      all: {
        options: {
          hostname: 'localhost',
          port: 9998,
          bases: 'build'
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:9998',
        app: '/usr/bin/google-chrome'
      }
    },

    watch: {
      configFiles: {
        files: [
          'src/html/**/*',
          'src/sass/**/*',
          'src/images/**/*',
          'src/js/**/*'
        ],
        tasks: ['copy', 'sass', 'includereplacemore'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },

      all: ['Gruntfile.js', 'src/js/**/*.js']
    },

    uncss: {
      dist: {
        files: {
          'build/stylesheets/style.min.css': ['build/index.html']
        }
      }
    }

  });

  //Builds the project
  grunt.registerTask('build', ['clean', 'copy', 'sass', 'includereplacemore', 'express', 'open', 'watch']);

  //Tests
  grunt.registerTask('test', ['jshint']);
  //Deletes unused css
  //
  grunt.registerTask('build-uncss', ['build', 'uncss']);

};